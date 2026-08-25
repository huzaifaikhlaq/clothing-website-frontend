import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllAdminOrdersThunk } from "../../features/oders/orderTrunk";

import {
    MdOutlinePayments,
    MdMoreHoriz,
    MdOutlineLocalShipping,
    MdOutlineShoppingCart,
} from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";

const AdminDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllAdminOrdersThunk());
    }, [dispatch]);

    const { adminOrders = [], loading } = useSelector((state) => state.order);

    const safeOrders = Array.isArray(adminOrders) ? adminOrders : [];

    const totalRevenue = safeOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const activeOrdersCount = safeOrders.length;
    const avgOrderValue = activeOrdersCount > 0 ? (totalRevenue / activeOrdersCount).toFixed(0) : 0;

    const topProducts = useMemo(() => {
        const productMap = {};
        safeOrders.forEach((order) => {
            const orderItems = order.orderItems || order.items || order.products || [];

            if (Array.isArray(orderItems)) {
                orderItems.forEach((item) => {
                    const productId = item.product?._id || item.productId || item.product || item._id;
                    if (!productId) return;

                    if (!productMap[productId]) {
                        productMap[productId] = {
                            id: productId,
                            name: item.product?.title || item.title || item.name || "Unknown Product",
                            price: item.price || item.product?.price || 0,
                            img: item.product?.images?.[0] || item.image || "",
                            quantitySold: 0,
                        };
                    }
                    productMap[productId].quantitySold += item.quantity || 1;
                });
            }
        });

        return Object.values(productMap).sort((a, b) => b.quantitySold - a.quantitySold);
    }, [safeOrders]);

    const salesChartData = useMemo(() => {
        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            return {
                dateString: d.toISOString().split("T")[0],
                displayDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                revenue: 0,
            };
        });

        safeOrders.forEach((order) => {
            if (order.createdAt) {
                const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
                const dayMatch = last30Days.find((d) => d.dateString === orderDate);
                if (dayMatch) {
                    dayMatch.revenue += order.totalAmount || 0;
                }
            }
        });

        const maxRevenue = Math.max(...last30Days.map((d) => d.revenue));

        return last30Days.map((day) => ({
            ...day,
            heightPercent: maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0,
        }));
    }, [safeOrders]);

    return (
        <div className="  flex min-h-screen bg-[#F7F7F5] font-sans selection:bg-black selection:text-white">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
            @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz@1,6..96&family=Inter:wght@300;400;700&display=swap');
            .font-headline { font-family: 'Bodoni Moda', serif; }
            .font-label { font-family: 'Inter', sans-serif; letter-spacing: 0.05em; }
          `,
                }}
            />

            <main className="flex-1 md:ml-72 flex flex-col min-w-0">
                <div className="px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-12 w-full pt-6 sm:pt-10 pb-12 sm:pb-20">

                    {/* Header Section */}
                    <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                        <div className="space-y-1 sm:space-y-2 w-full">
                            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1a1c1c] tracking-tight leading-tight">
                                Performance Summary
                            </h2>
                            <p className="text-[#777777] font-label text-xs sm:text-sm tracking-wide">
                                Last updated:{" "}
                                {new Date().toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                        <button className="w-full sm:w-auto text-center py-2.5 sm:py-3 px-6 sm:px-8 bg-black text-[#e5e2e1] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-label font-bold transition-all hover:bg-[#333] active:scale-95">
                            Export Data
                        </button>
                    </section>

                    {/* Stat Cards Grid */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#eeeeee] border border-[#eeeeee]">
                        {[
                            {
                                label: "Total Revenue",
                                val: `Rs. ${totalRevenue.toLocaleString()}`,
                                trend: "All time",
                                icon: <MdOutlinePayments size={22} />,
                                color: "text-green-600",
                            },
                            {
                                label: "Active Orders",
                                val: activeOrdersCount.toString(),
                                trend: "Steady flow",
                                icon: <MdOutlineLocalShipping size={22} />,
                                color: "text-[#777777]",
                            },
                            {
                                label: "Avg. Order Value",
                                val: `Rs. ${Number(avgOrderValue).toLocaleString()}`,
                                trend: "Overall avg",
                                icon: <MdOutlineShoppingCart size={22} />,
                                color: "text-green-600",
                            },
                            {
                                label: "Conversion Rate",
                                val: "3.8%",
                                trend: "-0.4% vs LW",
                                icon: <IoMdTrendingUp size={22} />,
                                color: "text-red-600",
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white p-5 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 hover:bg-[#efecec] transition-colors cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <span className="text-[9px] sm:text-[10px] font-label uppercase tracking-widest text-[#777777]">
                                        {stat.label}
                                    </span>
                                    <span className="text-[#c6c6c6]">{stat.icon}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1c1c] tracking-tight">
                                        {stat.val}
                                    </p>
                                    <p className={`text-[9px] sm:text-[10px] font-label font-bold uppercase tracking-tighter ${stat.color}`}>
                                        {stat.trend}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Main Data Visuals */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Sales Chart */}
                        <div className="lg:col-span-2 bg-white p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-8 border border-[#eeeeee]">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="text-xs font-label uppercase tracking-widest font-bold text-[#1a1c1c]">
                                    Sales Growth (30D)
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-black block"></span>
                                    <span className="text-[10px] font-label uppercase text-[#777777]">
                                        Gross Sales (Rs)
                                    </span>
                                </div>
                            </div>

                            <div className="h-64 sm:h-80 w-full relative flex items-end justify-between border-b border-[#eeeeee] pt-4">
                                {salesChartData.map((day, i) => (
                                    <div
                                        key={i}
                                        style={{ height: `${Math.max(day.heightPercent, 2)}%` }}
                                        className="flex-1 bg-[#f3f3f3] mx-[1px] sm:mx-[2px] border-t-2 border-black transition-all hover:bg-black group relative cursor-pointer"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 text-center rounded pointer-events-none">
                                            <span className="block font-bold">Rs. {day.revenue.toLocaleString()}</span>
                                            <span className="block text-[#a0a0a0]">{day.displayDate}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Acquisitions */}
                        <div className="bg-white p-5 sm:p-6 md:p-8 space-y-6 border border-[#eeeeee] flex flex-col justify-between">
                            <h3 className="text-xs font-label uppercase tracking-widest font-bold text-[#1a1c1c]">
                                Top Acquisitions by quantity
                            </h3>

                            <div className="space-y-6 flex flex-col max-h-[340px] overflow-y-auto pr-1">
                                {topProducts.length > 0 ? (
                                    topProducts.map((product) => (
                                        <Link
                                            to={`/product/${product.id}`}
                                            key={product.id}
                                            className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer"
                                        >
                                            <div className="w-12 sm:w-16 h-16 sm:h-20 bg-[#f3f3f3] overflow-hidden shrink-0">
                                                {product.img ? (
                                                    <img
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                        src={product.img}
                                                        alt={product.name}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[9px] text-[#aaa]">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] sm:text-[11px] font-label uppercase tracking-widest text-[#1a1c1c] font-bold truncate">
                                                    {product.name}
                                                </p>
                                                <p className="text-[9px] sm:text-[10px] text-[#777777]">
                                                    {product.quantitySold} Sold
                                                </p>
                                            </div>
                                            <p className="text-xs font-bold text-[#1a1c1c] whitespace-nowrap">
                                                Rs. {product.price.toLocaleString()}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="h-full flex items-center justify-center text-xs text-[#777777] py-10">
                                        No product data available yet.
                                    </div>
                                )}
                            </div>

                            <button className="w-full py-3.5 border border-[#eeeeee] text-[10px] uppercase tracking-[0.2em] font-label hover:bg-black hover:text-white transition-all text-[#1a1c1c] mt-4">
                                View All Products
                            </button>
                        </div>
                    </section>

                    {/* Recent Orders Table */}
                    <section className="bg-white p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-8 border border-[#eeeeee]">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-xs font-label uppercase tracking-widest font-bold text-[#1a1c1c]">
                                Recent Acquisitions
                            </h3>
                            <div className="flex space-x-4 text-[10px] font-label uppercase tracking-widest text-[#c6c6c6]">
                                <span className="text-black border-b border-black cursor-pointer pb-1">
                                    All Orders
                                </span>
                                <span className="hover:text-black cursor-pointer transition-colors pb-1">
                                    Shipped
                                </span>
                            </div>
                        </div>

                        <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
                            <table className="w-full text-left min-w-[550px] sm:min-w-[600px]">
                                <thead>
                                    <tr className="text-[9px] sm:text-[10px] font-label uppercase tracking-widest text-[#777777] border-b border-[#eeeeee]">
                                        <th className="pb-3 sm:pb-4 font-normal">Order ID</th>
                                        <th className="pb-3 sm:pb-4 font-normal">Client</th>
                                        <th className="pb-3 sm:pb-4 font-normal">Date</th>
                                        <th className="pb-3 sm:pb-4 font-normal">Status</th>
                                        <th className="pb-3 sm:pb-4 font-normal">Amount</th>
                                        <th className="pb-3 sm:pb-4 font-normal text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f9f9f9]">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="py-8 text-center text-xs sm:text-sm text-[#777777]">
                                                Loading orders...
                                            </td>
                                        </tr>
                                    ) : safeOrders.length > 0 ? (
                                        safeOrders.map((order) => {
                                            const clientName =
                                                order.shippingAddress?.fullName ||
                                                order.user?.name ||
                                                "Guest User";

                                            return (
                                                <tr
                                                    key={order._id}
                                                    className="group hover:bg-[#f9f9f9] transition-colors"
                                                >
                                                    <td className="py-4 sm:py-6 text-[11px] sm:text-xs font-bold text-[#1a1c1c]">
                                                        #{order._id?.slice(-6).toUpperCase()}
                                                    </td>
                                                    <td className="py-4 sm:py-6">
                                                        <div className="flex items-center space-x-2.5 sm:space-x-3">
                                                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#eeeeee] rounded-full overflow-hidden shrink-0">
                                                                <img
                                                                    className="w-full h-full object-cover grayscale"
                                                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                                                        clientName
                                                                    )}`}
                                                                    alt={clientName}
                                                                />
                                                            </div>
                                                            <span className="text-[11px] sm:text-xs font-label text-[#1a1c1c] truncate max-w-[110px] sm:max-w-[150px]">
                                                                {clientName}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 sm:py-6 text-[11px] sm:text-xs text-[#777777]">
                                                        {order.createdAt
                                                            ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            })
                                                            : "N/A"}
                                                    </td>
                                                    <td className="py-4 sm:py-6">
                                                        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 sm:py-1 bg-[#f3f3f3] text-[#1a1c1c]">
                                                            {order.orderStatus || "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 sm:py-6 text-[11px] sm:text-xs font-bold text-[#1a1c1c]">
                                                        Rs. {(order.totalAmount || 0).toLocaleString()}
                                                    </td>
                                                    <td className="py-4 sm:py-6 text-right">
                                                        <button className="text-[#c6c6c6] hover:text-black transition-colors inline-flex justify-end">
                                                            <MdMoreHoriz size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-8 text-center text-xs sm:text-sm text-[#777777]">
                                                No recent orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;