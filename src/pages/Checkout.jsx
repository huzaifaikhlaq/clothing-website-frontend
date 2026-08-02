import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCreditCard, FaStripe, FaMoneyBillWave } from "react-icons/fa6";

const Checkout = () => {
    const navigate = useNavigate();

    const { items: cartItems = [],  } = useSelector((state) => state.cart);

    // --- Shipping State ---
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [shippingData, setShippingData] = useState({
        email: "",
        fullName: "",
        address: "",
        phoneNumber: "",
        city: "",
        postalCode: "",
        newsletter: false
    });

    // --- Payment State ---
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    const [cardDetails, setCardDetails] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
        sameAsShipping: true
    });

    // --- Handlers ---
    useEffect(() => {
        setShippingData((prevData) => ({
            ...prevData,
            fullName: `${firstName} ${lastName}`.trim()
        }));
    }, [firstName, lastName]);

    const handleShippingChange = (e) => {
        const { name, value, type, checked } = e.target;
        setShippingData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // --- Dynamic Calculations ---
    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => {
            const itemPrice = item.product?.salePrice ?? item.product?.price ?? 0;
            return acc + itemPrice * item.quantity;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const shippingFee = 0; 
    const estimatedTax = 0;
    const totalAmountCalculated = subtotal + shippingFee + estimatedTax;

    const handleCompletePurchase = (e) => {
        e.preventDefault();

        const orderData = {
            ...shippingData,
            paymentMethod,
            paymentStatus: "Pending",
            ...(paymentMethod === "Card" && { ...cardDetails }),
            cartItems,
            totalAmount: totalAmountCalculated
        };

        navigate("/review", { state: { orderData } });
    };

    return (
        <main className="pt-19 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Progress Indicator */}
            <nav className="mb-20">
                <ul className="flex justify-center items-center gap-4 md:gap-12">
                    <Link to="/cart" className="flex items-center gap-3 cursor-pointer">
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400">01</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Cart</span>
                    </Link>
                    <li className="w-8 h-[1px] bg-neutral-200"></li>
                    <li className="flex items-center gap-3">
                        <span className="font-label text-[10px] tracking-[0.2em] text-black font-bold underline underline-offset-8">02</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-black font-bold uppercase underline underline-offset-8">Checkout</span>
                    </li>
                    <li className="w-8 h-[1px] bg-neutral-200"></li>
                    <li className="flex items-center gap-3">
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400">03</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Review</span>
                    </li>
                </ul>
            </nav>

            <form onSubmit={handleCompletePurchase} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left Column: Forms */}
                <div className="lg:col-span-7">
                    <div className="space-y-16">

                        {/* ============================== */}
                        {/* 1. CONTACT & SHIPPING SECTION  */}
                        {/* ============================== */}
                        <section className="space-y-12">
                            {/* Contact Sub-section */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-end mb-6">
                                    <h2 className="text-3xl font-light tracking-tight">Contact</h2>
                                    <a className="font-label text-xs tracking-wider uppercase underline underline-offset-4 text-[#777777] hover:text-black transition-colors" href="#">
                                        Sign in
                                    </a>
                                </div>
                                <div className="space-y-2">
                                    <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]" htmlFor="email">
                                        Email Address *
                                    </label>
                                    <input
                                        className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none"
                                        id="email"
                                        name="email"
                                        value={shippingData.email}
                                        onChange={handleShippingChange}
                                        placeholder="email@address.com"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        className="w-4 h-4 rounded-sm border-[#c6c6c6] text-black focus:ring-0 cursor-pointer"
                                        id="newsletter"
                                        name="newsletter"
                                        checked={shippingData.newsletter}
                                        onChange={handleShippingChange}
                                        type="checkbox"
                                    />
                                    <label className="font-label text-xs text-[#777777] cursor-pointer" htmlFor="newsletter">
                                        Email me with news and offers
                                    </label>
                                </div>
                            </div>

                            {/* Shipping Address Sub-section */}
                            <div className="space-y-6">
                                <h2 className="text-3xl font-light tracking-tight mb-6">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">First Name *</label>
                                        <input
                                            className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none"
                                            type="text"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">Last Name *</label>
                                        <input
                                            className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none"
                                            type="text"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">Address *</label>
                                        <input
                                            className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none"
                                            placeholder="Street and house number"
                                            type="text"
                                            name="address"
                                            value={shippingData.address}
                                            onChange={handleShippingChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">Phone Number *</label>
                                        <input
                                            className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none"
                                            type="text"
                                            name="phoneNumber"
                                            value={shippingData.phoneNumber}
                                            onChange={handleShippingChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">City *</label>
                                        <input
                                            className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none"
                                            type="text"
                                            name="city"
                                            value={shippingData.city}
                                            onChange={handleShippingChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">Postal Code *</label>
                                        <input
                                            className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none"
                                            type="text"
                                            name="postalCode"
                                            value={shippingData.postalCode}
                                            onChange={handleShippingChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Divider */}
                        <hr className="border-[#c6c6c6]/40" />

                        {/* ============================== */}
                        {/* 2. PAYMENT SECTION             */}
                        {/* ============================== */}
                        <section className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-light tracking-tight mb-8">Payment Method</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {/* Cash On Delivery */}
                                    <div
                                        onClick={() => setPaymentMethod("Cash On Delivery")}
                                        className={`border p-6 flex flex-col justify-between h-32 cursor-pointer transition-colors bg-white ${paymentMethod === "Cash On Delivery" ? "border-black text-[#1a1c1c]" : "border-[#c6c6c6] text-[#777777] hover:border-[#777777]"}`}
                                    >
                                        <span className={`font-label text-[10px] tracking-widest uppercase ${paymentMethod === "Cash On Delivery" ? "font-bold" : ""}`}>Cash On Delivery</span>
                                        <span className="material-symbols-outlined text-xl"><FaMoneyBillWave /></span>
                                    </div>

                                    {/* Card */}
                                    <div
                                        onClick={() => setPaymentMethod("Card")}
                                        className={`border p-6 flex flex-col justify-between h-32 cursor-pointer transition-colors bg-white ${paymentMethod === "Card" ? "border-black text-[#1a1c1c]" : "border-[#c6c6c6] text-[#777777] hover:border-[#777777]"}`}
                                    >
                                        <span className={`font-label text-[10px] tracking-widest uppercase ${paymentMethod === "Card" ? "font-bold" : ""}`}>Card</span>
                                        <span className="material-symbols-outlined text-xl"><FaCreditCard /></span>
                                    </div>

                                    {/* Stripe */}
                                    <div
                                        onClick={() => setPaymentMethod("Stripe")}
                                        className={`border p-6 flex flex-col justify-between h-32 cursor-pointer transition-colors bg-white ${paymentMethod === "Stripe" ? "border-black text-[#1a1c1c]" : "border-[#c6c6c6] text-[#777777] hover:border-[#777777]"}`}
                                    >
                                        <span className={`font-label text-[10px] tracking-widest uppercase ${paymentMethod === "Stripe" ? "font-bold" : ""}`}>Stripe</span>
                                        <span className="material-symbols-outlined text-2xl"><FaStripe /></span>
                                    </div>
                                </div>
                            </div>

                            {/* Conditionally Render Card Details Form */}
                            {paymentMethod === "Card" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-2">
                                            <label className="font-label text-[10px] tracking-widest uppercase text-[#777777]">Name on card *</label>
                                            <input
                                                value={cardDetails.name}
                                                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                                className="w-full bg-[#f3f3f3] border-0 border-b border-[#c6c6c6] focus:ring-0 focus:border-black py-4 px-0 font-body text-sm placeholder:text-neutral-300 outline-none transition-all"
                                                placeholder="ELARA VANE"
                                                type="text"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-label text-[10px] tracking-widest uppercase text-[#777777]">Card number *</label>
                                            <input
                                                value={cardDetails.number}
                                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                className="w-full bg-[#f3f3f3] border-0 border-b border-[#c6c6c6] focus:ring-0 focus:border-black py-4 px-0 font-body text-sm placeholder:text-neutral-300 outline-none transition-all"
                                                placeholder="**** **** **** 8829"
                                                type="text"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="font-label text-[10px] tracking-widest uppercase text-[#777777]">Expiry *</label>
                                                <input
                                                    value={cardDetails.expiry}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                    className="w-full bg-[#f3f3f3] border-0 border-b border-[#c6c6c6] focus:ring-0 focus:border-black py-4 px-0 font-body text-sm placeholder:text-neutral-300 outline-none transition-all"
                                                    placeholder="MM / YY"
                                                    type="text"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="font-label text-[10px] tracking-widest uppercase text-[#777777]">CVV *</label>
                                                <input
                                                    value={cardDetails.cvv}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                    className="w-full bg-[#f3f3f3] border-0 border-b border-[#c6c6c6] focus:ring-0 focus:border-black py-4 px-0 font-body text-sm placeholder:text-neutral-300 outline-none transition-all"
                                                    placeholder="***"
                                                    type="password"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 pt-4">
                                        <input
                                            checked={cardDetails.sameAsShipping}
                                            onChange={(e) => setCardDetails({ ...cardDetails, sameAsShipping: e.target.checked })}
                                            className="w-4 h-4 rounded-none border-black text-black focus:ring-0 cursor-pointer"
                                            type="checkbox"
                                        />
                                        <label className="font-label text-[11px] tracking-wider uppercase text-[#1a1c1c]">Same as shipping address</label>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "Stripe" && (
                                <div className="p-8 bg-[#f3f3f3] border border-[#c6c6c6] text-center">
                                    <p className="font-label text-xs tracking-widest uppercase text-[#777777]">
                                        You will be redirected to Stripe to securely complete your payment upon submission.
                                    </p>
                                </div>
                            )}

                            {paymentMethod === "Cash On Delivery" && (
                                <div className="p-8 bg-[#f3f3f3] border border-[#c6c6c6] text-center">
                                    <p className="font-label text-xs tracking-widest uppercase text-[#777777]">
                                        You will pay securely with cash upon receiving your order.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* Right Column: Dynamic Order Summary Section */}
                <div className="lg:col-span-5">
                    <div className="bg-[#f3f3f3] p-8 lg:p-12 sticky top-32">
                        <h3 className="text-2xl font-light mb-10">Order Summary</h3>

                        {/* Dynamic Product List */}
                        <div className="space-y-6 mb-10 pb-10 border-b border-[#c6c6c6]/30 max-h-[380px] overflow-y-auto pr-2">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => {
                                    const activePrice = item.product?.salePrice ?? item.product?.price ?? 0;
                                    return (
                                        <div key={item._id} className="flex gap-6 items-center">
                                            <div className="w-20 h-[100px] bg-[#e8e8e8] flex-shrink-0 relative overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={item.product?.images?.[0] || "https://via.placeholder.com/150"}
                                                    alt={item.product?.title || "Product"}
                                                />
                                                <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex flex-col justify-between py-1 flex-1">
                                                <div>
                                                    <p className="font-label text-[10px] tracking-widest uppercase text-[#777777] mb-1">VOIRE ATELIER</p>
                                                    <h4 className="text-sm font-medium leading-snug line-clamp-1">{item.product?.title}</h4>
                                                    <p className="font-label text-[10px] text-[#777777] tracking-wider mt-1">
                                                        {item.color} / {item.size}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center mt-2">
                                                    <p className="font-label text-xs text-[#777777]">Qty: {item.quantity}</p>
                                                    <p className="font-label text-sm font-bold">
                                                        PKR {(activePrice * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-sm text-[#777777] italic">Your cart is currently empty.</p>
                            )}
                        </div>

                        {/* Calculation Totals */}
                        <div className="space-y-4 font-label text-xs tracking-wider uppercase text-[#474747]">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>PKR {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{shippingFee === 0 ? "Complimentary" : `PKR ${shippingFee.toLocaleString()}`}</span>
                            </div>
                            {estimatedTax > 0 && (
                                <div className="flex justify-between">
                                    <span>Estimated Tax</span>
                                    <span>PKR {estimatedTax.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-6 mt-6 border-t border-[#c6c6c6]/30 text-black font-bold text-sm">
                                <span>Total</span>
                                <span>PKR {totalAmountCalculated.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={cartItems.length === 0}
                            className="block flex items-center justify-center w-full bg-black text-[#e5e2e1] py-6 mt-12 font-label text-[10px] tracking-[0.3em] uppercase hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Complete Purchase
                        </button>
                        <p className="mt-6 text-center font-label text-[9px] text-[#777777] tracking-widest uppercase">
                            Secure SSL Encrypted Checkout
                        </p>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default Checkout;