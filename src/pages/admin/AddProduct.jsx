import { getAllCategories } from '../../hooks/useCategory.js';
import { getAllCollections } from '../../hooks/useCollection.js';
import { createProduct, updateProduct, getProductById } from '../../hooks/useProduct.js';
import { uploadImages } from '../../hooks/useCloudinary.js';

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaCheck, FaPlus, FaSpinner } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

const AddProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Extracts product ID if editing
    const isEditMode = Boolean(id);

    // File Input Refs
    const mainFileInputRef = useRef(null);
    const galleryInputRefs = [useRef(null), useRef(null), useRef(null)];

    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingProduct, setFetchingProduct] = useState(false);

    // Main Image State (Can be a File object or an existing URL string)
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Gallery Images State (Can be File objects or URL strings)
    const [galleryFiles, setGalleryFiles] = useState([null, null, null]);
    const [galleryPreviews, setGalleryPreviews] = useState([null, null, null]);

    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        sku: "",
        description: "",
        price: "",
        salePrice: "",
        stock: "",
        gender: "",
        category: "",
        collection: "",
        badge: "",
        colors: "",
        sizes: "",
        isPublished: true,
    });

    // Cleanup Blob URLs
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
            galleryPreviews.forEach(p => p && p.startsWith("blob:") && URL.revokeObjectURL(p));
        };
    }, [imagePreview, galleryPreviews]);

    // Load Dropdown Options
    const loadCategoriesAndCollections = async () => {
        try {
            const [catData, colData] = await Promise.all([
                getAllCategories(),
                getAllCollections()
            ]);
            setCategories(catData?.categories || []);
            setCollections(colData?.collections || []);
        } catch (err) {
            console.error("Error loading categories or collections:", err);
        }
    };

    const loadProductDetails = async () => {
        if (!isEditMode) return;

        try {
            setFetchingProduct(true);
            const res = await getProductById(id);
            const p = res.product;

            setFormData({
                title: p.title || "",
                subtitle: p.subtitle || "",
                sku: p.sku || "",
                description: p.description || "",
                price: p.price ?? "",
                salePrice: p.salePrice ?? "",
                stock: p.stock ?? "",
                gender: p.gender || "",
                category: typeof p.category === "object" ? p.category?._id : p.category || "",
                collection: typeof p.collection === "object" ? p.collection?._id : p.collection || "",
                badge: p.badge || "",
                colors: Array.isArray(p.colors) ? p.colors.join(", ") : p.colors || "",
                sizes: Array.isArray(p.sizes) ? p.sizes.join(", ") : p.sizes || "",
                isPublished: p.isPublished ?? true,
            });

            // Handle Existing Images
            if (p.images && p.images.length > 0) {
                // Main image (first array item)
                setImagePreview(p.images[0]);

                // Additional gallery images
                const galleryUrls = p.images.slice(1, 4);
                const updatedPreviews = [null, null, null];
                galleryUrls.forEach((url, idx) => {
                    updatedPreviews[idx] = url;
                });
                setGalleryPreviews(updatedPreviews);
            }
        } catch (err) {
            console.error("Error fetching product:", err);
            setError("Failed to fetch product details.");
        } finally {
            setFetchingProduct(false);
        }
    };

    useEffect(() => {
        loadCategoriesAndCollections();
        loadProductDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "category" && value === "__add_category__") {
            navigate("/admin/Categories/add");
            return;
        }

        if (name === "collection" && value === "__add_collection__") {
            navigate("/admin/Collections/add");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Main Image Handlers
    const handleMainImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (imagePreview && imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));

            if (fieldErrors.images) {
                setFieldErrors((prev) => ({ ...prev, images: "" }));
            }
        }
    };

    const handleRemoveMainImage = (e) => {
        e.stopPropagation();
        if (imagePreview && imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview(null);
        if (mainFileInputRef.current) mainFileInputRef.current.value = "";
    };

    // Gallery Image Handlers
    const handleGalleryImageChange = (index, e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (galleryPreviews[index] && galleryPreviews[index].startsWith("blob:")) {
                URL.revokeObjectURL(galleryPreviews[index]);
            }

            const updatedFiles = [...galleryFiles];
            updatedFiles[index] = file;
            setGalleryFiles(updatedFiles);

            const updatedPreviews = [...galleryPreviews];
            updatedPreviews[index] = URL.createObjectURL(file);
            setGalleryPreviews(updatedPreviews);
        }
    };

    const handleRemoveGalleryImage = (index, e) => {
        e.stopPropagation();
        if (galleryPreviews[index] && galleryPreviews[index].startsWith("blob:")) {
            URL.revokeObjectURL(galleryPreviews[index]);
        }

        const updatedFiles = [...galleryFiles];
        updatedFiles[index] = null;
        setGalleryFiles(updatedFiles);

        const updatedPreviews = [...galleryPreviews];
        updatedPreviews[index] = null;
        setGalleryPreviews(updatedPreviews);

        if (galleryInputRefs[index].current) {
            galleryInputRefs[index].current.value = "";
        }
    };

    const validateAllFields = () => {
        const errors = {};

        if (!imagePreview) errors.images = "Main product image is required";
        if (!formData.title?.trim()) errors.title = "Field is required";
        if (!formData.subtitle?.trim()) errors.subtitle = "Field is required";
        if (!formData.sku?.trim()) errors.sku = "Field is required";
        if (!formData.description?.trim()) errors.description = "Field is required";

        if (formData.price === "" || formData.price === null || formData.price === undefined) {
            errors.price = "Field is required";
        }

        if (formData.badge === "sale") {
            if (formData.salePrice === "" || formData.salePrice === null || formData.salePrice === undefined) {
                errors.salePrice = "Sale price is required when Sale badge is selected";
            } else if (Number(formData.salePrice) >= Number(formData.price)) {
                errors.salePrice = "Sale price must be less than regular price";
            }
        }

        if (formData.stock === "" || formData.stock === null || formData.stock === undefined) {
            errors.stock = "Field is required";
        }

        if (!formData.category?.trim()) errors.category = "Field is required";
        if (!formData.collection?.trim()) errors.collection = "Field is required";
        if (!formData.gender?.trim()) errors.gender = "Field is required";
        if (!formData.badge?.trim()) errors.badge = "Field is required";

        if (!formData.colors?.trim()) errors.colors = "Field is required";
        if (!formData.sizes?.trim()) errors.sizes = "Field is required";

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const selectGroups = [
        {
            label: "Category",
            name: "category",
            options: (categories || []).map((category) => ({
                value: category._id,
                label: category.name
            })),
            actionLabel: "+ Add Category",
            actionValue: "__add_category__"
        },
        {
            label: "Collection",
            name: "collection",
            options: (collections || []).map((collection) => ({
                value: collection._id,
                label: collection.name
            })),
            actionLabel: "+ Add Collection",
            actionValue: "__add_collection__"
        },
        {
            label: "Gender",
            name: "gender",
            options: [
                { value: "men", label: "Men" },
                { value: "female", label: "Female" },
                { value: "junior", label: "Junior" },
                { value: "unisex", label: "unisex" }
            ]
        },
        {
            label: "Badge",
            name: "badge",
            options: [
                { value: "new", label: "New" },
                { value: "hot", label: "Hot" },
                { value: "sale", label: "Sale" },
                { value: "coming soon", label: "Coming Soon" }
            ]
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateAllFields()) return;

        try {
            setLoading(true);

            // Process main image URL (upload if new File, otherwise keep existing URL)
            let mainImageUrl = imagePreview;
            if (imageFile) {
                const uploadedMain = await uploadImages([imageFile]);
                mainImageUrl = uploadedMain[0];
            }

            // Process gallery image URLs (upload new Files, keep existing URLs, drop nulls)
            const galleryUrls = await Promise.all(
                galleryPreviews.map(async (preview, idx) => {
                    if (galleryFiles[idx]) {
                        const uploaded = await uploadImages([galleryFiles[idx]]);
                        return uploaded[0];
                    }
                    return preview; // Keep pre-existing image string URL or null
                })
            );

            // Combine into single array of images
            const finalImages = [mainImageUrl, ...galleryUrls].filter(Boolean);

            const payload = {
                title: formData.title,
                subtitle: formData.subtitle,
                sku: formData.sku,
                description: formData.description,
                price: Number(formData.price),
                salePrice: formData.salePrice !== "" && formData.salePrice !== null ? Number(formData.salePrice) : 0,
                stock: Number(formData.stock),
                gender: formData.gender,
                category: formData.category,
                collection: formData.collection,
                badge: formData.badge,
                colors: formData.colors.split(",").map(c => c.trim()).filter(Boolean),
                sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
                isPublished: formData.isPublished,
                images: finalImages,
            };

            if (isEditMode) {
                await updateProduct(id, payload);
                setSuccess("Product updated successfully");
            } else {
                await createProduct(payload);
                setSuccess("Product created successfully");
            }

            setTimeout(() => {
                navigate("/admin/catalog");
            }, 500);

        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.message || err.message || "Failed to save product.");
        } finally {
            setLoading(false);
        }
    };

    if (fetchingProduct) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-black">
                <FaSpinner className="animate-spin text-3xl" />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-[#1a1c1c]">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b border-[#eeeeee]">
                <div className="flex items-center justify-center gap-3">
                    <Link to="/admin/catalog" className="hover:bg-[#f3f3f3] transition-colors duration-200 p-2">
                        <IoMdArrowRoundBack className="text-lg" />
                    </Link>
                    <h1 className="font-headline tracking-tight text-xl uppercase font-medium text-[#1a1c1c]">
                        {isEditMode ? "Edit Product" : "Add Product"}
                    </h1>
                </div>
            </header>

            <main className="pt-24 pb-32 max-w-5xl mx-auto px-6 bg-white">
                {error && <div className="p-3 bg-red-100 border border-red-300 text-red-700 font-semibold mb-6 rounded">{error}</div>}
                {success && <div className="p-3 bg-green-100 border border-green-300 text-green-700 font-semibold mb-6 rounded">{success}</div>}

                <form id="product-form" className="space-y-16" onSubmit={handleSubmit}>
                    {/* Imagery Section */}
                    <section className="space-y-8">
                        <div className="flex items-baseline justify-between border-b border-[#eeeeee] pb-4">
                            <h2 className="font-headline text-3xl font-medium">Typography &amp; Imagery</h2>
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Section 01</span>
                        </div>

                        {fieldErrors.images && <p className="text-red-500 text-xs font-semibold">{fieldErrors.images}</p>}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                ref={mainFileInputRef}
                                onChange={handleMainImageChange}
                                className="hidden"
                            />

                            <div
                                onClick={() => mainFileInputRef.current?.click()}
                                className={`md:col-span-3 aspect-[3/4] bg-[#f3f3f3] flex flex-col items-center justify-center border-2 border-dashed ${fieldErrors.images ? 'border-red-500' : 'border-[#c6c6c6]'} group hover:border-black transition-colors cursor-pointer relative overflow-hidden`}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Main Product Preview" className="absolute inset-0 w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={handleRemoveMainImage}
                                            className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors z-20"
                                            title="Remove Image"
                                        >
                                            <RxCross2 className="text-sm" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="z-10 flex flex-col items-center text-center p-8">
                                        <FaCloudUploadAlt className="text-4xl mb-3 text-[#1a1c1c]" />
                                        <p className="font-label text-sm uppercase tracking-widest font-bold text-[#1a1c1c]">Upload Main Image</p>
                                        <p className="font-body text-xs text-[#777777] mt-2">Portrait orientation (3:4) recommended</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="relative aspect-[3/4]">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={galleryInputRefs[i]}
                                            onChange={(e) => handleGalleryImageChange(i, e)}
                                            className="hidden"
                                        />
                                        <div
                                            onClick={() => galleryInputRefs[i].current?.click()}
                                            className="w-full h-full bg-[#f9f9f9] flex flex-col items-center justify-center border border-dashed border-[#c6c6c6] cursor-pointer hover:bg-[#f3f3f3] transition-colors relative overflow-hidden group"
                                        >
                                            {galleryPreviews[i] ? (
                                                <>
                                                    <img src={galleryPreviews[i]} alt={`Gallery Preview ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleRemoveGalleryImage(i, e)}
                                                        className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full transition-colors z-20"
                                                        title="Remove Image"
                                                    >
                                                        <RxCross2 className="text-xs" />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 text-[#777777]">
                                                    <FaPlus className="text-base" />
                                                    <span className="font-label text-[10px] uppercase tracking-wider font-semibold">Slot {i + 2}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Core Details */}
                    <section className="space-y-8">
                        <div className="flex items-baseline justify-between border-b border-[#eeeeee] pb-4">
                            <h2 className="text-3xl font-headline font-medium text-[#1a1c1c]">Core Details</h2>
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Section 02</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Product Name</label>
                                <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Silk Drape Midi Dress" type="text"
                                    className={`w-full border-b ${fieldErrors.title ? 'border-red-500' : 'border-[#dddddd]'} pb-2 font-body text-base text-[#1a1c1c] placeholder-[#b5b5b5] focus:outline-none focus:border-black transition-colors bg-transparent`} />
                                {fieldErrors.title && <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Subtitle</label>
                                <input name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="e.g. Limited Edition Silk Blend" type="text"
                                    className={`w-full border-b ${fieldErrors.subtitle ? 'border-red-500' : 'border-[#dddddd]'} pb-2 font-body text-base text-[#1a1c1c] placeholder-[#b5b5b5] focus:outline-none focus:border-black transition-colors bg-transparent`} />
                                {fieldErrors.subtitle && <p className="text-red-500 text-xs mt-1">{fieldErrors.subtitle}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">SKU</label>
                                <input name="sku" value={formData.sku} onChange={handleChange}
                                    className={`w-full border-b ${fieldErrors.sku ? 'border-red-500' : 'border-[#dddddd]'} pb-2 font-body text-base text-[#1a1c1c] placeholder-[#b5b5b5] focus:outline-none focus:border-black transition-colors bg-transparent`}
                                    placeholder="VO-2026-001" type="text" />
                                {fieldErrors.sku && <p className="text-red-500 text-xs mt-1">{fieldErrors.sku}</p>}
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange}
                                    className={`w-full border-b ${fieldErrors.description ? 'border-red-500' : 'border-[#dddddd]'} pb-2 font-body text-base text-[#1a1c1c] placeholder-[#b5b5b5] focus:outline-none focus:border-black transition-colors bg-transparent resize-none`}
                                    placeholder="Crafted from Italian mulberry silk..." rows={5} />
                                {fieldErrors.description && <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Inventory */}
                    <section className="bg-[#fdfdfd] border border-[#eeeeee] p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Base Price </label>
                                <div className="relative">
                                    <span className="absolute -left-1 bottom-2.5 text-[#777777] font-body">Rs</span>
                                    <input name="price" value={formData.price} onChange={handleChange}
                                        className={`w-full border-b ${fieldErrors.price ? 'border-red-500' : 'border-[#dddddd]'} pb-2 pl-4 font-body text-base text-[#1a1c1c] focus:outline-none focus:border-black bg-transparent`}
                                        placeholder="0.00" type="number" />
                                </div>
                                {fieldErrors.price && <p className="text-red-500 text-xs mt-1">{fieldErrors.price}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Sale Price</label>
                                <div className="relative">
                                    <span className="absolute -left-1 bottom-2.5 text-[#777777] font-body">Rs</span>
                                    <input name="salePrice" value={formData.salePrice} onChange={handleChange}
                                        className={`w-full border-b ${fieldErrors.salePrice ? 'border-red-500' : 'border-[#dddddd]'} pb-2 pl-4 font-body text-base text-[#1a1c1c] focus:outline-none focus:border-black bg-transparent`}
                                        placeholder="0.00" type="number" />
                                </div>
                                {fieldErrors.salePrice && <p className="text-red-500 text-xs mt-1">{fieldErrors.salePrice}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Initial Stock</label>
                                <input name="stock" value={formData.stock} onChange={handleChange}
                                    className={`w-full border-b ${fieldErrors.stock ? 'border-red-500' : 'border-[#dddddd]'} pb-2 font-body text-base text-[#1a1c1c] focus:outline-none focus:border-black bg-transparent`}
                                    placeholder="0" type="number" />
                                {fieldErrors.stock && <p className="text-red-500 text-xs mt-1">{fieldErrors.stock}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Taxonomy */}
                    <section className="space-y-8">
                        <div className="flex items-baseline justify-between border-b border-[#eeeeee] pb-4">
                            <h2 className="text-3xl font-headline font-medium text-[#1a1c1c]">Taxonomy</h2>
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Section 03</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {selectGroups.map((selectGroup, index) => (
                                <div className="space-y-2 transition-all group" key={index}>
                                    <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">
                                        {selectGroup.label}
                                    </label>
                                    <div className="relative">
                                        <select
                                            name={selectGroup.name}
                                            value={formData[selectGroup.name]}
                                            onChange={handleChange}
                                            className={`w-full border-b ${fieldErrors[selectGroup.name] ? 'border-red-500' : 'border-[#dddddd]'} pb-2 font-body text-base text-[#1a1c1c] bg-transparent focus:outline-none focus:border-black appearance-none pr-8 cursor-pointer`}
                                        >
                                            <option value="">Select {selectGroup.label}</option>
                                            {selectGroup.options.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                            {selectGroup.actionValue && (
                                                <>
                                                    <option disabled>──────────</option>
                                                    <option value={selectGroup.actionValue} className="font-bold text-black bg-gray-100">
                                                        {selectGroup.actionLabel}
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                        <MdExpandMore className="absolute right-0 bottom-2 text-[#777777] text-xl pointer-events-none" />
                                    </div>
                                    {fieldErrors[selectGroup.name] && <p className="text-red-500 text-xs mt-1">{fieldErrors[selectGroup.name]}</p>}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Attributes & Status */}
                    <section className="space-y-8">
                        <div className="flex items-baseline justify-between border-b border-[#eeeeee] pb-4">
                            <h2 className="text-3xl font-headline font-medium text-[#1a1c1c]">Attributes &amp; Status</h2>
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Section 04</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Colors</label>
                                <input name="colors" value={formData.colors} onChange={handleChange}
                                    className={`w-full border-b ${fieldErrors.colors ? 'border-red-500' : 'border-[#dddddd]'} pb-2 font-body text-base text-[#1a1c1c] focus:outline-none focus:border-black bg-transparent`}
                                    placeholder="e.g. Noir, Blanc" type="text" />
                                {fieldErrors.colors && <p className="text-red-500 text-xs mt-1">{fieldErrors.colors}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Sizes</label>
                                <input name="sizes" value={formData.sizes} onChange={handleChange}
                                    className={`w-full border-b ${fieldErrors.sizes ? 'border-red-500' : 'border-[#dddddd]'} pb-2 font-body text-base text-[#1a1c1c] focus:outline-none focus:border-black bg-transparent`}
                                    placeholder="e.g. S, M, L, XL" type="text" />
                                {fieldErrors.sizes && <p className="text-red-500 text-xs mt-1">{fieldErrors.sizes}</p>}
                            </div>

                            <div className="md:col-span-2 flex items-center justify-between bg-[#fdfdfd] border border-[#eeeeee] p-4 mt-4">
                                <div className="space-y-1">
                                    <p className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Published Status</p>
                                    <p className="font-body text-sm text-[#474747]">Make this product visible in the store</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer select-none">
                                    <input name="isPublished" type="checkbox" checked={formData.isPublished} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-[#dddddd] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black" />
                                </label>
                            </div>
                        </div>
                    </section>
                </form>
            </main>

            {/* Bottom Bar */}
            <nav className="fixed bottom-0 left-0 w-full h-16 flex justify-around items-stretch bg-white z-50 border-t border-[#eeeeee]">
                <button
                    type="button"
                    onClick={() => navigate("/admin/catalog")}
                    className="flex flex-col items-center justify-center cursor-pointer text-[#777777] w-1/2 h-full hover:bg-[#f9f9f9] transition-all active:scale-95 duration-150 border-r border-[#eeeeee]"
                >
                    <RxCross2 className="text-lg mb-1" />
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold">Discard</span>
                </button>
                <button
                    form="product-form"
                    type="submit"
                    disabled={loading}
                    className="flex flex-col items-center justify-center cursor-pointer text-white bg-black w-1/2 h-full hover:bg-[#2a2a2a] disabled:bg-gray-400 transition-all active:scale-95 duration-150"
                >
                    {loading ? (
                        <FaSpinner className="animate-spin text-lg" />
                    ) : (
                        <>
                            <FaCheck className="text-lg mb-1" />
                            <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                                {isEditMode ? "Update Product" : "Save Product"}
                            </span>
                        </>
                    )}
                </button>
            </nav>
        </div>
    );
};

export default AddProduct;