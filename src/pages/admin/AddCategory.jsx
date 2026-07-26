import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, updateCategory, getCategoryById, getAllCategories, deleteCategory } from '../../hooks/useCategory';
import { uploadImages } from '../../hooks/useCloudinary';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { FiCamera, FiCheck, FiX, FiMoreVertical, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const AddCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL Param for editing (e.g. /categories/edit/:id)
    const isEditMode = Boolean(id);

    const handleBack = () => {
        navigate(-1);
    };

    // File Input Ref
    const fileInputRef = useRef(null);

    // Form & Page State
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);

    // All Categories List (for inline manager)
    const [allCategories, setAllCategories] = useState([]);
    const [activeMenuId, setActiveMenuId] = useState(null); // Tracks open three-dots menu

    // Image Upload State
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Form Fields
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        image: "",
        isPublished: false,
    });

    const fetchAllCategories = async () => {
        try {
            const response = await getAllCategories();
            // Handle both direct array res (data) and object res (data.categories or data.data)
            const categoriesArray = Array.isArray(response)
                ? response
                : response?.categories || response?.data || [];

            setAllCategories(categoriesArray);

        } catch (err) {
            console.error("Failed to load categories list:", err);
            setAllCategories([]);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, [id]);


    useEffect(() => {
        if (!isEditMode) {
            // Reset form when switching to Add mode
            setFormData({ name: "", slug: "", image: "", isPublished: false });
            setImageFile(null);
            setImagePreview(null);
            return;
        }

        const fetchCategoryDetail = async () => {
            try {
                setFetchingData(true);
                const res = await getCategoryById(id);

                const category = res?.categories

                setFormData({
                    name: category.name || "",
                    slug: category.slug || "",
                    image: category.image || "",
                    isPublished: category.isPublished ?? false,
                });

                if (category.image) {
                    setImagePreview(category.image);
                }
            } catch (err) {
                console.error("Error fetching category details:", err);
                setError("Failed to load category details.");
            } finally {
                setFetchingData(false);
            }
        };

        fetchCategoryDetail();
    }, [id, isEditMode]);

    // 3. Close three-dots dropdown menu when clicking anywhere outside
    useEffect(() => {
        const handleOutsideClick = () => setActiveMenuId(null);
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, []);

    // Cleanup Object URLs on unmount/change to prevent memory leaks
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // Auto-generate slug from name in Add Mode
    const handleNameChange = (e) => {
        const nameVal = e.target.value;
        setFormData((prev) => ({
            ...prev,
            name: nameVal,
            ...(!isEditMode ? {
                slug: nameVal.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            } : {})
        }));

        if (fieldErrors.name) {
            setFieldErrors((prev) => ({ ...prev, name: "" }));
        }
    };

    // Handle Image Upload & Preview
    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (imagePreview && imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            if (fieldErrors.image) {
                setFieldErrors((prev) => ({ ...prev, image: "" }));
            }
        }
    };

    // Handle Removing Selected Image
    const handleRemoveImage = (e) => {
        e.stopPropagation();
        if (imagePreview && imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }
        setImageFile(null);
        setImagePreview(null);
        setFormData((prev) => ({ ...prev, image: "" }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateAllFields = () => {
        const errors = {};

        if (!formData.name?.trim()) errors.name = "Field is required";
        if (!formData.slug?.trim()) errors.slug = "Field is required";
        if (!imageFile && !formData.image) errors.image = "Cover image is required";

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const isValid = validateAllFields();
        if (!isValid) return;

        try {
            setLoading(true);
            let imageUrl = formData.image;

            // 1. Upload new image to Cloudinary if selected
            if (imageFile) {
                const uploadedUrls = await uploadImages([imageFile]);
                imageUrl = Array.isArray(uploadedUrls) ? uploadedUrls[0] : uploadedUrls;
            }

            // 2. Prepare payload
            const categoryData = {
                ...formData,
                image: imageUrl
            };

            // 3. Dispatch Create or Update request
            if (isEditMode) {
                await updateCategory(id, categoryData);
            } else {
                await createCategory(categoryData);
            }

            // Refresh list and navigate back
            await fetchAllCategories();
            navigate(-1);
        } catch (err) {
            console.error("Error saving category:", err);
            setError(
                err.response?.data?.message ||
                `Failed to ${isEditMode ? 'update' : 'create'} category. Please try again.`
            );
        } finally {
            setLoading(false);
        }
    };

    // Inline category deletion handler
    const handleDeleteCategory = async (catId, catName) => {
        if (!window.confirm(`Are you sure you want to delete "${catName}"?`)) return;

        try {
            await deleteCategory(catId);
            setAllCategories((prev) => prev.filter((item) => item._id !== catId));

            // If we deleted the category currently being edited, reset to add mode
            if (id === catId) {
                navigate('/categories/add');
            }
        } catch (err) {
            console.error("Failed to delete category:", err);
            alert("Failed to delete category.");
        }
    };

    return (
        <div>
            {/* TopAppBar */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md flex justify-between items-center px-6 py-6 border-b border-[#eeeeee]">
                <div className="flex items-center justify-center gap-2 md:gap-3">
                    <button
                        type="button"
                        aria-label="Go back"
                        onClick={handleBack}
                        className="cursor-pointer transition-opacity active:opacity-70 p-1 flex items-center text-black md:text-xl"
                    >
                        <IoMdArrowRoundBack />
                    </button>
                    <h1 className="font-headline text-xl font-bold text-black uppercase tracking-widest">
                        {isEditMode ? "EDIT CATEGORY" : "ADD CATEGORY"}
                    </h1>
                </div>
            </nav>

            <main className="pt-26 pb-10 px-6 md:px-12 max-w-7xl mx-auto bg-white">
                <header className="mb-10">
                    <h2 className="font-headline text-5xl md:text-6xl font-light tracking-tight text-[#1a1c1c] leading-none">
                        {isEditMode ? "Edit Category" : "New Category"}
                    </h2>
                </header>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 font-semibold mb-6 rounded">
                        {error}
                    </div>
                )}

                <div className="bg-[#f8f8f8] p-6 border border-[#eeeeee] mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <label className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">
                            Existing Categories ({allCategories.length})
                        </label>
                        {isEditMode && (
                            <button
                                type="button"
                                onClick={() => navigate('/admin/Categories/add')}
                                className="flex items-center gap-1 font-label text-[10px] uppercase tracking-widest text-black underline cursor-pointer"
                            >
                                <FiPlus className="text-xs" /> Switch to Create New
                            </button>
                        )}
                    </div>

                    {allCategories.length === 0 ? (
                        <div className="p-4 text-center border border-dashed border-[#dddddd] bg-white">
                            <p className="font-headline text-sm italic text-[#777777]">
                                No categories created yet. Fill out the form below to create your first one!
                            </p>
                        </div>
                    ) : (
                        /* Category Items Grid */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-20 overflow-y-auto pr-1">
                            {allCategories.map((cat) => {
                                const isCurrentActive = id === cat._id;
                                return (
                                    <div
                                        key={cat._id}
                                        className={`flex items-center justify-between p-3 border transition-all ${isCurrentActive
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-[#1a1c1c] border-[#dddddd] hover:border-black'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {cat.image ? (
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className="w-8 h-8 object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-[#eeeeee] flex items-center justify-center text-[10px] text-[#777777] flex-shrink-0">
                                                    N/A
                                                </div>
                                            )}
                                            <span className="font-headline text-sm truncate">{cat.name}</span>
                                        </div>

                                        {/* Three Dots Menu Button */}
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveMenuId(activeMenuId === cat._id ? null : cat._id);
                                                }}
                                                className={`p-1.5 rounded transition-colors cursor-pointer ${isCurrentActive
                                                    ? 'hover:bg-white/20 text-white'
                                                    : 'hover:bg-[#f1f1f1] text-black'
                                                    }`}
                                            >
                                                <FiMoreVertical className="text-sm" />
                                            </button>

                                            {/* Popup Dropdown Options */}
                                            {activeMenuId === cat._id && (
                                                <div
                                                    className="absolute right-0  mt-2 w-36 bg-white border border-[#eeeeee] shadow-xl z-50 py-1 text-black"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveMenuId(null);
                                                            navigate(`/admin/Categories/edit/${cat._id}`);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-xs font-label uppercase tracking-wider text-[#1a1c1c] hover:bg-[#f8f8f8] flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <FiEdit2 className="text-xs" /> Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveMenuId(null);
                                                            handleDeleteCategory(cat._id, cat.name);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-xs font-label uppercase tracking-wider text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <FiTrash2 className="text-xs" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {fetchingData ? (
                    <div className="py-20 text-center font-label text-xs uppercase tracking-widest text-[#777777]">
                        Loading category details...
                    </div>
                ) : (
                    <form className="grid grid-cols-1 lg:grid-cols-12 gap-8" onSubmit={handleSubmit}>
                        {/* Left Column: Form Fields */}
                        <div className="lg:col-span-7 space-y-10">
                            {/* Field: Category Name */}
                            <div className="group">
                                <label
                                    className="block font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777] mb-2 transition-colors group-focus-within:text-[#1a1c1c]"
                                    htmlFor="category_name"
                                >
                                    Category Name
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    className={`w-full bg-[#f8f8f8] border-b ${fieldErrors.name ? 'border-red-500' : 'border-[#dddddd]'} px-2 py-4 font-headline md:text-lg text-[#1a1c1c] placeholder:text-[#b5b5b5] focus:outline-none focus:bg-white focus:border-black transition-all`}
                                    id="category_name"
                                    placeholder="e.g. Winter Editorial 2024"
                                    type="text"
                                />
                                {fieldErrors.name && (
                                    <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                                )}
                            </div>

                            {/* Field: Slug */}
                            <div className="group">
                                <label
                                    className="block font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777] mb-2 transition-colors group-focus-within:text-[#1a1c1c]"
                                    htmlFor="category_slug"
                                >
                                    SLUG
                                </label>
                                <input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className={`w-full bg-[#f8f8f8] border-b ${fieldErrors.slug ? 'border-red-500' : 'border-[#dddddd]'} px-2 py-4 font-headline md:text-lg text-[#1a1c1c] placeholder:text-[#b5b5b5] focus:outline-none focus:bg-white focus:border-black transition-all`}
                                    id="category_slug"
                                    placeholder="winter-editorial-2024"
                                    type="text"
                                />
                                {fieldErrors.slug && (
                                    <p className="text-red-500 text-xs mt-1">{fieldErrors.slug}</p>
                                )}
                            </div>

                            {/* Field: Published Toggle */}
                            <div className="flex items-center justify-between py-6 border-y border-[#eeeeee]">
                                <div>
                                    <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1c1c]">Published Status</p>
                                    <p className="font-body text-xs text-[#777777] mt-1">Make this category visible to the public immediately.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer select-none">
                                    <input
                                        className="sr-only peer"
                                        type="checkbox"
                                        name="isPublished"
                                        checked={formData.isPublished}
                                        onChange={handleChange}
                                    />
                                    <div className="w-11 h-6 bg-[#dddddd] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black" />
                                </label>
                            </div>
                        </div>

                        {/* Right Column: Image Upload */}
                        <div className="lg:col-span-5 space-y-6">
                            <label className="block font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">
                                Category Cover Image
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative group cursor-pointer aspect-[4/3] bg-[#f8f8f8] border ${fieldErrors.image ? 'border-red-500' : 'border-dashed border-[#dddddd]'} flex flex-col items-center justify-center transition-all hover:bg-[#f1f1f1] overflow-hidden`}
                            >
                                <input
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                    type="file"
                                    accept="image/jpeg, image/webp, image/png"
                                />

                                {imagePreview ? (
                                    <>
                                        <img
                                            src={imagePreview}
                                            alt="Category Preview"
                                            className="absolute inset-0 w-full h-full object-cover z-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors z-20 cursor-pointer"
                                            title="Remove Image"
                                        >
                                            <FiX className="text-sm" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center text-center p-12 z-0">
                                        <FiCamera className="text-3xl text-[#b5b5b5] mb-4 group-hover:text-black transition-colors" />
                                        <p className="font-headline text-xl italic text-[#777777]">Select or Drag Image</p>
                                        <p className="font-label text-[10px] uppercase tracking-widest text-[#b5b5b5] mt-4">Required Ratio 3:4</p>
                                    </div>
                                )}

                                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#b5b5b5] group-hover:border-black transition-colors z-0"></div>
                                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#b5b5b5] group-hover:border-black transition-colors z-0"></div>
                                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#b5b5b5] group-hover:border-black transition-colors z-0"></div>
                                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#b5b5b5] group-hover:border-black transition-colors z-0"></div>
                            </div>
                            {fieldErrors.image && (
                                <p className="text-red-500 text-xs mt-1 text-center">{fieldErrors.image}</p>
                            )}
                            <p className="font-label text-[10px] text-[#777777] uppercase tracking-widest text-center">
                                Supported formats: JPG, WEBP, PNG. Max size 5MB.
                            </p>
                        </div>

                        {/* Footer Action Area */}
                        <div className="lg:col-span-12 pt-12 mt-8 border-t border-[#eeeeee] flex flex-col sm:flex-row justify-between items-center gap-6">
                            <button
                                onClick={handleBack}
                                className="order-2 sm:order-1 flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.3em] text-[#777777] hover:text-black transition-colors border-b border-transparent hover:border-black pb-1 cursor-pointer"
                                type="button"
                            >
                                <FiX className="text-xs" />
                                Discard Changes
                            </button>
                            <button
                                disabled={loading}
                                className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2 px-16 py-6 bg-black text-[#e5e2e1] font-label text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-[#1a1c1c] active:scale-95 duration-200 cursor-pointer disabled:opacity-50"
                                type="submit"
                            >
                                <FiCheck className="text-xs" />
                                {loading ? "Saving..." : isEditMode ? "Update Category" : "Save Category"}
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default AddCategory;