import { useState, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MdWest, MdEast, MdClose } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import ProductGrid from "../components/product/ProductGrid";

const CategoryPage = () => {
    const { gender, subCategory } = useParams();

    // 1. static data
    const allProducts = [
        { id: "p1", title: "Sculptural Linen Vest", description: "Regular fit | Womens", price: 195, originalPrice: null, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "NEW", gender: "women", category: "tops", color: "white" },
        { id: "p2", title: "Silk Bias Cut Top", description: "Slim fit | Womens", price: 280, originalPrice: null, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b", badge: "", gender: "women", category: "tops", color: "black" },
        { id: "p3", title: "Structured Poplin Shirt", description: "Oversized fit | Womens", price: 120, originalPrice: 210, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105", badge: "SALE", gender: "women", category: "tops", color: "blue" },
        { id: "p4", title: "Fine Knit Cashmere Tee", description: "Premium fit | Mens", price: 350, originalPrice: null, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633", badge: "", gender: "men", category: "tops", color: "gray" },
        { id: "p5", title: "Linen Relaxed Trousers", description: "Relaxed fit | Womens", price: 210, originalPrice: 250, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "SALE", gender: "women", category: "bottoms", color: "beige" },
        { id: "p6", title: "Wide Leg Denim Jeans", description: "Loose fit | Womens", price: 165, originalPrice: null, image: "https://images.unsplash.com/photo-1542272604-787c3835535d", badge: "NEW", gender: "women", category: "bottoms", color: "blue" },
        { id: "p7", title: "Cotton Oversized Shirt", description: "Oversized fit | Womens", price: 110, originalPrice: null, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", badge: "", gender: "women", category: "tops", color: "white" },
        { id: "p8", title: "Minimal Black Tank", description: "Slim fit | Womens", price: 75, originalPrice: null, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", badge: "NEW", gender: "women", category: "tops", color: "black" },
        { id: "p9", title: "Classic White Tee", description: "Regular fit | Mens", price: 60, originalPrice: 80, image: "https://images.unsplash.com/photo-1520975916090-3105956dac38", badge: "SALE", gender: "men", category: "tops", color: "white" },
        { id: "p10", title: "Relaxed Fit Hoodie", description: "Relaxed fit | Mens", price: 140, originalPrice: null, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", badge: "", gender: "men", category: "tops", color: "gray" },
        { id: "p11", title: "Relaxed Cargo Pants", description: "Utility fit | Mens", price: 135, originalPrice: null, image: "https://images.unsplash.com/photo-1624371438099-6e6a2a6f0f1f", badge: "", gender: "men", category: "bottoms", color: "olive" },
        { id: "p12", title: "High Waist Trousers", description: "Tailored fit | Womens", price: 190, originalPrice: 230, image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d46", badge: "SALE", gender: "women", category: "bottoms", color: "black" },
        { id: "p13", title: "Tailored Wool Blazer", description: "Structured fit | Mens", price: 295, originalPrice: 340, image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675", badge: "SALE", gender: "men", category: "tops", color: "black" },
        { id: "p14", title: "Slim Fit Shirt", description: "Slim fit | Mens", price: 105, originalPrice: null, image: "https://images.unsplash.com/photo-1593032465171-8e7e3f6d6f0c", badge: "", gender: "men", category: "tops", color: "blue" },
        { id: "p15", title: "Denim Jacket", description: "Regular fit | Mens", price: 220, originalPrice: null, image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47", badge: "NEW", gender: "men", category: "tops", color: "blue" },
        { id: "p16", title: "Pleated Midi Skirt", description: "Flowy fit | Womens", price: 160, originalPrice: null, image: "https://images.unsplash.com/photo-1520974735194-29f0d0b1c2c2", badge: "", gender: "women", category: "bottoms", color: "beige" },
        { id: "p17", title: "Soft Knit Sweater", description: "Regular fit | Womens", price: 175, originalPrice: 200, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990", badge: "SALE", gender: "women", category: "tops", color: "gray" },
        { id: "p18", title: "Striped Oxford Shirt", description: "Classic fit | Mens", price: 98, originalPrice: null, image: "https://images.unsplash.com/photo-1604176354201-9268730608", badge: "NEW", gender: "men", category: "tops", color: "blue" },
        { id: "p19", title: "Slim Fit Chino Pants", description: "Slim fit | Mens", price: 125, originalPrice: 145, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", badge: "", gender: "men", category: "bottoms", color: "brown" },
        { id: "p20", title: "Athletic Joggers", description: "Active fit | Mens", price: 95, originalPrice: null, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461", badge: "", gender: "men", category: "bottoms", color: "gray" },
    ];

    // 2. STATE
    const [activeSubFilter, setActiveSubFilter] = useState("all");
    const [priceRange, setPriceRange] = useState(500);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const itemsPerPage = 8;

    const currentGender = useMemo(() => {
        return gender || "collections";
    }, [gender]);

    // 4. FILTERING LOGIC
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const matchesGender = currentGender === "new"
                ? product.badge === "NEW"
                : (currentGender === "collections" ? true : product.gender === currentGender);

            let matchesSub = true;
            const activeFilter = subCategory || activeSubFilter;

            if (activeFilter === "all") matchesSub = true;
            else if (activeFilter === "tops") matchesSub = product.category === "tops";
            else if (activeFilter === "bottoms") matchesSub = product.category === "bottoms";
            else if (activeFilter === "sale") matchesSub = product.badge === "SALE";
            else if (activeFilter === "new") matchesSub = product.badge === "NEW";

            const matchesPrice = product.price <= priceRange;

            return matchesGender && matchesSub && matchesPrice;
        });
    }, [currentGender, subCategory, activeSubFilter, priceRange]);

    // 5. PAGINATION LOGIC
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

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