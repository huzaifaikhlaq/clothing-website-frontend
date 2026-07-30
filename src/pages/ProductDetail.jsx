import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdOutlineExpandMore } from "react-icons/md";
import ProductGrid from "../components/product/ProductGrid";
import { getProductById, getAllProducts } from "../hooks/useProduct.js";
import { addCartItem } from "../features/cart/cartTrunks.js";

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Data State
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Interactive UI State
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState("details");
    const [validationError, setValidationError] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getProductById(id);
                const currentProduct = response?.result?.product || response?.product || response;

                setProduct(currentProduct);

                if (currentProduct?.images?.length > 0) {
                    setSelectedImage(currentProduct.images[0]);
                }
                if (currentProduct?.colors?.length > 0) {
                    setSelectedColor(currentProduct.colors[0]);
                }
                if (currentProduct?.sizes?.length > 0) {
                    setSelectedSize(currentProduct.sizes[0]);
                }

                const allProductsRes = await getAllProducts();
                const allProducts = allProductsRes?.result?.products || [];
                setRelatedProducts(allProducts.filter((p) => p._id !== id));
            } catch (err) {
                setError(err.message || "Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductData();
        }
    }, [id]);

    // Handlers
    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, Math.min(prev + delta, product?.stock || 10)));
    };

    const toggleAccordion = (section) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    const handleAddToCart = async () => {
        setValidationError("");

        if (product?.sizes?.length > 0 && !selectedSize) {
            setValidationError("Please select a size.");
            return;
        }

        if (product?.colors?.length > 0 && !selectedColor) {
            setValidationError("Please select a color.");
            return;
        }

        setIsAdding(true);;

        try {
            const resultAction = await dispatch(
                addCartItem({
                    product: product._id,
                    size: selectedSize,
                    color: selectedColor,
                    quantity,
                })
            );

            if (addCartItem.rejected.match(resultAction)) {
                setValidationError(resultAction.payload || "Failed to add item to cart.");
            }
        } catch (err) {
            setValidationError(err.message || "An unexpected error occurred in the ProductDetail page.");
        } finally {
            setIsAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="pt-32 pb-16 text-center font-body text-sm text-outline">
                Loading product details...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="pt-32 pb-16 text-center font-body text-sm text-red-500">
                {error || "Product not found."}
            </div>
        );
    }

    return (
        <main className="pt-15 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Dynamic Breadcrumbs */}
            <nav className="mb-8 overflow-x-auto whitespace-nowrap no-scrollbar">
                <ol className="flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-outline">
                    <li>
                        <Link className="hover:text-primary transition-colors capitalize" to="/">
                            {product.gender || "Shop"}
                        </Link>
                    </li>
                    {product.category?.name && (
                        <li className="flex items-center gap-2">
                            <span className="text-[8px]">/</span>
                            <Link className="hover:text-primary transition-colors" to="#">
                                {product.category.name}
                            </Link>
                        </li>
                    )}
                    <li className="flex items-center gap-2">
                        <span className="text-[8px]">/</span>
                        <span className="text-primary font-bold">{product.title}</span>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
                {/* Dynamic Image Gallery */}
                <div className="md:col-span-7 flex flex-col gap-4">
                    <div className="aspect-3-4 bg-surface-container overflow-hidden group">
                        <img
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={selectedImage || product.images?.[0]}
                        />
                    </div>

                    {product.images?.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-20 h-24 flex-shrink-0 bg-surface-container overflow-hidden border-2 transition-all ${selectedImage === img
                                        ? "border-primary"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title} thumbnail ${idx}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="md:col-span-5 flex flex-col gap-8">
                    <section>
                        {product.badge && (
                            <span className="inline-block px-2 py-0.5 mb-2 font-body text-[9px] uppercase tracking-widest bg-primary/10 text-primary rounded-xs">
                                {product.badge}
                            </span>
                        )}
                        <h1 className="font-headline text-3xl md:text-4xl text-on-background mb-2">
                            {product.title}
                        </h1>
                        <p className="font-body text-xs text-outline mb-3">{product.subtitle}</p>

                        <div className="flex items-center gap-3 font-body text-lg font-bold">
                            {product.salePrice ? (
                                <>
                                    <span className="text-primary">
                                        PKR{" "}
                                        {product.salePrice.toLocaleString("en-PK", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>
                                    <span className="line-through text-outline text-sm font-normal">
                                        PKR{" "}
                                        {product.price.toLocaleString("en-PK", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>
                                </>
                            ) : (
                                <span className="text-primary">
                                    PKR{" "}
                                    {product.price?.toLocaleString("en-PK", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            )}
                        </div>
                    </section>

                    <p className="font-body text-sm leading-relaxed text-on-surface-variant max-w-md">
                        {product.description}
                    </p>

                    {/* Color Selector */}
                    {product.colors?.length > 0 && (
                        <div>
                            <span className="font-body text-[10px] tracking-widest uppercase mb-4 block">
                                Color: <span className="font-bold">{selectedColor}</span>
                            </span>
                            <div className="flex gap-4">
                                {product.colors.map((color) => (
                                    <button key={color} onClick={() => setSelectedColor(color)} style={{ backgroundColor: color.toLowerCase().replace(/\s+/g, '') }} title={color} className={`w-8 h-8 rounded-full border border-gray-300 ring-1 ring-offset-2 transition-all ${selectedColor === color ? "ring-primary scale-110" : "ring-transparent hover:scale-105"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Size Selector */}
                    {product.sizes?.length > 0 && (
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <span className="font-body text-[10px] tracking-widest uppercase block">
                                    Select Size
                                </span>
                                <a
                                    className="font-body text-[10px] tracking-widest uppercase underline underline-offset-4 text-outline hover:text-primary"
                                    href="#"
                                >
                                    Size Guide
                                </a>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setValidationError("");
                                        }}
                                        className={`py-3 font-body text-xs transition-colors ${selectedSize === size
                                            ? "bg-primary text-on-primary font-bold"
                                            : "border border-outline-variant hover:border-primary"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stock & Quantity Actions */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center border border-outline-variant w-fit">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-4 py-2 hover:bg-surface-container transition-colors disabled:opacity-40"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="px-6 font-body text-sm">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-4 py-2 hover:bg-surface-container transition-colors disabled:opacity-40"
                                    disabled={quantity >= product.stock}
                                >
                                    +
                                </button>
                            </div>
                            <span className="font-body text-xs text-outline">
                                {product.stock > 0
                                    ? `${product.stock} items available`
                                    : "Out of Stock"}
                            </span>
                        </div>

                        {validationError && (
                            <p className="text-xs font-body text-red-500">{validationError}</p>
                        )}

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0 || isAdding}
                            className="w-full bg-primary text-on-primary py-5 font-body text-sm uppercase tracking-[0.2em] transition-all duration-150 hover:bg-primary/90 active:scale-95 active:opacity-70 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 border"
                        >
                            {isAdding
                                ? "Adding..."
                                : product.stock > 0
                                    ? "Add to Cart"
                                    : "Out of Stock"}
                        </button>
                    </div>

                    {/* Accordions */}
                    <div className="border-t border-outline-variant">
                        <div className="border-b border-outline-variant">
                            <button
                                onClick={() => toggleAccordion("details")}
                                className="w-full py-5 flex justify-between items-center text-left"
                            >
                                <span className="font-body text-[10px] tracking-widest uppercase font-bold">
                                    Product Details
                                </span>
                                <MdOutlineExpandMore
                                    className={`text-lg transition-transform duration-300 ${activeAccordion === "details" ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {activeAccordion === "details" && (
                                <div className="pb-5 text-sm text-on-surface-variant font-body leading-relaxed">
                                    <p>
                                        SKU: <span className="font-semibold">{product.sku}</span>
                                    </p>
                                    <p>
                                        Category:{" "}
                                        <span className="font-semibold">
                                            {product.category?.name || "General"}
                                        </span>
                                    </p>
                                    <p className="mt-2">{product.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-outline-variant">
                            <button
                                onClick={() => toggleAccordion("size")}
                                className="w-full py-5 flex justify-between items-center text-left"
                            >
                                <span className="font-body text-[10px] tracking-widest uppercase font-bold">
                                    Size & Fit
                                </span>
                                <MdOutlineExpandMore
                                    className={`text-lg transition-transform duration-300 ${activeAccordion === "size" ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {activeAccordion === "size" && (
                                <div className="pb-5 text-sm text-on-surface-variant font-body leading-relaxed">
                                    Fits true to size. Take your normal size. Model is wearing size S.
                                </div>
                            )}
                        </div>

                        <div className="border-b border-outline-variant">
                            <button
                                onClick={() => toggleAccordion("shipping")}
                                className="w-full py-5 flex justify-between items-center text-left"
                            >
                                <span className="font-body text-[10px] tracking-widest uppercase font-bold">
                                    Shipping & Returns
                                </span>
                                <MdOutlineExpandMore
                                    className={`text-lg transition-transform duration-300 ${activeAccordion === "shipping" ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {activeAccordion === "shipping" && (
                                <div className="pb-5 text-sm text-on-surface-variant font-body leading-relaxed">
                                    Free standard shipping on orders over $150. Returns accepted within
                                    30 days.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mt-24">
                    <h2 className="font-headline text-lg md:text-xl lg:text-2xl italic tracking-tight mb-8">
                        You May Also Like
                    </h2>
                    <ProductGrid products={relatedProducts.slice(0, 4)} />
                </section>
            )}
        </main>
    );
};

export default ProductDetail;