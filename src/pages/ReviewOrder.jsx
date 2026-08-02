import { useLocation, Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { createOrderThunk } from "../features/oders/orderTrunk.js";
import { clearCartItems } from "../features/cart/cartTrunks.js"

import { FaCreditCard, FaMoneyBillWave, FaStripe } from "react-icons/fa6";

const OrderReview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderData = location.state?.orderData || {};
    const cartItems = orderData?.cartItems || [];


    const renderPaymentIcon = (method) => {
        if (!method) return <FaMoneyBillWave size={22} />;
        const lowerMethod = method.toLowerCase();
        if (lowerMethod.includes("card") || lowerMethod.includes("credit")) return <FaCreditCard size={22} />;
        if (lowerMethod.includes("stripe")) return <FaStripe size={22} />;
        return <FaMoneyBillWave size={22} />;
    };

    const handlePlaceOrder = async () => {
        const orderPayload = {
            shippingAddress: {
                fullName: orderData.fullName,
                email: orderData.email,
                phone: orderData.phoneNumber,
                address: orderData.address,
                city: orderData.city,
                postalCode: orderData.postalCode
            },
            paymentMethod: orderData.paymentMethod,
            items: cartItems.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                color: item.color || "Default",
                size: item.size || "Default"
            }))
        }
        try {
            const result = await dispatch(createOrderThunk(orderPayload)).unwrap();

            await dispatch(clearCartItems()).unwrap()

            navigate("/profile", {
                state: { orderId: result._id },
            });
        } catch (error) {
            console.error("Order creation failed:", error);
        }
    };



    return (
        <main className="flex-grow pt-15 pb-18 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
            {/* Navigation Header */}
            <nav className="mb-20">
                <ul className="flex justify-center items-center gap-4 md:gap-12">
                    <Link to="/cart" className="flex items-center gap-3 cursor-pointer">
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400">01</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Cart</span>
                    </Link>
                    <li className="w-8 h-[1px] bg-neutral-200"></li>
                    <Link to="/checkout" className="flex items-center gap-3">
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400">02</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Checkout</span>
                    </Link>
                    <li className="w-8 h-[1px] bg-neutral-200"></li>
                    <li className="flex items-center gap-3">
                        <span className="font-label text-[10px] tracking-[0.2em] text-black font-bold underline underline-offset-8">03</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-black font-bold uppercase underline underline-offset-8">Review</span>
                    </li>
                </ul>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-7 space-y-16">

                    {/* Customer & Address Details */}
                    <section>
                        <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-6">
                            Shipping Details
                        </h3>
                        <div className="bg-[#f3f3f3] p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="font-label text-[10px] uppercase text-neutral-500 mb-2">Delivery Address</p>
                                <address className="not-italic font-body text-sm leading-relaxed text-[#1a1c1c]">
                                    {orderData.fullName || "Name Not Provided"}<br />
                                    {orderData.address || "Address Not Provided"}<br />
                                    {orderData.city || "City"}, {orderData.postalCode || "Postal Code"}<br />
                                    {orderData.phoneNumber || "No phone provided"}<br />
                                    <span className="text-neutral-500">{orderData.email}</span>
                                </address>
                            </div>
                            <div>
                                <p className="font-label text-[10px] uppercase text-neutral-500 mb-2">Delivery Method</p>
                                <p className="font-body text-sm text-[#1a1c1c]">Standard Express Shipping (3-5 Business Days)</p>
                            </div>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section>
                        <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-6">
                            Payment Method
                        </h3>
                        <div className="bg-[#f3f3f3] p-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-[#1a1c1c]">
                                    {renderPaymentIcon(orderData.paymentMethod)}
                                </span>
                                <div>
                                    <p className="font-body text-sm font-bold text-[#1a1c1c]">
                                        {orderData.paymentMethod || "Cash On Delivery"}
                                    </p>
                                    <p className="font-label text-[10px] uppercase text-neutral-500">
                                        Status: {orderData.paymentStatus || "Pending"}
                                    </p>
                                </div>
                            </div>
                            <Link to="/checkout" className="text-[10px] font-label uppercase underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity text-[#777777]">
                                Edit
                            </Link>
                        </div>
                    </section>

                    {/* Dynamic Order Items */}
                    <section>
                        <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-6">
                            Order Items ({String(cartItems.length).padStart(2, '0')})
                        </h3>
                        <div className="space-y-4">
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <div key={item.id || item._id || index} className="flex gap-6 items-center bg-white p-4 border border-[#f0f0f0]">
                                        <div className="w-24 aspect-[3/4] bg-neutral-100 overflow-hidden flex-shrink-0">
                                            <img
                                                alt={item.title || item.name || "Product image"}
                                                className="w-full h-full object-cover"
                                                src={item.product.images[0]}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-body font-bold text-sm text-[#1a1c1c]">
                                                {item.title || item.name || "Item Name"}
                                            </h4>
                                            <p className="font-label text-[10px] text-neutral-500 uppercase mt-1">
                                                Qty: {item.quantity || 1} {item.size ? `/ Size: ${item.size}` : ''} {item.color ? `/ ${item.color}` : ''}
                                            </p>
                                        </div>
                                        <div className="font-body text-sm font-bold text-[#1a1c1c]">
                                            Rs. {(item.product.price || 0).toLocaleString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-neutral-400 italic">No items found in cart.</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Summary Column */}
                <div className="lg:col-span-5">
                    <div className="bg-white p-10 sticky top-32 border border-[#eeeeee]">
                        <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-10">Order Summary</h3>
                        <div className="space-y-6 pb-10 mb-10 border-b border-neutral-100">
                            <div className="flex justify-between items-center">
                                <span className="font-body text-sm text-neutral-500">Subtotal</span>
                                <span className="font-body text-sm font-bold text-[#1a1c1c]">
                                    Rs. {(orderData.totalAmount || 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-body text-sm text-neutral-500">Shipping</span>
                                <span className="font-body text-sm font-bold text-[#1a1c1c]">Free</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-end mb-12">
                            <span className="font-label text-[12px] tracking-[0.2em] uppercase font-bold text-[#1a1c1c]">Total</span>
                            <span className="font-headline text-3xl font-bold text-[#1a1c1c]">
                                Rs. {(orderData.totalAmount || 0).toLocaleString()}
                            </span>
                        </div>
                        <button onClick={handlePlaceOrder} className="w-full bg-black text-[#e5e2e1] py-6 font-label text-[12px] tracking-[0.3em] uppercase font-bold hover:opacity-90 transition-all active:scale-[0.98]">
                            PLACE ORDER
                        </button>
                        <p className="mt-8 text-[10px] text-neutral-400 leading-relaxed font-body text-center px-4">
                            By placing your order, you agree to our purchase terms and conditions.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderReview;