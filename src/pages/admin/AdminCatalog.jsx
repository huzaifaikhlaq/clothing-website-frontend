import { getAllProducts } from "../../hooks/useProduct";
import { getAllCategories } from "../../hooks/useCategory";

import ProductGrid from "../../components/product/ProductGrid";

import { useState, useEffect, useCallback } from "react";

import { Link } from "react-router-dom";
import { IoMdSearch, IoMdArrowDropdown, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { MdSort, MdFilterList } from "react-icons/md";

const AdminCatalog = () => {

    const [categoriesList, setCategoriesList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeStatus, setActiveStatus] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");


    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState( false);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Pagination state     
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 8;

    const getSortOption = (sortLabel) => {
        switch (sortLabel) {
            case "Price: Low-High": return "price";
            case "Price: High-Low": return "-price";
            case "A-Z": return "title";
            case "Newest":
            default:
                return "-createdAt";
        }
    };

    const loadCategories = async () => {
        try {
            const data = await getAllCategories();

            // Keep category objects with _id and name
            const categoriesData = Array.isArray(data?.categories)
                ? data.categories
                : [];

            setCategoriesList(categoriesData);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const fetchCatalogProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = {
                page: currentPage,
                limit: itemsPerPage,
                sort: getSortOption(sortBy)
            };

            if (searchQuery.trim()) {
                queryParams.search = searchQuery.trim();
            }

            if (selectedCategory !== "All") {
                queryParams.category = selectedCategory;
            }

            if (activeStatus.toLowerCase() !== "all") {
                queryParams.badge = activeStatus.toLowerCase();
            }


            const data = await getAllProducts(queryParams);

            setProducts(data.result?.products || []);
            setTotalPages(data.result?.pagination?.totalPages || 1);
            setTotalProducts(data.result?.pagination?.totalProducts || 0);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError(err.response?.data?.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage, searchQuery, selectedCategory, activeStatus, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, activeStatus, sortBy]);

    useEffect(() => {
        fetchCatalogProducts();
    }, [fetchCatalogProducts]);

    const toggleDropdown = (name) => setOpenDropdown((prev) => (prev === name ? null : name));

    const getCategoryLabel = () => {
        if (selectedCategory === "All") return "Category";
        const found = categoriesList.find((c) => c._id === selectedCategory);
        return found ? found.name : "Category";
    };

    

    return (
        <main className="md:ml-72 min-h-screen bg-[#F7F7F5] pt-10 md:pt-0">
            <div className="px-4 md:px-12 max-w-[1400px] mx-auto">

                {/* Hero Header */}
                <section className="mb-10 md:mb-16">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                        <div className="max-w-2xl w-full">
                            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl tracking-tighter text-[#1a1c1c] mb-3 leading-none">
                                Catalog
                            </h2>
                            <p className="text-[#777777] max-w-sm font-label text-[11px] sm:text-xs md:text-sm leading-normal uppercase tracking-wider">
                                Curating silhouettes for the modern monolith. Global inventory management.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-row gap-3">
                            <Link to="/admin/products/add" className="w-full md:w-auto bg-black text-white px-6 py-4 text-center text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#333] transition-all">
                                Add Product
                            </Link>
                            <Link to="/admin/Categories/add" className="w-full md:w-auto bg-black text-white px-6 py-4 text-center text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#333] transition-all">
                                Edit or Add Category
                            </Link>
                            <Link to="/admin/collections/add" className="w-full md:w-auto bg-black text-white px-6 py-4 text-center text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#333] transition-all">
                                Edit or Add Collection
                            </Link>
                        </div>
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
                            <IoMdArrowDropdown className={`transition-transform ${isMobileFilterOpen ? "rotate-180" : ""}`} size={16} />
                        </button>

                        {/* Dropdowns */}
                        <div className={`${isMobileFilterOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row bg-white md:divide-x divide-[#eeeeee]`}>

                            {/* Category Filter */}
                            <div className="relative border-b md:border-b-0 border-[#eeeeee]">
                                <button onClick={() => toggleDropdown("category")} className="w-full md:w-auto px-8 py-5 text-[10px] font-bold uppercase tracking-widest flex justify-between md:justify-start items-center gap-2">
                                    {getCategoryLabel()} <IoMdArrowDropdown />
                                </button>
                                {openDropdown === "category" && (
                                    <div className="md:absolute top-full left-0 w-full md:w-48 bg-white md:shadow-xl z-50 border-t border-[#eeeeee] flex flex-col max-h-60 overflow-y-auto">
                                        <button
                                            onClick={() => { setSelectedCategory("All"); setOpenDropdown(null); setIsMobileFilterOpen(false); }}
                                            className="px-8 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee]"
                                        >
                                            All
                                        </button>
                                        {categoriesList.map((cat) => (
                                            <button
                                                key={cat._id}
                                                onClick={() => { setSelectedCategory(cat._id); setOpenDropdown(null); setIsMobileFilterOpen(false); }}
                                                className="px-8 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0"
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Status/Badge Filter */}
                            <div className="relative border-b md:border-b-0 border-[#eeeeee]">
                                <button onClick={() => toggleDropdown("status")} className="w-full md:w-auto px-8 py-5 text-[10px] font-bold uppercase tracking-widest flex justify-between md:justify-start items-center gap-2">
                                    {activeStatus === "All" ? "Status" : activeStatus} <IoMdArrowDropdown />
                                </button>
                                {openDropdown === "status" && (
                                    <div className="md:absolute top-full left-0 w-full md:w-48 bg-white md:shadow-xl z-50 border-t border-[#eeeeee] flex flex-col">
                                        {["All", "New", "Hot", "Sale", "Coming Soon"].map((stat) => (
                                            <button key={stat} onClick={() => { setActiveStatus(stat); setOpenDropdown(null); setIsMobileFilterOpen(false); }} className="px-8 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0">{stat}</button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sort Filter */}
                            <div className="relative">
                                <button onClick={() => toggleDropdown("sort")} className="w-full md:w-auto px-8 py-5 text-[10px] font-bold uppercase tracking-widest flex justify-between md:justify-start items-center gap-2">
                                    {sortBy} <MdSort size={16} />
                                </button>
                                {openDropdown === "sort" && (
                                    <div className="md:absolute top-full right-0 w-full md:w-56 bg-white md:shadow-xl z-50 border-t border-[#eeeeee] flex flex-col">
                                        {["Newest", "Price: Low-High", "Price: High-Low", "A-Z"].map((s) => (
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
                    {loading ? (
                        <div className="bg-white py-20 text-center border border-[#eeeeee]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">Loading catalog...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-white py-20 text-center border border-[#eeeeee]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">{error}</p>
                        </div>
                    ) : products.length > 0 ? (
                        <ProductGrid products={products} />
                    ) : (
                        <div className="bg-white py-20 text-center border border-[#eeeeee]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">No results found</p>
                        </div>
                    )}
                </section>

                {/* Pagination Footer */}
                <footer className="mt-16 md:mt-24 border-t border-[#eeeeee] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#777777] text-center md:text-left">
                        Page {currentPage} of {totalPages} — {totalProducts} Entries
                    </p>

                    <div className="flex gap-1 items-center">
                        <button
                            disabled={currentPage === 1 || loading}
                            onClick={() => { setCurrentPage((prev) => prev - 1); window.scrollTo(0, 0); }}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#eeeeee] text-[#777777] disabled:opacity-20 hover:border-black hover:text-black transition-all"
                        >
                            <IoMdArrowBack />
                        </button>

                        <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[150px] md:max-w-none">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
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
                            disabled={currentPage === totalPages || totalPages === 0 || loading}
                            onClick={() => { setCurrentPage((prev) => prev + 1); window.scrollTo(0, 0); }}
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