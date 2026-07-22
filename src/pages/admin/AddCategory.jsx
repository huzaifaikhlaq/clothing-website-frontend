import { createCategory } from '../../hooks/useCategory';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { uploadImages } from '../../hooks/useCloudinary';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { FiCamera, FiCheck, FiX } from 'react-icons/fi';

const AddCategory = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    // File Input Ref
    const fileInputRef = useRef(null);

    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Image Upload State
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        image: "",
        isPublished: false,
    });

    // Cleanup Object URLs on unmount/change to prevent memory leaks
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    // Handle Image Upload & Preview
    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
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
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear error when user interacts with field
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

        // Validate every field before sending request
        const isValid = validateAllFields();
        if (!isValid) return;

        try {
            setLoading(true);
            let imageUrl = formData.image;

            // 1. Upload image to Cloudinary if a new file is chosen
            if (imageFile) {
                const uploadedUrls = await uploadImages([imageFile]); // Pass array
                imageUrl = Array.isArray(uploadedUrls) ? uploadedUrls[0] : uploadedUrls; // Extract string URL
            }

            // 2. Prepare payload with real Cloudinary URL
            const categoryData = {
                ...formData,
                image: imageUrl
            };

            // 3. Send payload to backend
            await createCategory(categoryData);
            navigate(-1);
        } catch (err) {
            console.error("Error creating category:", err);
            setError(
                err.response?.data?.message ||
                "Failed to create category. Please try again."
            );
        } finally {
            setLoading(false);
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
                        ADD CATEGORY
                    </h1>
                </div>
            </nav>

            <main className="pt-26 pb-10 px-6 md:px-12 max-w-7xl mx-auto bg-white">
                <header className="mb-10">
                    <h2 className="font-headline text-5xl md:text-6xl font-light tracking-tight text-[#1a1c1c] leading-none">
                        New Category
                    </h2>
                </header>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 font-semibold mb-6 rounded">
                        {error}
                    </div>
                )}

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
                                onChange={handleChange}
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
                                        className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors z-20"
                                        title="Remove Image"
                                    >
                                        <FiX className="text-sm" />
                                    </button>
                                </>
                            ) : (
                                /* Empty State UI */
                                <div className="flex flex-col items-center text-center p-12 z-0">
                                    <FiCamera className="text-3xl text-[#b5b5b5] mb-4 group-hover:text-black transition-colors" />
                                    <p className="font-headline text-xl italic text-[#777777]">Select or Drag Image</p>
                                    <p className="font-label text-[10px] uppercase tracking-widest text-[#b5b5b5] mt-4">Required Ratio 3:4</p>
                                </div>
                            )}

                            {/* Decorative Corner Bracket Lines */}
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
                            {loading ? "Saving..." : "Save Category"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddCategory;