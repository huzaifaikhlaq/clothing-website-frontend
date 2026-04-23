import React, { useState, useMemo, useEffect } from "react";
import { IoMdSearch, IoMdArrowDropdown, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { MdSort } from "react-icons/md";
import ProductGrid from "../../components/product/ProductGrid";

const Catalog = () => {
    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeStatus, setActiveStatus] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
    const [openDropdown, setOpenDropdown] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const products = [
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
    ];

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || product.category.toLowerCase() === activeCategory.toLowerCase();
            const matchesStatus = activeStatus === "All" || product.badge.toLowerCase() === activeStatus.toLowerCase();
            return matchesSearch && matchesCategory && matchesStatus;
        }).sort((a, b) => {
            if (sortBy === "Price: Low-High") return a.price - b.price;
            if (sortBy === "Price: High-Low") return b.price - a.price;
            if (sortBy === "A-Z") return a.title.localeCompare(b.title);
            return 0;
        });
    }, [searchQuery, activeCategory, activeStatus, sortBy]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory, activeStatus, sortBy]);

    // Pagination Calculations
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const toggleDropdown = (name) => setOpenDropdown(prev => (prev === name ? null : name));

    return (
        <main className="md:ml-72 min-h-screen bg-[#F7F7F5]">
            <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
                {/* Hero Header */}
                <section className="mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-2xl">
                            <h2 className="font-headline text-5xl md:text-6xl tracking-tighter text-[#1a1c1c] mb-3 leading-none">Catalog</h2>
                            <p className="text-[#777777] max-w-sm font-label text-sm leading-tight uppercase tracking-tight">
                                Curating the finest silhouettes for the modern monolith. Manage your global inventory across five continents.
                            </p>
                        </div>
                        <button className="bg-black text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#333] transition-all active:scale-[0.98]">
                            Add New Piece
                        </button>
                    </div>
                </section>

                {/* Search & Filters */}
                <section className="mb-12 relative">
                    <div className="bg-[#eeeeee] p-0.5 flex flex-col md:flex-row gap-0.5">
                        <div className="relative flex-grow">
                            <IoMdSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[#777777] text-xl" />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border-none py-6 pl-16 pr-8 text-[10px] font-bold tracking-widest focus:ring-0 uppercase outline-none"
                                placeholder="SEARCH SKU OR PRODUCT NAME..."
                                type="text"
                            />
                        </div>

                        <div className="flex bg-white divide-x divide-[#eeeeee] relative">
                            {/* Category Filter */}
                            <div className="relative">
                                <button onClick={() => toggleDropdown('category')} className={`px-8 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-[#f9f9f9] transition-colors flex items-center gap-2 ${activeCategory !== 'All' ? 'text-blue-600' : ''}`}>
                                    {activeCategory === 'All' ? 'Category' : activeCategory} <IoMdArrowDropdown size={16} />
                                </button>
                                {openDropdown === 'category' && (
                                    <div className="absolute top-full left-0 w-48 bg-white shadow-xl z-50 border border-[#eeeeee] flex flex-col">
                                        {['All', 'Tops', 'Bottoms'].map(cat => (
                                            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenDropdown(null); }} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0">{cat}</button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <button onClick={() => toggleDropdown('status')} className={`px-8 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-[#f9f9f9] transition-colors flex items-center gap-2 ${activeStatus !== 'All' ? 'text-blue-600' : ''}`}>
                                    {activeStatus === 'All' ? 'Status' : activeStatus} <IoMdArrowDropdown size={16} />
                                </button>
                                {openDropdown === 'status' && (
                                    <div className="absolute top-full left-0 w-48 bg-white shadow-xl z-50 border border-[#eeeeee] flex flex-col">
                                        {['All', 'New', 'Sale'].map(stat => (
                                            <button key={stat} onClick={() => { setActiveStatus(stat); setOpenDropdown(null); }} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0">{stat}</button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sort Filter */}
                            <div className="relative">
                                <button onClick={() => toggleDropdown('sort')} className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-[#f9f9f9] transition-colors flex items-center gap-2">
                                    {sortBy} <MdSort size={16} />
                                </button>
                                {openDropdown === 'sort' && (
                                    <div className="absolute top-full right-0 w-56 bg-white shadow-xl z-50 border border-[#eeeeee] flex flex-col">
                                        {['Newest', 'Price: Low-High', 'Price: High-Low', 'A-Z'].map(s => (
                                            <button key={s} onClick={() => { setSortBy(s); setOpenDropdown(null); }} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0">{s}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Inventory Grid */}
                <section className="bg-[#eeeeee] border-t border-[#eeeeee]">
                    {paginatedProducts.length > 0 ? (
                        <ProductGrid products={paginatedProducts} />
                    ) : (
                        <div className="bg-white py-24 text-center border-x border-b border-[#eeeeee]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">No pieces found matching your criteria</p>
                        </div>
                    )}
                </section>

                {/* Pagination/Footer */}
                <footer className="mt-24 border-t border-[#eeeeee] pt-12 flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#777777]">
                        Page {String(currentPage).padStart(2, '0')} of {String(totalPages || 1).padStart(2, '0')} — {filteredProducts.length} Total Entries
                    </p>
                    <div className="flex gap-2">
                        {/* Prev Button */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="w-12 h-12 flex items-center justify-center border border-[#eeeeee] text-[#777777] disabled:opacity-30 disabled:hover:border-[#eeeeee] hover:border-black hover:text-black transition-all"
                        >
                            <IoMdArrowBack />
                        </button>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-12 h-12 flex items-center justify-center border transition-all font-bold text-xs ${currentPage === pageNum
                                        ? "border-black bg-black text-white"
                                        : "border-[#eeeeee] text-[#777777] hover:border-black hover:text-black"
                                        }`}
                                >
                                    {String(pageNum).padStart(2, '0')}
                                </button>
                            );
                        })}

                        {/* Next Button */}
                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="w-12 h-12 flex items-center justify-center border border-[#eeeeee] text-[#777777] disabled:opacity-30 disabled:hover:border-[#eeeeee] hover:border-black hover:text-black transition-all"
                        >
                            <IoMdArrowForward />
                        </button>
                    </div>
                </footer>
            </div>
        </main>
    );
};

export default Catalog;