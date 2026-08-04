import React, { useState, useMemo, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { fetchAllAdminOrdersThunk } from "../../features/oders/orderTrunk";


import { IoMdSearch, IoMdTrendingUp, IoMdArrowBack, IoMdArrowForward, IoMdFunnel, IoMdCheckmark } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { useSelector } from "react-redux";

// Helper Functions
const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    return parts.length > 1
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : parts[0].substring(0, 2).toUpperCase();
};

// PKR Currency Formatter
const formatPKR = (amount) => {
    if (amount === undefined || amount === null) return "Rs 0";
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'delivered': return 'text-green-600 bg-green-50';
        case 'shipped': return 'text-purple-600 bg-purple-50';
        case 'processing': return 'text-blue-600 bg-blue-50';
        case 'pending': return 'text-yellow-600 bg-yellow-50';
        case 'cancelled': return 'text-red-600 bg-red-50';
        default: return 'text-gray-600 bg-gray-50';
    }
};

const AdminSales = () => {
    const dispatch = useDispatch(); 

    const { adminOrders = [], loading } = useSelector((state) => state.order);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        dispatch(fetchAllAdminOrdersThunk());
    }, [dispatch]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const filterRef = useRef(null);

    // 4. Update your useMemo to filter `adminOrders` instead of `orders`
    const filteredOrders = useMemo(() => {
        return adminOrders.filter(order => {
            const clientName = order?.shippingAddress?.fullName || "";
            const orderId = order?._id || "";
            const status = order?.orderStatus || "";
            const city = order?.shippingAddress?.city || "";

            const matchesSearch = clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                city.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter = filterStatus === "All" || status === filterStatus;

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, filterStatus, adminOrders]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(start, start + itemsPerPage);
    }, [filteredOrders, currentPage]);

    // Reset page on search/filter
    useEffect(() => { setCurrentPage(1); }, [searchQuery, filterStatus]);

    // Close filter on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) setIsFilterOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleExport = () => {
        const csv = filteredOrders.map(o =>
            `${o._id},${o.shippingAddress?.fullName},${o.shippingAddress?.city},${o.totalAmount},${o.orderStatus}`
        ).join('\n');
        console.log("Exporting Report...\n", csv);
        alert("Report generated for " + filteredOrders.length + " orders.");
    };

    return (
        <main className="md:ml-72 bg-[#F7F7F5] min-h-screen">
            {/* Header & KPI Section */}
            <section className="px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-6 pt-8 sm:pt-12">
                    <div>
                        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl tracking-tight mb-2 text-[#1a1c1c]">Sales & Orders</h1>
                        <p className="font-label text-[#777777] text-xs sm:text-sm max-w-md uppercase tracking-tight">
                            Comprehensive overview of global sales performance and fulfillment cycles for the current quarter.
                        </p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="bg-black text-white px-6 sm:px-10 py-3 sm:py-4 w-full sm:w-auto font-label uppercase tracking-widest text-[10px] hover:bg-[#333] transition-all active:scale-95 text-center"
                    >
                        Export Report
                    </button>
                </div>

                {/* Improved Responsiveness: Changed to sm:grid-cols-2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#eeeeee] border border-[#eeeeee]">
                    {[
                        { label: "Total Revenue", val: formatPKR(4829000), trend: "+12.5% from last month", trendIcon: <IoMdTrendingUp />, trendClass: "text-green-600" },
                        { label: "Current View", val: filteredOrders.length, trend: "Filtered active orders", trendClass: "text-[#777777]" },
                        { label: "Average Order Value", val: formatPKR(12500), trend: "Premium segment target met", trendClass: "text-[#777777]" },
                        { label: "Fulfillment Rate", val: "98.2%", trend: "Optimal performance", trendClass: "text-green-600" }
                    ].map((kpi, i) => (
                        <div key={i} className="bg-white p-6 sm:p-8">
                            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] mb-2 sm:mb-4 truncate">{kpi.label}</p>
                            <p className="font-headline text-2xl sm:text-3xl mb-1 text-[#1a1c1c]">{kpi.val}</p>
                            <p className={`font-label text-[10px] uppercase font-bold tracking-tighter flex items-center gap-1 truncate ${kpi.trendClass}`}>
                                {kpi.trendIcon} {kpi.trend}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Orders Management Table */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 xl:px-0 mt-8 sm:mt-12">
                <div className="bg-[#eeeeee] p-px sm:p-0.5">
                    <div className="bg-white p-4 sm:p-8">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 gap-4">
                            <h2 className="font-headline text-xl sm:text-2xl italic">Recent Orders</h2>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
                                <div className="relative flex-grow">
                                    <IoMdSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-[#777777]" />
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-8 pr-4 py-2 border-0 border-b border-[#eeeeee] bg-transparent focus:ring-0 focus:border-black font-label text-xs w-full sm:w-64 placeholder:text-[#c6c6c6] outline-none"
                                        placeholder="Search by ID, Name, or City..."
                                        type="text"
                                    />
                                </div>
                                <div className="relative" ref={filterRef}>
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className={`flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto border-b sm:border-0 border-[#eeeeee] pb-2 sm:pb-0 font-label text-[10px] uppercase tracking-widest transition-colors ${filterStatus !== 'All' ? 'text-black font-bold' : 'text-[#777777]'}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <IoMdFunnel /> {filterStatus === 'All' ? 'Filter By Status' : filterStatus}
                                        </span>
                                    </button>

                                    {isFilterOpen && (
                                        <div className="absolute right-0 sm:right-auto mt-2 w-full sm:w-40 bg-white border border-[#eeeeee] shadow-xl z-10">
                                            {["All", "Delivered", "Shipped", "Processing", "Pending", "Cancelled"].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => { setFilterStatus(status); setIsFilterOpen(false); }}
                                                    className="w-full text-left px-4 py-3 text-[10px] font-label uppercase tracking-widest hover:bg-[#f7f7f5] flex justify-between items-center"
                                                >
                                                    {status}
                                                    {filterStatus === status && <IoMdCheckmark />}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced responsive scroll area */}
                        <div className="w-full overflow-x-auto pb-4">
                            <table className="w-full text-left border-collapse min-w-[750px]">
                                <thead>
                                    <tr className="border-b border-[#eeeeee]">
                                        <th className="py-4 sm:py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold">Order ID</th>
                                        <th className="py-4 sm:py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold">Customer</th>
                                        <th className="py-4 sm:py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold">City</th>
                                        <th className="py-4 sm:py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold">Date</th>
                                        <th className="py-4 sm:py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold text-right">Total</th>
                                        <th className="py-4 sm:py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold text-center">Status</th>
                                        <th className="py-4 sm:py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold text-right pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className="py-16 sm:py-24 text-center font-label text-[10px] uppercase tracking-widest text-[#777777]">Loading Orders...</td>
                                        </tr>
                                    ) : paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
                                        <tr key={order._id} className="border-b border-[#f9f9f9] hover:bg-[#fcfcfc] transition-colors group">
                                            <td className="py-4 sm:py-6 font-bold text-black text-xs" title={order._id}>
                                                ...{order._id.substring(order._id.length - 8)}
                                            </td>
                                            <td className="py-4 sm:py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#f3f3f3] flex-shrink-0 flex items-center justify-center rounded-full">
                                                        <span className="text-[9px] sm:text-[10px] font-bold text-[#1a1c1c]">
                                                            {getInitials(order.shippingAddress?.fullName)}
                                                        </span>
                                                    </div>
                                                    <span className="font-label text-xs font-medium truncate max-w-[120px] sm:max-w-full">
                                                        {order.shippingAddress?.fullName || "Unknown"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 sm:py-6 text-[#777777] text-xs font-label capitalize">
                                                {order.shippingAddress?.city || "N/A"}
                                            </td>
                                            <td className="py-4 sm:py-6 text-[#777777] text-xs font-label whitespace-nowrap">
                                                {formatDate(order.createdAt)}
                                            </td>
                                            <td className="py-4 sm:py-6 font-bold text-right text-xs whitespace-nowrap">
                                                {formatPKR(order.totalAmount)}
                                            </td>
                                            <td className="py-4 sm:py-6">
                                                <div className="flex justify-center">
                                                    <span className={`px-2 sm:px-3 py-1 rounded text-[8px] sm:text-[9px] uppercase tracking-widest font-bold ${getStatusColor(order.orderStatus)}`}>
                                                        {order.orderStatus}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 sm:py-6 text-right pr-2">
                                                <button className="text-[#c6c6c6] hover:text-black transition-colors">
                                                    <MdMoreHoriz size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="7" className="py-16 sm:py-24 text-center font-label text-[10px] uppercase tracking-widest text-[#777777]">No matching orders found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6 sm:mt-12 pt-6 sm:pt-8 border-t border-[#eeeeee]">
                            <p className="font-label text-[10px] uppercase tracking-widest text-[#777777] text-center sm:text-left">
                                Showing {paginatedOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
                            </p>
                            <div className="flex gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 justify-center">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="size-8 md:size-10 flex-shrink-0 flex items-center justify-center border border-[#eeeeee] text-[#777777] hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <IoMdArrowBack />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`size-8 md:size-10 flex-shrink-0 flex items-center justify-center border font-bold text-xs transition-all ${currentPage === i + 1 ? 'border-black bg-black text-white' : 'border-[#eeeeee] text-[#777777] hover:border-black hover:text-black'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="size-8 md:size-10 flex-shrink-0 flex items-center justify-center border border-[#eeeeee] text-[#777777] hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <IoMdArrowForward />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Insights Section */}
            <section className="max-w-7xl mx-auto mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 xl:px-0">
                <div className="bg-white p-8 sm:p-12 flex flex-col justify-center border border-[#eeeeee]">
                    <h3 className="font-headline text-2xl sm:text-3xl mb-4 italic">Regional Distribution</h3>
                    <p className="font-label text-xs sm:text-sm text-[#777777] mb-8 uppercase tracking-tight leading-relaxed">
                        Punjab and Sindh markets currently represent {54 + 28}% of total transaction volume this quarter.
                    </p>
                    <div className="space-y-6">
                        {[
                            { label: "Punjab", pc: "54%" },
                            { label: "Sindh", pc: "28%" },
                            { label: "KPK & Others", pc: "18%" }
                        ].map((region, i) => (
                            <div key={i}>
                                <div className="flex justify-between font-label text-[10px] uppercase tracking-widest mb-2">
                                    <span className="font-bold text-[#1a1c1c]">{region.label}</span>
                                    <span>{region.pc}</span>
                                </div>
                                <div className="h-0.5 bg-[#eeeeee] w-full overflow-hidden">
                                    <div className="h-full bg-black transition-all duration-1000 ease-out" style={{ width: region.pc }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative overflow-hidden group min-h-[300px] sm:min-h-[400px] border border-[#eeeeee]">
                    <img
                        alt="Logistics"
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12 right-8 sm:right-12 text-white">
                        <h3 className="font-headline text-3xl sm:text-4xl mb-2">Logistics Alert</h3>
                        <p className="font-label text-[10px] sm:text-xs uppercase tracking-tight opacity-90 mb-4 sm:mb-6 leading-relaxed">
                            Holiday season fulfillment windows are approaching. Optimize processing workflows for peak capacity.
                        </p>
                        <a className="inline-block border-b border-white pb-1 font-label text-[10px] uppercase tracking-widest hover:opacity-70 transition-opacity" href="#">
                            Review Shipping Policy
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminSales;