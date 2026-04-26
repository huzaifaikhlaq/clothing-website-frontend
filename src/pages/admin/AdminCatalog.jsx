import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch, IoMdArrowDropdown, IoMdArrowBack, IoMdArrowForward, IoMdClose } from "react-icons/io";
import { MdSort, MdFilterList } from "react-icons/md";
import ProductGrid from "../../components/product/ProductGrid";

const AdminCatalog = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeStatus, setActiveStatus] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Increased for better grid fill

    const products = [
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory, activeStatus, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const toggleDropdown = (name) => setOpenDropdown(prev => (prev === name ? null : name));

    return (
        // Added pt-20 for mobile top spacing, removed forced ml-72 for small screens
        <main className="md:ml-72 min-h-screen bg-[#F7F7F5] pt-10 md:pt-0">
            <div className="px-4 md:px-12 max-w-[1400px] mx-auto">

                {/* Hero Header */}
                <section className="mb-10 md:mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="max-w-2xl">
                            <h2 className="font-headline text-4xl md:text-6xl tracking-tighter text-[#1a1c1c] mb-3 leading-none">Catalog</h2>
                            <p className="text-[#777777] max-w-sm font-label text-[10px] md:text-sm leading-tight uppercase tracking-tight">
                                Curating silhouettes for the modern monolith. Global inventory management.
                            </p>
                        </div>
                        <Link to="/admin/addproduct" className="w-full md:w-auto bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#333] transition-all">
                            Add New Piece
                        </Link>
                    </div>
                </section>

                {/* Search & Filters Container */}
                <section className="mb-8 relative">
                    <div className="bg-[#eeeeee] p-0.5 flex flex-col md:flex-row gap-0.5">
                        {/* Search Input */}
                        <div className="relative flex-grow bg-white">
                            <IoMdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#777777] text-lg" />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border-none py-5 pl-14 pr-4 text-[10px] font-bold tracking-widest focus:ring-0 uppercase outline-none"
                                placeholder="SEARCH SKU OR NAME..."
                                type="text"
                            />
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                            className="md:hidden flex items-center justify-between bg-white px-5 py-4 text-[10px] font-bold uppercase tracking-widest border-t border-[#eeeeee]"
                        >
                            <span className="flex items-center gap-2"><MdFilterList size={18} /> Filters & Sort</span>
                            <IoMdArrowDropdown className={`transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} size={16} />
                        </button>

                        {/* Dropdowns - Desktop: Row | Mobile: Stacked Collapsible */}
                        <div className={`${isMobileFilterOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row bg-white md:divide-x divide-[#eeeeee]`}>

                            {/* Category Filter */}
                            <div className="relative border-b md:border-b-0 border-[#eeeeee]">
                                <button onClick={() => toggleDropdown('category')} className="w-full md:w-auto px-8 py-5 text-[10px] font-bold uppercase tracking-widest flex justify-between md:justify-start items-center gap-2">
                                    {activeCategory === 'All' ? 'Category' : activeCategory} <IoMdArrowDropdown />
                                </button>
                                {openDropdown === 'category' && (
                                    <div className="md:absolute top-full left-0 w-full md:w-48 bg-white md:shadow-xl z-50 border-t border-[#eeeeee] flex flex-col">
                                        {['All', 'Tops', 'Bottoms'].map(cat => (
                                            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenDropdown(null); setIsMobileFilterOpen(false); }} className="px-8 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0">{cat}</button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Status Filter */}
                            <div className="relative border-b md:border-b-0 border-[#eeeeee]">
                                <button onClick={() => toggleDropdown('status')} className="w-full md:w-auto px-8 py-5 text-[10px] font-bold uppercase tracking-widest flex justify-between md:justify-start items-center gap-2">
                                    {activeStatus === 'All' ? 'Status' : activeStatus} <IoMdArrowDropdown />
                                </button>
                                {openDropdown === 'status' && (
                                    <div className="md:absolute top-full left-0 w-full md:w-48 bg-white md:shadow-xl z-50 border-t border-[#eeeeee] flex flex-col">
                                        {['All', 'New', 'Sale'].map(stat => (
                                            <button key={stat} onClick={() => { setActiveStatus(stat); setOpenDropdown(null); setIsMobileFilterOpen(false); }} className="px-8 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0">{stat}</button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sort Filter */}
                            <div className="relative">
                                <button onClick={() => toggleDropdown('sort')} className="w-full md:w-auto px-8 py-5 text-[10px] font-bold uppercase tracking-widest flex justify-between md:justify-start items-center gap-2">
                                    {sortBy} <MdSort size={16} />
                                </button>
                                {openDropdown === 'sort' && (
                                    <div className="md:absolute top-full right-0 w-full md:w-56 bg-white md:shadow-xl z-50 border-t border-[#eeeeee] flex flex-col">
                                        {['Newest', 'Price: Low-High', 'Price: High-Low', 'A-Z'].map(s => (
                                            <button key={s} onClick={() => { setSortBy(s); setOpenDropdown(null); setIsMobileFilterOpen(false); }} className="px-8 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0">{s}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Inventory Grid */}
                <section className="bg-[#eeeeee]">
                    {paginatedProducts.length > 0 ? (
                        <ProductGrid products={paginatedProducts} />
                    ) : (
                        <div className="bg-white py-20 text-center border border-[#eeeeee]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">No results found</p>
                        </div>
                    )}
                </section>

                {/* Pagination/Footer - Optimized for wrapping */}
                <footer className="mt-16 md:mt-24 border-t border-[#eeeeee] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#777777] text-center md:text-left">
                        Page {currentPage} of {totalPages || 1} — {filteredProducts.length} Entries
                    </p>

                    <div className="flex gap-1 items-center">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#eeeeee] text-[#777777] disabled:opacity-20 hover:border-black hover:text-black transition-all"
                        >
                            <IoMdArrowBack />
                        </button>

                        <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[150px] md:max-w-none">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                // Simplified logic for mobile: only show current and neighbors if too many
                                const isVisible = totalPages <= 5 || (pageNum === 1 || pageNum === totalPages || Math.abs(currentPage - pageNum) <= 1);

                                if (!isVisible) return null;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => { setCurrentPage(pageNum); window.scrollTo(0, 0); }}
                                        className={`min-w-[40px] md:min-w-[48px] h-10 md:h-12 flex items-center justify-center border transition-all font-bold text-[10px] ${currentPage === pageNum
                                            ? "border-black bg-black text-white"
                                            : "border-[#eeeeee] text-[#777777] hover:border-black"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#eeeeee] text-[#777777] disabled:opacity-20 hover:border-black hover:text-black transition-all"
                        >
                            <IoMdArrowForward />
                        </button>
                    </div>
                </footer>
            </div>
        </main>
    );
};

export default AdminCatalog;