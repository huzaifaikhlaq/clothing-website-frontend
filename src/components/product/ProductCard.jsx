import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

const ProductCard = ({ product, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    const isAdminRoute = location.pathname.toLowerCase().includes("admin")

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMenuToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu((prev) => !prev);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(false);

        navigate(`/admin/products/edit/${product._id || product.id}`);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(false);
        if (onDelete) onDelete(product);
    };

    const isSale = product.salePrice > 0 && product.badge === "sale";

    return (
        <div className="relative group flex flex-col">
            {/* Product Link wrapper */}
            <Link to={`/product/${product._id || product.id}`} className="flex flex-col">
                <ProductImage
                    src={product.images?.[0]}
                    alt={`Image of ${product.title}`}
                    badge={product.badge}
                />

                <ProductInfo
                    title={product.title}
                    subtitle={product.subtitle}
                    gender={product.gender}
                    price={isSale ? product.salePrice : product.price}
                    originalPrice={isSale ? product.price : null}
                />
            </Link>

            {/* Admin Action Menu - Checks if URL includes "admin" */}
            {isAdminRoute && (
                <div ref={menuRef} className="absolute top-3 right-3 z-20">
                    <button
                        onClick={handleMenuToggle}
                        className="p-2 bg-white/90 hover:bg-white text-black rounded-full shadow-md backdrop-blur-sm transition-all focus:outline-none"
                        aria-label="Product options"
                    >
                        <BsThreeDotsVertical size={16} />
                    </button>

                    {/* Action Dropdown */}
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border border-[#eeeeee] shadow-xl z-30 py-1 flex flex-col">
                            <button
                                onClick={handleEdit}
                                className="w-full px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#1a1c1c] hover:bg-[#f7f7f5] flex items-center gap-2 transition-colors"
                            >
                                <MdEdit size={16} /> Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-full px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                            >
                                <MdDelete size={16} /> Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductCard;