import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineLock } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RxLoop } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa6";

import { fetchCart, removeItem, updateCartItem } from "../features/cart/cartTrunks.js";

const Cart = () => {
    const dispatch = useDispatch();

    const { items: cartItems, loading, mutationLoading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    // UPDATE: Access price through item.product
    const subtotal = cartItems.reduce((total, item) => {
        const rawPrice = item.product?.price || 0;
        const itemPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace(/[^0-9.-]+/g, "")) : rawPrice;
        const itemQty = item.quantity || 1;
        return total + (itemPrice * itemQty);
    }, 0);

    const handleRemoveItem = (productId, size, color) => {
        dispatch(
            removeItem({
                productId,
                size,
                color,
            })
        );
    };

    const handleUpdateQuantity = (productId, newQuantity, size, color) => {
        if (newQuantity <= 0) return;

        dispatch(
            updateCartItem({
                product: productId,
                quantity: newQuantity,
                size,
                color,
            })
        );
    };

    if (loading === true && cartItems.length === 0) return <div className="text-center pt-24">Loading your cart...</div>;
    if (error) return <div className="text-center pt-24 text-red-500">Error: {error}</div>;

    return (
        <main className="pt-24 pb-37 px-6 max-w-2xl mx-auto">
            {/* Header */}
            <section className="mb-12">
                <h1 className="font-headline italic text-4xl mb-2 text-[#1a1c1c]">Your Cart</h1>
                <p className="font-label uppercase text-[10px] tracking-[0.2em] text-[#777777]">
                    {cartItems.length} items
                </p>
            </section>

            {/* Cart Items */}
            <div className="space-y-10">
                {cartItems.length === 0 ? (
                    <p className="text-center text-[#777777]">Your cart is currently empty.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={item._id}>
                            <div className="flex gap-6 group">
                                <div className="w-24 aspect-[3/4] bg-[#eeeeee] overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
                                        src={item.product?.images?.[0]}
                                        alt={item.product?.title || "Product"}
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <Link to={`/product/${item.product?._id}`} className="hover:underline  font-label font-bold uppercase text-[12px] tracking-wider text-[#1a1c1c]">
                                                {item.product?.title}
                                            </Link>
                                            <button
                                                onClick={() => handleRemoveItem(item.product._id, item.size, item.color)}
                                                className="text-[#c6c6c6] hover:text-[#1a1c1c] transition-colors"
                                            >
                                                <span className="cursor-pointer text-lg"><IoClose /></span>
                                            </button>
                                        </div>
                                        <p className="font-body text-xs text-[#777777] mt-1">
                                            Color: {item.color} | Size: {item.size}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-6 border-b border-[#c6c6c6] pb-1">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1, item.size, item.color)}
                                                className="material-symbols-outlined text-sm cursor-pointer hover:text-black"
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="font-label text-xs">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1, item.size, item.color)}
                                                className="material-symbols-outlined text-sm cursor-pointer hover:text-black"
                                            >
                                                <HiPlus />
                                            </button>
                                        </div>
                                        <p className="font-label font-bold text-sm text-[#1a1c1c]">
                                            PKR {typeof item.product?.price === 'number' ? item.product.price.toFixed(2) : item.product?.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {index !== cartItems.length - 1 && (
                                <div className="bg-[#c6c6c6] h-[1px] opacity-30 mt-10"></div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Order Summary Panel */}
            {cartItems.length > 0 && (
                <section className="mt-20 pt-10 border-t border-[#c6c6c6]">
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Subtotal</span>
                            <span className="font-label text-sm text-[#1a1c1c]">PKR {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Shipping</span>
                            <span className="font-label text-sm text-[#1a1c1c]">Calculated at checkout</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="font-label text-xs uppercase tracking-[0.3em] font-bold text-[#1a1c1c]">Total</span>
                            <span className="font-label text-xl font-bold tracking-tight text-[#1a1c1c]">PKR {subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="w-full bg-black text-[#e5e2e1] py-5 font-label uppercase text-[12px] tracking-[0.25em] font-bold mb-4 active:opacity-70 transition-opacity">
                        Proceed to Checkout
                    </button>

                    <div className="flex justify-center gap-12 pt-12">
                        {[
                            { icon: <MdOutlineLock size={26} />, label: "Secure Checkout" },
                            { icon: <LiaShippingFastSolid size={26} />, label: "Insured Delivery" },
                            { icon: <RxLoop size={26} />, label: "Easy Returns" }
                        ].map((trust) => (
                            <div key={trust.label} className="flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-[#c6c6c6] text-xl">{trust.icon}</span>
                                <span className="font-label text-[9px] uppercase tracking-widest text-[#777777]">{trust.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default Cart;