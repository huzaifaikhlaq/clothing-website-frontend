import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MdWest, MdEast, MdClose } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import ProductGrid from "../components/product/ProductGrid";
import { getAllProducts } from "../hooks/useProduct";
import { getProductById } from "../hooks/useProduct";

const CategoryPage = () => {
    const { gender, subCategory } = useParams();

    const [searchQuery, setSearchQuery] = useState("");



    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 8;





    const navLinks = [
        { name: "New", path: "/collections/new" },
        { name: "Men", path: "/collections/men" },
        { name: "Women", path: "/collections/women" },
        { name: "Junior", path: "/collections/junior" },
        { name: "Collections", path: "/collections/collections" },
    ];

    const filterOptions = ["all", "tops", "bottoms", "new", "sale"].filter((f) => {
        if (currentGender === "new" && f === "new") return false;
        if (currentGender === "collections" && f === "all") return false;
        return true;
    });

    return (
        <div className="bg-white min-h-screen">
            <div className="pb-20 max-w-[1440px] mx-auto px-4 md:px-8">
                {/* NAV */}
                <nav className="flex justify-center gap-4 md:gap-8 py-4">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => isActive ? "text-zinc-900 font-bold border-b border-zinc-900 text-[10px] uppercase" : "text-zinc-500 hover:text-zinc-900 text-[10px] uppercase"}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* TITLE SECTION */}
                <section className="mb-8 mt-4 md:mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-2 text-zinc-900 capitalize">
                                {currentGender} {activeSubFilter !== 'all' ? ` - ${activeSubFilter}` : ''}
                            </h1>
                            <p className="text-zinc-500 text-xs md:text-sm tracking-wide max-w-md">
                                Modern essentials and architectural silhouettes.
                            </p>
                        </div>
                        <span className="text-[10px] tracking-widest uppercase text-zinc-400">
                            {filteredProducts.length} Results
                        </span>
                    </div>
                </section>

                {/* FILTER BAR - Improved for Mobile */}
                <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm -mx-4 px-4 md:mx-0 md:px-0 py-4 mb-8 border-y border-zinc-100">
                    <div className="flex items-center justify-between">
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold md:hidden"
                        >
                            <FiFilter size={16} /> Filter & Sort
                        </button>

                        {/* Desktop Filters */}
                        <div className="hidden md:flex items-center space-x-6">
                            <span className="text-[10px] uppercase text-zinc-400 font-bold">Filter By:</span>
                            {filterOptions.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => { setActiveSubFilter(f); setCurrentPage(1); }}
                                    className={`text-[10px] uppercase tracking-widest hover:text-black transition-colors ${activeSubFilter === f ? 'text-black font-bold' : 'text-zinc-400'}`}
                                >
                                    {f}
                                </button>
                            ))}
                            <div className="h-4 w-[1px] bg-zinc-200"></div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] uppercase text-zinc-400">Max Price: ${priceRange}</span>
                                <input
                                    type="range" min="20" max="500" value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-24 accent-black"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* MOBILE FILTER OVERLAY (Drawer) */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
                        <div className="absolute right-0 top-0 h-full w-4/5 bg-white p-6 shadow-xl animate-in slide-in-from-right">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-sm font-bold uppercase tracking-widest">Filters</h2>
                                <button onClick={() => setIsMobileFilterOpen(false)}><MdClose size={24} /></button>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] uppercase text-zinc-400 mb-4 font-bold tracking-widest">Category</p>
                                    <div className="flex flex-wrap gap-2">
                                        {filterOptions.map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => { setActiveSubFilter(f); setCurrentPage(1); }}
                                                className={`px-4 py-2 text-[10px] uppercase border transition-all ${activeSubFilter === f ? 'bg-black text-white border-black' : 'border-zinc-200 text-zinc-500'}`}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase text-zinc-400 mb-4 font-bold tracking-widest">Price Range: ${priceRange}</p>
                                    <input
                                        type="range" min="20" max="500" value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        className="w-full accent-black"
                                    />
                                </div>

                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest font-bold mt-10"
                                >
                                    Show {filteredProducts.length} Results
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* PRODUCT GRID */}
                {paginatedProducts.length > 0 ? (
                    <ProductGrid products={paginatedProducts} />
                ) : (
                    <div className="py-20 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-lg">
                        No items found matching your selection.
                    </div>
                )}

                {/* PAGINATION - Mobile Responsive */}
                {totalPages > 1 && (
                    <section className="mt-16 md:mt-24 flex justify-center items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }}
                            className="w-10 h-10 flex items-center justify-center text-zinc-400 disabled:opacity-10 hover:text-zinc-900"
                        >
                            <MdWest size={20} />
                        </button>

                        <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] no-scrollbar">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => { setCurrentPage(index + 1); window.scrollTo(0, 0); }}
                                    className={`min-w-[40px] h-10 flex items-center justify-center text-[10px] transition-all ${currentPage === index + 1
                                        ? "font-bold border-b-2 border-zinc-900 text-zinc-900"
                                        : "text-zinc-400"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}
                            className="w-10 h-10 flex items-center justify-center text-zinc-400 disabled:opacity-10 hover:text-zinc-900"
                        >
                            <MdEast size={20} />
                        </button>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;