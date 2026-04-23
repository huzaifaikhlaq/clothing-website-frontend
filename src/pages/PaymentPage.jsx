import { FaCreditCard } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import { FaCcApplePay } from "react-icons/fa";

const PaymentPage = () => {
    return (
        <main className="pt-19 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Progress Indicator */}
            <nav className="mb-20">
                <ul className="flex justify-center items-center gap-4 md:gap-12">
                    <li className="flex items-center gap-3">
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400">01</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Cart</span>
                    </li>
                    <li className="w-8 h-[1px] bg-neutral-200"></li>
                    <li className="flex items-center gap-3">
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400">02</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Shipping</span>
                    </li>
                    <li className="w-8 h-[1px] bg-neutral-200"></li>
                    <li className="flex items-center gap-3">
                        <span className="font-label text-[10px] tracking-[0.2em] text-black font-bold underline underline-offset-8">03</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-black font-bold uppercase underline underline-offset-8">Payment</span>
                    </li>
                    <li className="w-8 h-[1px] bg-neutral-200"></li>
                    <li className="flex items-center gap-3">
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400">04</span>
                        <span className="font-label text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Review</span>
                    </li>
                </ul>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Payment Form Section */}
                <div className="lg:col-span-7">
                    <section className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-light tracking-tight mb-8">Payment Method</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Selected Card */}
                                <div className="border border-black p-6 flex flex-col justify-between h-32 cursor-pointer bg-white">
                                    <span className="font-label text-[10px] tracking-widest uppercase font-bold text-[#1a1c1c]">Credit Card</span>
                                    <span className="material-symbols-outlined text-black"><FaCreditCard /></span>
                                </div>
                                {/* PayPal (Unselected) */}
                                <div className="border border-[#c6c6c6] p-6 flex flex-col justify-between h-32 cursor-pointer hover:border-[#777777] transition-colors bg-white">
                                    <span className="font-label text-[10px] tracking-widest uppercase text-[#777777]">PayPal</span>
                                    <span className="material-symbols-outlined text-[#777777]"><IoMdWallet /></span>
                                </div>
                                {/* Apple Pay (Unselected) */}
                                <div className="border border-[#c6c6c6] p-6 flex flex-col justify-between h-32 cursor-pointer hover:border-[#777777] transition-colors bg-white">
                                    <span className="font-label text-[10px] tracking-widest uppercase text-[#777777]">Apple Pay</span>
                                    <span className="material-symbols-outlined text-[#c6c6c6]"><FaCcApplePay /></span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="font-label text-[10px] tracking-widest uppercase text-[#777777]">Name on card</label>
                                    <input
                                        className="w-full bg-[#f3f3f3] border-0 border-b border-[#c6c6c6] focus:ring-0 focus:border-black py-4 px-0 font-body text-sm placeholder:text-neutral-300 outline-none transition-all"
                                        placeholder="ELARA VANE"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label text-[10px] tracking-widest uppercase text-[#777777]">Card number</label>
                                    <input
                                        className="w-full bg-[#f3f3f3] border-0 border-b border-[#c6c6c6] focus:ring-0 focus:border-black py-4 px-0 font-body text-sm placeholder:text-neutral-300 outline-none transition-all"
                                        placeholder="**** **** **** 8829"
                                        type="text"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="font-label text-[10px] tracking-widest uppercase text-[#777777]">Expiry</label>
                                        <input
                                            className="w-full bg-[#f3f3f3] border-0 border-b border-[#c6c6c6] focus:ring-0 focus:border-black py-4 px-0 font-body text-sm placeholder:text-neutral-300 outline-none transition-all"
                                            placeholder="MM / YY"
                                            type="text"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-label text-[10px] tracking-widest uppercase text-[#777777]">CVV</label>
                                        <input
                                            className="w-full bg-[#f3f3f3] border-0 border-b border-[#c6c6c6] focus:ring-0 focus:border-black py-4 px-0 font-body text-sm placeholder:text-neutral-300 outline-none transition-all"
                                            placeholder="***"
                                            type="password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-4">
                                <input
                                    defaultChecked
                                    className="w-4 h-4 rounded-none border-black text-black focus:ring-0 cursor-pointer"
                                    type="checkbox"
                                />
                                <label className="font-label text-[11px] tracking-wider uppercase text-[#1a1c1c]">Same as shipping address</label>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Order Summary Section */}
                <div className="lg:col-span-5">
                    <div className="bg-[#f3f3f3] p-8 lg:p-12 sticky top-32">
                        <h3 className="text-2xl font-light mb-10">Order Summary</h3>
                        <div className="space-y-8 mb-10 pb-10 border-b border-[#c6c6c6]/30">
                            {/* Product Preview */}
                            <div className="flex gap-6">
                                <div className="w-20 h-[100px] bg-[#e8e8e8] flex-shrink-0">
                                    <img
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ph5vZ0Rtt58ZKCUnGI725040CV0G_4Y1nQH1f5xzSM9nV8yUBjeYu6ThM5OhNhfbyonXz5HWOi6CwmxMzzzJXg7l2DD8mqcPraT6IHLo5lul_HVMnwobWQgPo3BlaDktbowZhp01W1Wgy-9PGdAt8DonMYwTA7LZdV7XELRRxiv3JQa4sdosONv_Ih-z4CcJv-_sbBwNtAaaPum0XFTnJedthgJjAPkPzu2E9uBPAz0wdQV5B4CCRmoYWRoPYDzRDZH2slMgeyU"
                                        alt="Product preview"
                                    />
                                </div>
                                <div className="flex flex-col justify-between py-1">
                                    <div>
                                        <p className="font-label text-[10px] tracking-widest uppercase text-[#777777] mb-1">VOIRE ATELIER</p>
                                        <h4 className="text-sm font-medium">Sculptural Wool Overcoat</h4>
                                    </div>
                                    <p className="font-label text-sm font-bold">$1,450.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 font-label text-xs tracking-wider uppercase text-[#474747]">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>$1,450.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Complimentary</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimated Tax</span>
                                <span>$116.00</span>
                            </div>
                            <div className="flex justify-between pt-6 mt-6 border-t border-[#c6c6c6]/30 text-black font-bold text-sm">
                                <span>Total</span>
                                <span>$1,566.00</span>
                            </div>
                        </div>

                        <button className="w-full bg-black text-[#e5e2e1] py-6 mt-12 font-label text-[10px] tracking-[0.3em] uppercase hover:opacity-90 active:scale-[0.98] transition-all">
                            Complete Purchase
                        </button>
                        <p className="mt-6 text-center font-label text-[9px] text-[#777777] tracking-widest uppercase">
                            Secure SSL Encrypted Checkout
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaymentPage;