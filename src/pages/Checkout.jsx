import { LiaShippingFastSolid } from "react-icons/lia";
import { FaBolt } from "react-icons/fa6";

const Checkout = () => {
    return (
        <main className="pt-20   pb-28 px-4 md:px-8 max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <nav className="mb-12 overflow-x-auto hide-scrollbar">
                <div className="flex items-center space-x-4 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase font-label">
                    <span className="text-[#777777]">1 Cart</span>
                    <span className="text-[#c6c6c6]">→</span>
                    <span className="text-[#1a1c1c] font-bold border-b border-[#1a1c1c] pb-0.5">2 Shipping</span>
                    <span className="text-[#c6c6c6]">→</span>
                    <span className="text-[#777777]">3 Payment</span>
                    <span className="text-[#c6c6c6]">→</span>
                    <span className="text-[#777777]">4 Review</span>
                </div>
            </nav>

            {/* Checkout Form */}
            <section className="space-y-16">
                {/* Contact Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-end">
                        <h2 className="font-headline italic text-3xl text-[#1a1c1c]">Contact</h2>
                        <a
                            className="font-label text-xs tracking-wider uppercase underline underline-offset-4 text-[#777777] hover:text-black transition-colors"
                            href="#"
                        >
                            Sign in
                        </a>
                    </div>
                    <div className="space-y-2">
                        <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none"
                            id="email"
                            placeholder="email@address.com"
                            type="email"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            className="w-4 h-4 rounded-sm border-[#c6c6c6] text-black focus:ring-0 cursor-pointer"
                            id="newsletter"
                            type="checkbox"
                        />
                        <label className="font-label text-xs text-[#777777] cursor-pointer" htmlFor="newsletter">
                            Email me with news and offers
                        </label>
                    </div>
                </div>

                {/* Shipping Address Section */}
                <div className="space-y-8">
                    <h2 className="font-headline italic text-3xl text-[#1a1c1c]">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">First Name</label>
                            <input className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none" type="text" />
                        </div>
                        <div className="space-y-2">
                            <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">Last Name</label>
                            <input className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none" type="text" />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">Address</label>
                            <input className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none" placeholder="Street and house number" type="text" />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">Apartment, suite, etc. (optional)</label>
                            <input className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none" type="text" />
                        </div>
                        <div className="space-y-2">
                            <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">City</label>
                            <input className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none" type="text" />
                        </div>
                        <div className="space-y-2">
                            <label className="block font-label text-[10px] uppercase tracking-widest text-[#777777]">Postal Code</label>
                            <input className="w-full bg-[#e2e2e2] border-none p-4 rounded text-sm focus:bg-white focus:ring-1 focus:ring-black transition-all outline-none" type="text" />
                        </div>
                    </div>
                </div>

                {/* Shipping Method Section */}
                <div className="space-y-6">
                    <h2 className="font-headline italic text-3xl text-[#1a1c1c]">Shipping Method</h2>
                    <div className="space-y-3">
                        {/* Standard Option */}
                        <label className="relative flex items-center justify-between p-6 bg-white cursor-pointer group">
                            <input defaultChecked className="sr-only peer" name="shipping" type="radio" />
                            <div className="absolute inset-0 border border-[#c6c6c6] opacity-20 peer-checked:opacity-100 peer-checked:border-black transition-all"></div>
                            <div className="flex items-center gap-4 z-10">
                                <span className="material-symbols-outlined text-[#777777] peer-checked:text-black"><LiaShippingFastSolid /></span>
                                <div className="flex flex-col">
                                    <span className="font-label text-xs uppercase tracking-widest text-[#1a1c1c] font-bold">Standard Shipping</span>
                                    <span className="text-[11px] text-[#777777]">3—5 Business Days</span>
                                </div>
                            </div>
                            <span className="font-label text-xs font-bold z-10 text-[#1a1c1c]">FREE</span>
                        </label>
                        {/* Express Option */}
                        <label className="relative flex items-center justify-between p-6 bg-white cursor-pointer group">
                            <input className="sr-only peer" name="shipping" type="radio" />
                            <div className="absolute inset-0 border border-[#c6c6c6] opacity-20 peer-checked:opacity-100 peer-checked:border-black transition-all"></div>
                            <div className="flex items-center gap-4 z-10">
                                <span className="material-symbols-outlined text-[#777777] peer-checked:text-black"><FaBolt /></span>
                                <div className="flex flex-col">
                                    <span className="font-label text-xs uppercase tracking-widest text-[#1a1c1c] font-bold">Express Delivery</span>
                                    <span className="text-[11px] text-[#777777]">Next Day Delivery</span>
                                </div>
                            </div>
                            <span className="font-label text-xs font-bold z-10 text-[#1a1c1c]">$25.00</span>
                        </label>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="pt-8">
                    <button className="w-full bg-black text-[#e5e2e1] py-6 px-8 font-label text-[10px] uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity">
                        Continue to Payment
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Checkout