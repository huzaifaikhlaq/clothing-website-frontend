import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
    createCollection,
    updateCollection,
    getCollectionById,
    getAllCollections,
    deleteCollection
} from '../../hooks/useCollection';
import { uploadImages } from '../../hooks/useCloudinary';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { FiCamera, FiCheck, FiX, FiMoreVertical, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const AddCollection = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL parameter for editing (e.g. /admin/Collections/edit/:id)
    const isEditMode = Boolean(id);

    const fileInputRef = useRef(null);

    // Form & Page State
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);

    // Existing Collections List & Action Menu State
    const [allCollections, setAllCollections] = useState([]);
    const [activeMenuId, setActiveMenuId] = useState(null);

    // Form Fields State
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        isPublished: false,
    });

    // Image Upload State
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleBack = () => {
        navigate(-1);
    };

    const fetchAllCollections = async () => {
        try {
            const response = await getAllCollections();
            const collectionsArray = Array.isArray(response)
                ? response
                : response?.collections || response?.data || [];

            setAllCollections(collectionsArray);
        } catch (err) {
            console.error("Failed to load collections list:", err);
            setAllCollections([]);
        }
    };

    useEffect(() => {
        fetchAllCollections();
    }, [id]);

    // 2. Fetch specific collection details when in Edit Mode
    useEffect(() => {
        if (!isEditMode) {
            setFormData({ name: "", description: "", image: "", isPublished: false });
            setImageFile(null);
            setImagePreview(null);
            return;
        }

        const fetchCollectionDetail = async () => {
            try {
                setFetchingData(true);
                const response = await getCollectionById(id);

                // Safely extract collection object
                const collection = response?.collection || response?.data || response;

                if (collection) {
                    setFormData({
                        name: collection.name || "",
                        description: collection.description || "",
                        image: collection.image || "",
                        isPublished: collection.isPublished ?? false,
                    });

                    if (collection.image) {
                        setImagePreview(collection.image);
                    }
                }
            } catch (err) {
                console.error("Error fetching collection details:", err);
                setError("Failed to load collection details.");
            } finally {
                setFetchingData(false);
            }
        };

        fetchCollectionDetail();
    }, [id, isEditMode]);

    // 3. Close the active three-dots dropdown menu when clicking anywhere outside
    useEffect(() => {
        const handleOutsideClick = () => setActiveMenuId(null);
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, []);

    // Cleanup preview object URLs
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

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

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (imagePreview && imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));

            if (fieldErrors.image) {
                setFieldErrors((prev) => ({ ...prev, image: "" }));
            }
        }
    };

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

    const validateAllFields = () => {
        const errors = {};

        if (!formData.name?.trim()) errors.name = "Field is required";
        if (!formData.description?.trim()) errors.description = "Field is required";
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
            if (imageFile) {
                const uploaded = await uploadImages([imageFile]);
                imageUrl = Array.isArray(uploaded) ? uploaded[0] : uploaded;
            }

            const collectionData = {
                ...formData,
                image: imageUrl,
            };

            if (isEditMode) {
                await updateCollection(id, collectionData);
            } else {
                await createCollection(collectionData);
            }

            await fetchAllCollections();
            navigate(-1);
        } catch (err) {
            console.error("Error saving collection:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                `Failed to ${isEditMode ? 'update' : 'create'} collection. Please try again.`
            );
        } finally {
            setLoading(false);
        }
    };

    // Inline Collection Deletion
    const handleDeleteCollection = async (colId, colName) => {
        if (!window.confirm(`Are you sure you want to delete "${colName}"?`)) return;

        try {
            await deleteCollection(colId);
            setAllCollections((prev) => prev.filter((item) => item._id !== colId));

            if (id === colId) {
                navigate('/admin/Collections/add');
            }
        } catch (err) {
            console.error("Failed to delete collection:", err);
            alert("Failed to delete collection.");
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
                        {isEditMode ? "EDIT COLLECTION" : "ADD COLLECTION"}
                    </h1>
                </div>
            </nav>

            <main className="pt-26 pb-10 px-6 md:px-12 max-w-7xl mx-auto bg-white">
                <header className="mb-10">
                    <h2 className="font-headline text-5xl md:text-6xl font-light tracking-tight text-[#1a1c1c] leading-none">
                        {isEditMode ? "Edit Collection" : "New Collection"}
                    </h2>
                </header>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 font-semibold mb-6 rounded">
                        {error}
                    </div>
                )}

                {/* EXISTING COLLECTIONS SELECTOR BAR */}
                <div className="bg-[#f8f8f8] p-6 border border-[#eeeeee] mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <label className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">
                            Existing Collections ({allCollections.length})
                        </label>
                        {isEditMode && (
                            <button
                                type="button"
                                onClick={() => navigate('/admin/Collections/add')}
                                className="flex items-center gap-1 font-label text-[10px] uppercase tracking-widest text-black underline cursor-pointer"
                            >
                                <FiPlus className="text-xs" /> Switch to Create New
                            </button>
                        )}
                    </div>

                    {allCollections.length === 0 ? (
                        <div className="p-4 text-center border border-dashed border-[#dddddd] bg-white">
                            <p className="font-headline text-sm italic text-[#777777]">
                                No collections created yet. Fill out the form below to create your first one!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
                            {allCollections.map((col) => {
                                const isCurrentActive = id === col._id;
                                return (
                                    <div
                                        key={col._id}
                                        className={`flex items-center justify-between p-3 border transition-all ${isCurrentActive
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-[#1a1c1c] border-[#dddddd] hover:border-black'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {col.image ? (
                                                <img
                                                    src={col.image}
                                                    alt={col.name}
                                                    className="w-8 h-8 object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-[#eeeeee] flex items-center justify-center text-[10px] text-[#777777] flex-shrink-0">
                                                    N/A
                                                </div>
                                            )}
                                            <span className="font-headline text-sm truncate">{col.name}</span>
                                        </div>

                                        {/* Three Dots Action Button */}
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveMenuId(activeMenuId === col._id ? null : col._id);
                                                }}
                                                className={`p-1.5 rounded transition-colors cursor-pointer ${isCurrentActive
                                                        ? 'hover:bg-white/20 text-white'
                                                        : 'hover:bg-[#f1f1f1] text-black'
                                                    }`}
                                            >
                                                <FiMoreVertical className="text-sm" />
                                            </button>

                                            {/* Action Dropdown Popup */}
                                            {activeMenuId === col._id && (
                                                <div
                                                    className="absolute right-0 mt-2 w-36 bg-white border border-[#eeeeee] shadow-xl z-50 py-1 text-black"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveMenuId(null);
                                                            navigate(`/admin/Collections/edit/${col._id}`);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-xs font-label uppercase tracking-wider text-[#1a1c1c] hover:bg-[#f8f8f8] flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <FiEdit2 className="text-xs" /> Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveMenuId(null);
                                                            handleDeleteCollection(col._id, col.name);
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
                        Loading collection details...
                    </div>
                ) : (
                    <form className="grid grid-cols-1 lg:grid-cols-12 gap-8" onSubmit={handleSubmit}>
                        {/* Left Column: Form Fields */}
                        <div className="lg:col-span-7 space-y-12">
                            {/* Field: Collection Name */}
                            <div className="group">
                                <label
                                    className="block font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777] mb-2 transition-colors group-focus-within:text-[#1a1c1c]"
                                    htmlFor="collection_name"
                                >
                                    Collection Name
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-[#f8f8f8] border-b ${fieldErrors.name ? 'border-red-500' : 'border-[#dddddd]'} px-2 py-4 font-headline md:text-lg text-[#1a1c1c] placeholder:text-[#b5b5b5] focus:outline-none focus:bg-white focus:border-black transition-all`}
                                    id="collection_name"
                                    placeholder="E.g. Spring/Summer Archival 2026"
                                    type="text"
                                />
                                {fieldErrors.name && (
                                    <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                                )}
                            </div>

                            {/* Field: Description */}
                            <div className="group">
                                <label
                                    className="block font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777] mb-2 transition-colors group-focus-within:text-[#1a1c1c]"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={`w-full bg-[#f8f8f8] border-b ${fieldErrors.description ? 'border-red-500' : 'border-[#dddddd]'} px-2 py-4 font-body text-sm leading-relaxed text-[#1a1c1c] placeholder:text-[#b5b5b5] focus:outline-none focus:bg-white focus:border-black transition-all resize-none`}
                                    id="description"
                                    placeholder="Articulate the vision, inspirations, and material focus of this collection..."
                                    rows={5}
                                />
                                {fieldErrors.description && (
                                    <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>
                                )}
                            </div>

                            {/* Field: Published Toggle */}
                            <div className="flex items-center justify-between py-6 border-y border-[#eeeeee]">
                                <div>
                                    <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1c1c]">
                                        Published Status
                                    </p>
                                    <p className="font-body text-xs text-[#777777] mt-1">
                                        Make this collection visible to the public immediately.
                                    </p>
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
                                Collection Cover Image
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative group cursor-pointer aspect-[3/4] bg-[#f8f8f8] border ${fieldErrors.image ? 'border-red-500' : 'border-dashed border-[#dddddd]'} flex flex-col items-center justify-center transition-all hover:bg-[#f1f1f1] overflow-hidden`}
                            >
                                <input
                                    ref={fileInputRef}
                                    className="hidden"
                                    type="file"
                                    accept="image/jpeg, image/webp, image/png"
                                    onChange={handleImageChange}
                                />

                                {imagePreview ? (
                                    <>
                                        <img
                                            src={imagePreview}
                                            alt="Collection cover preview"
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
                                        <p className="font-headline text-xl italic text-[#777777]">
                                            Select or Drag Image
                                        </p>
                                        <p className="font-label text-[10px] uppercase tracking-widest text-[#b5b5b5] mt-4">
                                            Required Ratio 3:4
                                        </p>
                                    </div>
                                )}

                                {/* Corner Accents */}
                                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#b5b5b5] group-hover:border-black transition-colors z-0" />
                                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#b5b5b5] group-hover:border-black transition-colors z-0" />
                                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#b5b5b5] group-hover:border-black transition-colors z-0" />
                                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#b5b5b5] group-hover:border-black transition-colors z-0" />
                            </div>
                            {fieldErrors.image && (
                                <p className="text-red-500 text-xs mt-1 text-center">{fieldErrors.image}</p>
                            )}
                            <p className="font-label text-[10px] text-[#777777] uppercase tracking-widest text-center">
                                Supported formats: JPG, WEBP, PNG. Max size 5MB.
                            </p>
                        </div>

                        {/* Footer Action Area */}
                        <div className="lg:col-span-12 pt-8 mt-8 border-t border-[#eeeeee] flex flex-col sm:flex-row justify-between items-center gap-6">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="order-2 sm:order-1 flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.3em] text-[#777777] hover:text-black transition-colors border-b border-transparent hover:border-black pb-1 cursor-pointer"
                            >
                                <FiX className="text-xs" />
                                Discard Changes
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2 px-16 py-6 bg-black text-[#e5e2e1] font-label text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-[#1a1c1c] active:scale-95 duration-200 cursor-pointer disabled:opacity-50"
                            >
                                <FiCheck className="text-xs" />
                                {loading ? "Saving..." : isEditMode ? "Update Collection" : "Save Collection"}
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default AddCollection;