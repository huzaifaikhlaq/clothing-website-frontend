import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MdWest, MdEast, MdClose } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import ProductGrid from "../components/product/ProductGrid";
import { getAllProducts } from "../hooks/useProduct";
import { getAllCategories } from "../hooks/useCategory";

const CategoryPage = () => {
    const { gender: currentGender, subCategory: urlSubCategory } = useParams();

    // State management 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter States
    const [activeSubFilter, setActiveSubFilter] = useState(urlSubCategory || null);
    const [priceRange, setPriceRange] = useState(30000);
    const [maxPriceLimit, setMaxPriceLimit] = useState(30000);
    const [activeStatus, setActiveStatus] = useState("All");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Category states
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All"); // stores Category ID or "All"

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 8;

    // Dropdown states
    const [openDropdown, setOpenDropdown] = useState(null);

    const navLinks = [
        { name: "Men", path: "/collections/men" },
        { name: "Female", path: "/collections/female" },
        { name: "Junior", path: "/collections/junior" },
        { name: "Collections", path: "/collections/collections" },
    ];

    // Keep subCategory in sync with URL changes
    useEffect(() => {
        setActiveSubFilter(urlSubCategory || null);
        setCurrentPage(1);
    }, [urlSubCategory]);

    // Load Categories
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await getAllCategories();
                if (response) {
                    setCategoriesList(response?.categories || []);
                }
            } catch (err) {
                setError(err.message || "Failed to load categories");
            }
        };

        loadCategories();
    }, []);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const queryParams = {
                    page: currentPage,
                    limit: itemsPerPage,
                };

                if (currentGender && currentGender !== "collections") {
                    queryParams.gender = currentGender;
                }

                if (selectedCategory && selectedCategory !== "All") {
                    queryParams.category = selectedCategory;
                }

                if (activeSubFilter && activeSubFilter !== "all") {
                    queryParams.subCategory = activeSubFilter;
                }

                if (activeStatus && activeStatus !== "All") {
                    queryParams.badge = activeStatus.toLowerCase();
                }

                const response = await getAllProducts(queryParams);

                if (response?.result) {
                    const fetchedProducts = response.result.products || [];
                    setProducts(fetchedProducts);
                    setTotalPages(response.result.pagination?.totalPages || 1);
                    setTotalProducts(response.result.pagination?.totalDocs || 0);

                    // DYNAMIC PRICE LOGIC 
                    if (fetchedProducts.length > 0) {
                        const prices = fetchedProducts.map((p) => p.salePrice || p.price || 0);
                        const maxPrice = Math.max(...prices);
                        setPriceRange(maxPrice);
                    }
                }
            } catch (err) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentGender, activeSubFilter, currentPage, selectedCategory, activeStatus]);



    const toggleDropdown = (name) => setOpenDropdown((prev) => (prev === name ? null : name));

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1);
    };

    const displayedProducts = products.filter((product) => {
        const currentPrice = product.salePrice || product.price;
        return currentPrice <= priceRange;
    });


    const currentCategoryObj = categoriesList.find((c) => (c._id || c.name) === selectedCategory);
    const selectedCategoryName = currentCategoryObj ? currentCategoryObj.name : "";

    return (
        <div className="bg-white min-h-screen">
            <div className="pb-20 max-w-[1440px] mx-auto px-4 md:px-8">
                {/* NAV */}
                <nav className="flex justify-center gap-4 md:gap-8 py-4">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-zinc-900 font-bold border-b border-zinc-900 text-[10px] uppercase"
                                    : "text-zinc-500 hover:text-zinc-900 text-[10px] uppercase"
                            }
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
                                {currentGender}{selectedCategoryName && selectedCategoryName !== "all" ? `-${selectedCategoryName}` : ""}
                            </h1>
                            <p className="text-zinc-500 text-xs md:text-sm tracking-wide max-w-md">
                                Modern essentials and architectural silhouettes.
                            </p>
                        </div>
                        <span className="text-[10px] tracking-widest uppercase text-zinc-400">
                            {displayedProducts.length} Results
                        </span>
                    </div>
                </section>

                {/* FILTER BAR */}
                <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm -mx-4 px-4 md:mx-0 md:px-0 py-4 mb-8 border-y border-zinc-100">
                    <div className="flex items-center justify-between">
                        {/* Mobile Filter Toggle Button */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold md:hidden"
                        >
                            <FiFilter size={16} /> Filter & Sort
                        </button>

                        {/* Desktop Filters */}
                        <div className="hidden md:flex items-center space-x-6">
                            <span className="text-[10px] uppercase text-zinc-400 font-bold">
                                Filter By:
                            </span>

                            {/* "All" Category Button */}
                            <button
                                onClick={() => handleCategorySelect("All")}
                                className={`text-[10px] uppercase tracking-widest hover:text-black transition-colors ${selectedCategory === "All" ? "text-black font-bold" : "text-zinc-400"
                                    }`}
                            >
                                All
                            </button>

                            {categoriesList.map((f) => {
                                const categoryId = f._id || f.name;
                                const isSelected = selectedCategory === categoryId;
                                return (
                                    <button
                                        key={categoryId}
                                        onClick={() => handleCategorySelect(categoryId)}
                                        className={`text-[10px] uppercase tracking-widest hover:text-black transition-colors ${isSelected ? "text-black font-bold" : "text-zinc-400"
                                            }`}
                                    >
                                        {f.name}
                                    </button>
                                );
                            })}

                            <div className="h-4 w-[1px] bg-zinc-200"></div>

                            <div className="flex items-center gap-4">
                                <span className="text-[10px] uppercase text-zinc-400">
                                    Max Price: ${priceRange}
                                </span>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPriceLimit}
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-24 accent-black"
                                />
                            </div>

                            {/* Status/Badge Filter */}
                            <div className="relative max-md:border-b border border-[#eeeeee]">
                                <button
                                    onClick={() => toggleDropdown("status")}
                                    className="w-full md:w-auto px-8 py-5 text-[10px] font-bold uppercase tracking-widest flex justify-between md:justify-start items-center gap-2"
                                >
                                    {activeStatus === "All" ? "Status" : activeStatus} <IoMdArrowDropdown />
                                </button>
                                {openDropdown === "status" && (
                                    <div className="md:absolute top-full left-0 w-full md:w-48 bg-white md:shadow-xl z-50 border-t border-[#eeeeee] flex flex-col">
                                        {["All", "New", "Hot", "Sale", "Coming Soon"].map((stat) => (
                                            <button
                                                key={stat}
                                                onClick={() => {
                                                    setActiveStatus(stat);
                                                    setOpenDropdown(null);
                                                    setIsMobileFilterOpen(false);
                                                }}
                                                className="px-8 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left hover:bg-[#f7f7f5] border-b border-[#eeeeee] last:border-0"
                                            >
                                                {stat}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* MOBILE FILTER OVERLAY */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
                        <div className="absolute right-0 top-0 h-full w-4/5 bg-white p-6 shadow-xl overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-sm font-bold uppercase tracking-widest">
                                    Filters
                                </h2>
                                <button onClick={() => setIsMobileFilterOpen(false)}>
                                    <MdClose size={24} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] uppercase text-zinc-400 mb-4 font-bold tracking-widest">
                                        Category
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleCategorySelect("All")}
                                            className={`px-4 py-2 text-[10px] uppercase border transition-all ${selectedCategory === "All"
                                                ? "bg-black text-white border-black"
                                                : "border-zinc-200 text-zinc-500"
                                                }`}
                                        >
                                            All
                                        </button>

                                        {categoriesList.map((f) => {
                                            const categoryId = f._id || f.name;
                                            const isSelected = selectedCategory === categoryId;
                                            return (
                                                <button
                                                    key={categoryId}
                                                    onClick={() => handleCategorySelect(categoryId)}
                                                    className={`px-4 py-2 text-[10px] uppercase border transition-all ${isSelected
                                                        ? "bg-black text-white border-black"
                                                        : "border-zinc-200 text-zinc-500"
                                                        }`}
                                                >
                                                    {f.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase text-zinc-400 mb-4 font-bold tracking-widest">
                                        Price Range: ${priceRange}
                                    </p>
                                    <input
                                        type="range"
                                        min="0"
                                        max={maxPriceLimit}
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full accent-black"
                                    />
                                </div>

                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest font-bold mt-10"
                                >
                                    Show {displayedProducts.length} Results
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* LOADING & ERROR STATES */}
                {loading ? (
                    <div className="py-20 text-center text-zinc-400">
                        Loading products...
                    </div>
                ) : error ? (
                    <div className="py-20 text-center text-red-500">{error}</div>
                ) : displayedProducts.length > 0 ? (
                    <ProductGrid products={displayedProducts} />
                ) : (
                    <div className="py-20 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-lg">
                        No items found matching your selection.
                    </div>
                )}

                {/* PAGINATION */}
                {!loading && totalPages > 1 && (
                    <section className="mt-16 md:mt-24 flex justify-center items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => {
                                setCurrentPage((prev) => prev - 1);
                                window.scrollTo(0, 0);
                            }}
                            className="w-10 h-10 flex items-center justify-center text-zinc-400 disabled:opacity-10 hover:text-zinc-900"
                        >
                            <MdWest size={20} />
                        </button>

                        <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] no-scrollbar">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => {
                                        setCurrentPage(index + 1);
                                        window.scrollTo(0, 0);
                                    }}
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
                            onClick={() => {
                                setCurrentPage((prev) => prev + 1);
                                window.scrollTo(0, 0);
                            }}
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