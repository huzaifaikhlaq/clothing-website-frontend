import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createCollection } from '../../hooks/useCollection';
import { uploadImages } from '../../hooks/useCloudinary';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { FiCamera, FiCheck, FiX } from 'react-icons/fi';

const AddCollection = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        isPublished: false,
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Clean up preview URL on unmount or file change
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear field-specific error as user types
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const validateAllFields = () => {
        const errors = {};

        if (!formData.name?.trim()) errors.name = "Field is required";
        if (!formData.description?.trim()) errors.description = "Field is required";

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const isValid = validateAllFields();
        if (!isValid) return;

        // Optional: Ensure an image is selected if required by your API
        if (!imageFile) {
            setError("Please select a cover image.");
            return;
        }

        try {
            setLoading(true);

            // Upload image file to Cloudinary first
            let imageUrl = "";
            if (imageFile) {
                const uploaded = await uploadImages([imageFile]);
                // Take the first string from the array
                imageUrl = Array.isArray(uploaded) ? uploaded[0] : uploaded;
            }

            const collectionData = {
                ...formData,
                image: imageUrl, // Real Cloudinary URL
            };

            await createCollection(collectionData);
            navigate(-1);
        } catch (err) {
            console.error("Error creating collection:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to create collection. Please try again."
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
                        ADD COLLECTION
                    </h1>
                </div>
            </nav>

            <main className="pt-26 pb-10 px-6 md:px-12 max-w-7xl mx-auto bg-white">
                <header className="mb-10">
                    <h2 className="font-headline text-5xl md:text-6xl font-light tracking-tight text-[#1a1c1c] leading-none">
                        New Collection
                    </h2>
                </header>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 font-semibold mb-6 rounded">
                        {error}
                    </div>
                )}

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
                        <div className="relative group cursor-pointer aspect-[3/4] bg-[#f8f8f8] border border-dashed border-[#dddddd] flex flex-col items-center justify-center transition-all hover:bg-[#f1f1f1] overflow-hidden">
                            <input
                                className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                type="file"
                                accept="image/jpeg, image/webp, image/png"
                                onChange={handleImageChange}
                            />

                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Collection cover preview"
                                    className="absolute inset-0 w-full h-full object-cover z-10"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-center p-12">
                                    <FiCamera className="text-3xl text-[#b5b5b5] mb-4 group-hover:text-black transition-colors" />
                                    <p className="font-headline text-xl italic text-[#777777]">
                                        Select or Drag Image
                                    </p>
                                    <p className="font-label text-[10px] uppercase tracking-widest text-[#b5b5b5] mt-4">
                                        Required Ratio 3:4
                                    </p>
                                </div>
                            )}

                            {/* Decorative Corner Bracket Lines */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#b5b5b5] group-hover:border-black transition-colors z-0" />
                            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#b5b5b5] group-hover:border-black transition-colors z-0" />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#b5b5b5] group-hover:border-black transition-colors z-0" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#b5b5b5] group-hover:border-black transition-colors z-0" />
                        </div>
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
                            {loading ? "Saving..." : "Save Collection"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddCollection;