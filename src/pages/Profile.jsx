import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
    const userData = (() => {
        try {
            const storedUser = sessionStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Failed to parse user from sessionStorage", e);
            return null;
        }
    })();

    const { logout } = useAuthContext();

    const state = useSelector((state) => state);
    console.log(state);

    const { orders, loading, error } = useSelector((state) => state.order);


    // Local UI State
    const [activeTab, setActiveTab] = useState("orders");
    const [filter, setFilter] = useState("all");

    const filteredOrders = filter === "all" ? (orders || []) : (orders || []).filter((order) => order.status?.toLowerCase() === filter.toLowerCase());

    const handleAddToCart = (item) => {
        console.log("Added to cart:", item);
        alert(`${item.title} added to cart`);
    };

    return (
        <main className="p-4 md:p-8 mx-auto min-h-screen">
            {/* Header Section */}
            <section className="mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="font-headline italic text-3xl sm:text-4xl md:text-6xl text-black capitalize">
                        {userData?.name || "My Account"}
                    </h1>
                    {userData?.email && (
                        <p className="text-sm text-gray-500 mt-1">{userData.email}</p>
                    )}
                </div>

                {/* Logout Button */}
                <Link to="/"
                    onClick={logout}
                    className="self-start sm:self-auto px-6 py-2.5 bg-black text-white text-xs font-medium uppercase tracking-wider hover:bg-red-600 transition-colors duration-200 focus:outline-none"
                >
                    Log Out
                </Link>
            </section>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

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

                            {/* Render Loading, Error, or Orders using Redux State */}
                            <div className="space-y-4 md:space-y-6">
                                {loading ? (
                                    <div className="py-20 text-center border border-dashed">
                                        <p className="text-gray-400 font-label text-xs uppercase tracking-widest animate-pulse">
                                            Loading your orders...
                                        </p>
                                    </div>
                                ) : error ? (
                                    <div className="py-20 text-center border border-red-200 bg-red-50">
                                        <p className="text-red-500 font-label text-xs uppercase tracking-widest">
                                            {error}
                                        </p>
                                    </div>
                                ) : filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => {
                                        const itemsArray = order.orderItems || order.items || order.products || [];

                                        return (
                                            <div
                                                key={order._id || order.id}
                                                className="bg-white p-4 md:p-6 border border-gray-200 flex flex-col gap-4"
                                            >
                                                {/* Order Header (ID, Date, Status) */}
                                                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 pb-4 gap-2">
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-tighter text-gray-400">
                                                            Order #{order._id || order.id}
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Placed on: {new Date(order.createdAt || order.date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <span className={`self-start sm:self-auto text-[9px] uppercase px-2 py-0.5 border ${order.status?.toLowerCase() === 'delivered'
                                                        ? 'border-green-200 text-green-600'
                                                        : 'border-orange-200 text-orange-600'
                                                        }`}>
                                                        {order.status || "Processing"}
                                                    </span>
                                                </div>

                                                {/* All Order Items List */}
                                                <div className="flex flex-col gap-4 py-2">
                                                    {itemsArray.map((item, index) => (
                                                        <div key={item._id || index} className="flex flex-col sm:flex-row gap-4 items-center">
                                                            <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 bg-gray-50">
                                                                <img
                                                                    src={item?.product?.images?.[0]}
                                                                    className="w-full h-full object-cover"
                                                                    alt={item?.product?.title || "Product Image"}
                                                                />
                                                            </div>
                                                            <div className="flex-grow w-full text-center sm:text-left">
                                                                <h3 className="text-md md:text-lg font-medium">
                                                                    {item?.product?.title}
                                                                </h3>
                                                                {item?.quantity && (
                                                                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                                                )}
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    Price: <span className="text-xs">PKR</span> {item?.product?.price || item.price}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Order Footer (Total Price) */}
                                                <div className="flex justify-end items-center border-t border-gray-100 pt-4 mt-2">
                                                    <p className="font-bold text-lg md:text-xl">
                                                        Total: <span className="text-sm">PKR</span> {order.totalPrice || order.totalAmount || order.price}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
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