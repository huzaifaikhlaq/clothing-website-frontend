import React, { useState, useMemo, useEffect, useRef } from "react";
// Correct Icon Imports
import { IoMdSearch, IoMdTrendingUp, IoMdArrowBack, IoMdArrowForward, IoMdFunnel, IoMdCheckmark } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";

const AdminSales = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const filterRef = useRef(null);

    const orders = [
        { id: "#ORD-92841", client: "Elena Moretti", initials: "EM", date: "Oct 24, 2023", amount: "$1,240.00", status: "Shipped", statusColor: "bg-green-50 text-green-700" },
        { id: "#ORD-92842", client: "Julian Webb", initials: "JW", date: "Oct 24, 2023", amount: "$840.50", status: "Processing", statusColor: "bg-yellow-50 text-yellow-700" },
        { id: "#ORD-92843", client: "Aiko Kimura", initials: "AK", date: "Oct 23, 2023", amount: "$2,100.00", status: "Pending", statusColor: "bg-zinc-100 text-zinc-500" },
        { id: "#ORD-92844", client: "Sebastian Thorne", initials: "ST", date: "Oct 23, 2023", amount: "$455.00", status: "Shipped", statusColor: "bg-green-50 text-green-700" },
        { id: "#ORD-92845", client: "Clara Laurent", initials: "CL", date: "Oct 22, 2023", amount: "$1,890.00", status: "Processing", statusColor: "bg-yellow-50 text-yellow-700" },
        { id: "#ORD-92846", client: "Marcus Aurelius", initials: "MA", date: "Oct 21, 2023", amount: "$3,200.00", status: "Shipped", statusColor: "bg-green-50 text-green-700" },
        { id: "#ORD-92847", client: "Sienna Miller", initials: "SM", date: "Oct 21, 2023", amount: "$150.00", status: "Pending", statusColor: "bg-zinc-100 text-zinc-500" },
    ];

    // Filter and Search Logic
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterStatus === "All" || order.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, filterStatus]);

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
        const csv = filteredOrders.map(o => `${o.id},${o.client},${o.amount},${o.status}`).join('\n');
        console.log("Exporting Report...\n", csv);
        alert("Report generated for " + filteredOrders.length + " orders.");
    };

    return (
        <main className="md:ml-72 bg-[#F7F7F5] min-h-screen">
            {/* Header & KPI Section */}
            <section className="p-6 md:p-12 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="font-headline text-5xl md:text-6xl tracking-tight mb-2 text-[#1a1c1c]">Sales & Orders</h1>
                        <p className="font-label text-[#777777] text-sm max-w-md uppercase tracking-tight">
                            Comprehensive overview of global sales performance and fulfillment cycles for the current quarter.
                        </p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="bg-black text-white px-10 py-4 font-label uppercase tracking-widest text-[10px] hover:bg-[#333] transition-all active:scale-95"
                    >
                        Export Report
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-[#eeeeee] border border-[#eeeeee]">
                    {[
                        { label: "Total Revenue", val: "$482,900.00", trend: "+12.5% from last month", trendIcon: <IoMdTrendingUp />, trendClass: "text-green-600" },
                        { label: "Current View", val: filteredOrders.length, trend: "Filtered active orders", trendClass: "text-[#777777]" },
                        { label: "Average Order Value", val: "$376.10", trend: "Premium segment target met", trendClass: "text-[#777777]" },
                        { label: "Fulfillment Rate", val: "98.2%", trend: "Optimal performance", trendClass: "text-green-600" }
                    ].map((kpi, i) => (
                        <div key={i} className="bg-white p-8">
                            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] mb-4">{kpi.label}</p>
                            <p className="font-headline text-3xl mb-1 text-[#1a1c1c]">{kpi.val}</p>
                            <p className={`font-label text-[10px] uppercase font-bold tracking-tighter flex items-center gap-1 ${kpi.trendClass}`}>
                                {kpi.trendIcon} {kpi.trend}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Orders Management Table */}
            <section className="max-w-7xl mx-auto px-6 md:px-0">
                <div className="bg-[#eeeeee] p-0.5">
                    <div className="bg-white p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <h2 className="font-headline text-2xl italic">Recent Orders</h2>
                            <div className="flex items-center gap-6 w-full sm:w-auto">
                                <div className="relative flex-grow sm:flex-grow-0">
                                    <IoMdSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-[#777777]" />
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-8 pr-4 py-2 border-0 border-b border-[#eeeeee] bg-transparent focus:ring-0 focus:border-black font-label text-xs w-full sm:w-64 placeholder:text-[#c6c6c6] outline-none"
                                        placeholder="Search orders..."
                                        type="text"
                                    />
                                </div>
                                <div className="relative" ref={filterRef}>
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className={`flex items-center gap-2 font-label text-[10px] uppercase tracking-widest transition-colors ${filterStatus !== 'All' ? 'text-black font-bold' : 'text-[#777777]'}`}
                                    >
                                        <IoMdFunnel /> {filterStatus === 'All' ? 'Filter' : filterStatus}
                                    </button>

                                    {isFilterOpen && (
                                        <div className="absolute right-0 mt-4 w-40 bg-white border border-[#eeeeee] shadow-xl z-10">
                                            {["All", "Shipped", "Processing", "Pending"].map((status) => (
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

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="border-b border-[#eeeeee]">
                                        <th className="py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold">Order ID</th>
                                        <th className="py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold">Customer</th>
                                        <th className="py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold">Date</th>
                                        <th className="py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold text-right">Total</th>
                                        <th className="py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold text-center">Status</th>
                                        <th className="py-6 font-label text-[10px] uppercase tracking-[0.2em] text-[#777777] font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-[#f9f9f9] hover:bg-[#fcfcfc] transition-colors group">
                                            <td className="py-6 font-bold text-black text-xs">{order.id}</td>
                                            <td className="py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-[#f3f3f3] flex items-center justify-center rounded-full">
                                                        <span className="text-[10px] font-bold text-[#1a1c1c]">{order.initials}</span>
                                                    </div>
                                                    <span className="font-label text-xs font-medium">{order.client}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 text-[#777777] text-xs font-label">{order.date}</td>
                                            <td className="py-6 font-bold text-right text-xs">{order.amount}</td>
                                            <td className="py-6">
                                                <div className="flex justify-center">
                                                    <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${order.statusColor}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-6 text-right">
                                                <button className="text-[#c6c6c6] hover:text-black transition-colors">
                                                    <MdMoreHoriz size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="py-24 text-center font-label text-[10px] uppercase tracking-widest text-[#777777]">No matching orders found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex max-md:flex-col max-md:gap-4 justify-between items-center mt-12 pt-8 border-t border-[#eeeeee]">
                            <p className="font-label text-[10px] uppercase tracking-widest text-[#777777]">
                                Showing {paginatedOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
                            </p>
                            <div className="flex gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="size-8 md:size-10 flex items-center justify-center border border-[#eeeeee] text-[#777777] hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <IoMdArrowBack />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`size-8 md:size-10 flex items-center justify-center border font-bold text-xs transition-all ${currentPage === i + 1 ? 'border-black bg-black text-white' : 'border-[#eeeeee] text-[#777777] hover:border-black hover:text-black'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="size-8 md:size-10 flex items-center justify-center border border-[#eeeeee] text-[#777777] hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <IoMdArrowForward />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Insights Section */}
            <section className="max-w-7xl mx-auto mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 pb-24 px-6 md:px-0">
                <div className="bg-white p-12 flex flex-col justify-center border border-[#eeeeee]">
                    <h3 className="font-headline text-3xl mb-4 italic">Regional Distribution</h3>
                    <p className="font-label text-sm text-[#777777] mb-8 uppercase tracking-tight leading-relaxed">
                        North American and European markets currently represent {42 + 32}% of total transaction volume this quarter.
                    </p>
                    <div className="space-y-6">
                        {[
                            { label: "North America", pc: "42%" },
                            { label: "Europe", pc: "32%" },
                            { label: "Asia Pacific", pc: "18%" }
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

                <div className="relative overflow-hidden group min-h-[400px] border border-[#eeeeee]">
                    <img
                        alt="Logistics"
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                        <h3 className="font-headline text-4xl mb-2">Logistics Alert</h3>
                        <p className="font-label text-xs uppercase tracking-tight opacity-90 mb-6 leading-relaxed">
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