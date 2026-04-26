import React, { useState } from "react";
import Wishlist from "./Wishlist";

const Profile = () => {
    // Active tab
    const [activeTab, setActiveTab] = useState("orders");

    // Active filter
    const [filter, setFilter] = useState("all");

    // Dummy Orders Data
    const [orders] = useState([
        {
            id: "VO-88291",
            title: "Structured Wool Blazer",
            status: "delivered",
            date: "Oct 24, 2023",
            price: 420,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5tru4Q1wE056y_ohZILxL-4FOoFkI9PoaXz3TJnWMnbo8j9oCIna4BhGBpLZHHqY9yTc1QjWhuFZlmvonlbA0DCbOCoc4H0Kkd2lhPRtJ3YFjHYHOUIgHSEA0YV7BriYia73EpJ_MEGw9orf8-DVMkL4Juf-lCGG1DRxe16tsKzK93wgk1t7jmmIIyvX0_CPqUQXEh6uSi1sDyO-r4Z7LeljxrhN4kQmPIqdDilO9jcgML0MuYFHh4GDHIDEOGxiSTyJthdXBRdM"
        },
        {
            id: "VO-88104",
            title: "Wide-Leg Silk Trouser",
            status: "pending",
            date: "Oct 12, 2023",
            price: 295,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBldeq8oQbCguc8UXHfgAHxyWTXuh4bTg-9iDp-yPn3o7U69LSGshJjWEiNXtAj9gKBACNtmg_ZPuoy0DG08pi_GfdfGwYuYRMhM4AHSrwGh1NypOE1305ItouwLgPevMGMfpTB69DChPYNjVWUZ8cnoSFe1XeDTjepE16aVBx9QmQ7600ZVq9X9mi8zgysh7GWjG-VHZgFzNuta2hkNGgLsQuGsqgKnx4cBOwKbICSPY6eYA7hSL3UnygaixHwm8B_WuaFxCnrwlc"
        }
    ]);

    // Filtered Orders
    const filteredOrders =
        filter === "all"
            ? orders
            : orders.filter((order) => order.status === filter);

    // Add to Cart (frontend only)
    const handleAddToCart = (item) => {
        console.log("Added to cart:", item);
        alert(`${item.title} added to cart`);
    };

    return (
        <main className=" p-4 md:p-8  mx-auto min-h-screen">
            {/* Header Section */}
            <section className="mb-10 md:mb-12">
                <h1 className="font-headline italic text-3xl sm:text-4xl md:text-6xl text-black mb-3 md:mb-5">
                    My Account
                </h1>
                <p className="font-label text-[10px] uppercase tracking-widest text-[#777777]">
                    Member since November 2023
                </p>
            </section>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Sidebar / Mobile Nav */}
                <aside className="lg:w-64 border-b lg:border-b-0 border-gray-100 pb-6 lg:pb-0">
                    <nav className="flex lg:flex-col gap-6 overflow-x-auto no-scrollbar whitespace-nowrap lg:whitespace-normal lg:w-70">
                        {["orders", "wishlist", "addresses", "preferences"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`font-label text-[10px] uppercase tracking-widest text-left transition-colors ${activeTab === tab
                                    ? "text-black font-bold"
                                    : "text-[#777777] hover:text-black"
                                    }`}
                            >
                                {tab === "orders"
                                    ? "My Orders"
                                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content Area */}
                <div className="flex-grow">
                    {/* ORDERS TAB */}
                    {activeTab === "orders" && (
                        <div className="animate-fadeIn">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-10">
                                <h2 className="font-headline text-2xl md:text-3xl">My Orders</h2>

                                <div className="flex flex-wrap gap-2 md:gap-4">
                                    {["all", "pending", "delivered"].map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-4 md:px-6 py-2 text-[9px] md:text-[10px] uppercase transition-all ${filter === f
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="bg-white p-4 md:p-6 border border-gray-200 flex flex-col sm:flex-row gap-4 md:gap-6"
                                        >
                                            <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 bg-gray-50">
                                                <img
                                                    src={order.image}
                                                    className="w-full h-full object-cover"
                                                    alt={order.title}
                                                />
                                            </div>

                                            <div className="flex flex-col justify-between flex-grow">
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <p className="text-[10px] uppercase tracking-tighter text-gray-400">
                                                            Order #{order.id}
                                                        </p>
                                                        <span className={`text-[9px] uppercase px-2 py-0.5 border ${order.status === 'delivered' ? 'border-green-200 text-green-600' : 'border-orange-200 text-orange-600'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg md:text-xl font-medium mb-1">{order.title}</h3>
                                                    <p className="text-sm text-gray-500">{order.date}</p>
                                                </div>
                                                <p className="font-bold text-lg mt-2 sm:mt-0">${order.price}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center border border-dashed">
                                        <p className="text-gray-400 font-label text-xs uppercase tracking-widest">No orders found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* WISHLIST TAB */}
                    {activeTab === "wishlist" && (
                        <div className="animate-fadeIn">
                            <Wishlist handleAddToCart={handleAddToCart} />
                        </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {["addresses", "preferences"].includes(activeTab) && (
                        <div className="py-20 text-center border border-gray-100">
                            <p className="text-gray-400 font-label text-xs uppercase tracking-widest">
                                {activeTab} settings coming soon
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Profile;