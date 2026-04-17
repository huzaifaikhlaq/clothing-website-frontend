import { useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdExpandMore, MdWest, MdEast } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import ProductGrid from "../components/product/ProductGrid";

const CategoryPage = () => {
    const location = useLocation();

    // 1. DATA (Enhanced with Category, Gender, and Color)
    const allProducts = [
        { id: "p1", title: "Sculptural Linen Vest", price: 195, originalPrice: null, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "NEW", gender: "women", category: "tops", color: "white" },
        { id: "p2", title: "Silk Bias Cut Top", price: 280, originalPrice: null, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b", badge: "", gender: "women", category: "tops", color: "black" },
        { id: "p3", title: "Structured Poplin Shirt", price: 120, originalPrice: 210, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105", badge: "SALE", gender: "women", category: "tops", color: "blue" },
        { id: "p4", title: "Fine Knit Cashmere Tee", price: 350, originalPrice: null, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633", badge: "", gender: "men", category: "tops", color: "gray" },
        { id: "p5", title: "Linen Relaxed Trousers", price: 210, originalPrice: 250, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "SALE", gender: "women", category: "bottoms", color: "beige" },
        { id: "p6", title: "Wide Leg Denim Jeans", price: 165, originalPrice: null, image: "https://images.unsplash.com/photo-1542272604-787c3835535d", badge: "NEW", gender: "women", category: "bottoms", color: "blue" },
        { id: "p7", title: "Cotton Oversized Shirt", price: 110, originalPrice: null, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", badge: "", gender: "women", category: "tops", color: "white" },
        { id: "p8", title: "Minimal Black Tank", price: 75, originalPrice: null, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", badge: "NEW", gender: "women", category: "tops", color: "black" },
        { id: "p9", title: "Classic White Tee", price: 60, originalPrice: 80, image: "https://images.unsplash.com/photo-1520975916090-3105956dac38", badge: "SALE", gender: "men", category: "tops", color: "white" },
        { id: "p10", title: "Relaxed Fit Hoodie", price: 140, originalPrice: null, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", badge: "", gender: "men", category: "tops", color: "gray" },

        { id: "p11", title: "Relaxed Cargo Pants", price: 135, originalPrice: null, image: "https://images.unsplash.com/photo-1624371438099-6e6a2a6f0f1f", badge: "", gender: "men", category: "bottoms", color: "olive" },
        { id: "p12", title: "High Waist Trousers", price: 190, originalPrice: 230, image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d46", badge: "SALE", gender: "women", category: "bottoms", color: "black" },
        { id: "p13", title: "Tailored Wool Blazer", price: 295, originalPrice: 340, image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675", badge: "SALE", gender: "men", category: "tops", color: "black" },
        { id: "p14", title: "Slim Fit Shirt", price: 105, originalPrice: null, image: "https://images.unsplash.com/photo-1593032465171-8e7e3f6d6f0c", badge: "", gender: "men", category: "tops", color: "blue" },
        { id: "p15", title: "Denim Jacket", price: 220, originalPrice: null, image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47", badge: "NEW", gender: "men", category: "tops", color: "blue" },
        { id: "p16", title: "Pleated Midi Skirt", price: 160, originalPrice: null, image: "https://images.unsplash.com/photo-1520974735194-29f0d0b1c2c2", badge: "", gender: "women", category: "bottoms", color: "beige" },
        { id: "p17", title: "Soft Knit Sweater", price: 175, originalPrice: 200, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990", badge: "SALE", gender: "women", category: "tops", color: "gray" },
        { id: "p18", title: "Striped Oxford Shirt", price: 98, originalPrice: null, image: "https://images.unsplash.com/photo-1604176354201-9268730608", badge: "NEW", gender: "men", category: "tops", color: "blue" },
        { id: "p19", title: "Slim Fit Chino Pants", price: 125, originalPrice: 145, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", badge: "", gender: "men", category: "bottoms", color: "brown" },
        { id: "p20", title: "Athletic Joggers", price: 95, originalPrice: null, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461", badge: "", gender: "men", category: "bottoms", color: "gray" },

        { id: "p21", title: "Silk Evening Blouse", price: 260, originalPrice: null, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3", badge: "NEW", gender: "women", category: "tops", color: "black" },
        { id: "p22", title: "Casual Summer Shorts", price: 85, originalPrice: null, image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b05b", badge: "", gender: "women", category: "bottoms", color: "white" },
        { id: "p23", title: "Formal Dress Pants", price: 180, originalPrice: 220, image: "https://images.unsplash.com/photo-1592878849122-5c6d66f9c6c7", badge: "SALE", gender: "men", category: "bottoms", color: "black" },
        { id: "p24", title: "Basic Crewneck Tee", price: 55, originalPrice: null, image: "https://images.unsplash.com/photo-1520974735194", badge: "", gender: "men", category: "tops", color: "white" },
        { id: "p25", title: "Elegant Wrap Skirt", price: 150, originalPrice: null, image: "https://images.unsplash.com/photo-1520975916090", badge: "", gender: "women", category: "bottoms", color: "black" },
        { id: "p26", title: "Relaxed Linen Shirt", price: 130, originalPrice: null, image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb", badge: "NEW", gender: "men", category: "tops", color: "beige" },
        { id: "p27", title: "Wide Fit Sweatpants", price: 90, originalPrice: null, image: "https://images.unsplash.com/photo-1578683010236", badge: "", gender: "men", category: "bottoms", color: "gray" },
        { id: "p28", title: "Chic Cropped Top", price: 115, originalPrice: null, image: "https://images.unsplash.com/photo-1495121605193-b116b5b09c8b", badge: "", gender: "women", category: "tops", color: "white" },
        { id: "p29", title: "Vintage Denim Jeans", price: 170, originalPrice: 200, image: "https://images.unsplash.com/photo-1514996937319-344454492b37", badge: "SALE", gender: "women", category: "bottoms", color: "blue" },
        { id: "p30", title: "Classic Polo Shirt", price: 95, originalPrice: null, image: "https://images.unsplash.com/photo-1520975916090", badge: "", gender: "men", category: "tops", color: "navy" },

        { id: "p31", title: "Soft Lounge Pants", price: 85, originalPrice: null, image: "https://images.unsplash.com/photo-1551488831", badge: "", gender: "women", category: "bottoms", color: "gray" },
        { id: "p32", title: "Oversized Blazer", price: 310, originalPrice: null, image: "https://images.unsplash.com/photo-1503342217505", badge: "NEW", gender: "women", category: "tops", color: "black" },
        { id: "p33", title: "Thermal Long Sleeve", price: 75, originalPrice: null, image: "https://images.unsplash.com/photo-1520975916090", badge: "", gender: "men", category: "tops", color: "white" },
        { id: "p34", title: "Casual Denim Shorts", price: 95, originalPrice: null, image: "https://images.unsplash.com/photo-1506629905607", badge: "", gender: "women", category: "bottoms", color: "blue" },
        { id: "p35", title: "Tailored Suit Pants", price: 210, originalPrice: 260, image: "https://images.unsplash.com/photo-1592878849122", badge: "SALE", gender: "men", category: "bottoms", color: "black" },
        { id: "p36", title: "Lightweight Summer Shirt", price: 120, originalPrice: null, image: "https://images.unsplash.com/photo-1521335629791", badge: "", gender: "men", category: "tops", color: "white" },
        { id: "p37", title: "Flowy Maxi Skirt", price: 180, originalPrice: null, image: "https://images.unsplash.com/photo-1520974735194", badge: "NEW", gender: "women", category: "bottoms", color: "beige" },
        { id: "p38", title: "Minimalist Black Hoodie", price: 150, originalPrice: null, image: "https://images.unsplash.com/photo-1556821840", badge: "", gender: "men", category: "tops", color: "black" },
        { id: "p39", title: "Classic Straight Jeans", price: 160, originalPrice: null, image: "https://images.unsplash.com/photo-1542272604", badge: "", gender: "women", category: "bottoms", color: "blue" },
        { id: "p40", title: "Premium Wool Coat", price: 420, originalPrice: 500, image: "https://images.unsplash.com/photo-1503341455253", badge: "SALE", gender: "men", category: "tops", color: "gray" },
    ];
    // 2. STATE
    const [activeSubFilter, setActiveSubFilter] = useState("all"); // tops, bottoms, sale, new
    const [priceRange, setPriceRange] = useState(500); // Max price
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 3. NAVIGATION LOGIC (GENDER)
    const currentGender = useMemo(() => {
        if (location.pathname.includes("women")) return "women";
        if (location.pathname.includes("men")) return "men";
        return "collections"; // Default/Both
    }, [location.pathname]);

    // 4. MULTI-LAYER FILTERING LOGIC
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            // Gender/Collection Filter
            const matchesGender = currentGender === "collections" ? true : product.gender === currentGender;

            // Sub-Filters (Tops, Bottoms, Sale, New)
            let matchesSub = true;
            if (activeSubFilter === "tops") matchesSub = product.category === "tops";
            else if (activeSubFilter === "bottoms") matchesSub = product.category === "bottoms";
            else if (activeSubFilter === "sale") matchesSub = product.badge === "SALE";
            else if (activeSubFilter === "new") matchesSub = product.badge === "NEW";

            // Price Filter
            const matchesPrice = product.price <= priceRange;

            return matchesGender && matchesSub && matchesPrice;
        });
    }, [currentGender, activeSubFilter, priceRange]);

    // 5. PAGINATION LOGIC
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const navLinks = [
        // { name: "New In", path: "/" },
        { name: "Women", path: "/women" },
        { name: "Men", path: "/men" },
        { name: "Collections", path: "/collections" },
        // { name: "Sale", path: "/sale" },
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className=" pb-20 max-w-[1440px] mx-auto px-4 md:px-8">
                {/* NAV */}
                <nav className="hidden md:flex justify-center gap-8 py-4 ">
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
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-2 text-zinc-900 capitalize">
                                {currentGender} {activeSubFilter !== 'all' ? ` - ${activeSubFilter} ` : ''}
                            </h1>
                            <p className="text-zinc-500 text-sm tracking-wide max-w-md">
                                {currentGender === "women" ? "Elegant architectural silhouettes for her." : currentGender === "men" ? "Modern essentials and tailored fits for him." : "The complete house collection."}
                            </p>
                        </div>
                        <span className="text-xs tracking-widest uppercase text-zinc-400">
                            {filteredProducts.length} Results
                        </span>
                    </div>
                </section>

                {/* FILTER BAR */}
                <section className="sticky top-[0px] z-40 bg-white/90 backdrop-blur-sm -mx-4 px-4 md:mx-0 md:px-0 py-4 mb-8 border-y border-zinc-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
                            <button onClick={() => setActiveSubFilter("all")}
                                className={`flex items - center gap - 1 font - label text - [10px] uppercase tracking - widest font - semibold transition - colors ${activeSubFilter === 'all' ? 'text-black' : 'text-zinc-400'} `}>
                                <FiFilter size={18} /> Filter
                            </button>
                            <div className="h-4 w-[1px] bg-zinc-200"></div>

                            {["tops", "bottoms", "new", "sale"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => { setActiveSubFilter(f); setCurrentPage(1); }}
                                    className={`font - label text - [10px] uppercase tracking - widest hover: text - black transition - colors whitespace - nowrap ${activeSubFilter === f ? 'text-black font-bold' : 'text-zinc-400'} `}
                                >
                                    {f}
                                </button>
                            ))}

                            <div className="flex items-center gap-2 ml-4">
                                <span className="text-[10px] uppercase text-zinc-400">Max Price: ${priceRange}</span>
                                <input
                                    type="range"
                                    min="50"
                                    max="500"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-24 accent-black"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="font-label text-[10px] uppercase tracking-widest text-zinc-400 hidden md:block">Sort by:</span>
                            <button className="flex items-center gap-1 font-label text-[10px] uppercase tracking-widest font-semibold">
                                Newest <MdExpandMore size={16} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* PRODUCT GRID */}
                {paginatedProducts.length > 0 ? (
                    <ProductGrid products={paginatedProducts} layout="grid" />
                ) : (
                    <div className="py-20 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-lg">
                        No items found matching your selection.
                    </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <section className="mt-24 flex flex-col items-center gap-8">
                        <div className="flex items-center space-x-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="w-10 h-10 flex items-center justify-center text-zinc-400 disabled:opacity-20 hover:text-zinc-900 transition-colors"
                            >
                                <MdWest size={18} />
                            </button>

                            <div className="flex items-center space-x-1">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`w-10 h-10 flex items-center justify-center text-xs transition-all ${currentPage === index + 1
                                            ? "font-bold border-b-2 border-zinc-900 text-zinc-900"
                                            : "text-zinc-400 hover:text-zinc-900"
                                            } `}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="w-10 h-10 flex items-center justify-center text-zinc-400 disabled:opacity-20 hover:text-zinc-900 transition-colors"
                            >
                                <MdEast size={18} />
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;