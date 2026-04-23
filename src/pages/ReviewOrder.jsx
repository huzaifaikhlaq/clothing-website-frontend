import { FaCreditCard } from "react-icons/fa6";

const OrderReview = () => {
    return (
        <main className="flex-grow pt-15 pb-18 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
            {/* Hero Header */}
            <div className="mb-20">
                <h2 className="font-headline italic text-6xl md:text-8xl tracking-tighter text-black">Final Review</h2>
                <p className="font-body text-neutral-500 mt-4 max-w-md uppercase tracking-widest text-[10px]">
                    Please ensure all archival specifications are correct before finalizing your acquisition.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Information Column */}
                <div className="lg:col-span-7 space-y-16">
                    {/* Shipping Details */}
                    <section>
                        <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-6">Shipping Details</h3>
                        <div className="bg-[#f3f3f3] p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div> 
                                <p className="font-label text-[10px] uppercase text-neutral-500 mb-2">Delivery Address</p>
                                <address className="not-italic font-body text-sm leading-relaxed text-[#1a1c1c]">
                                    Julian Thorne<br />
                                    7421 Heritage Avenue, Suite 402<br />
                                    New York, NY 10013<br />
                                    United States
                                </address>
                            </div>
                            <div>
                                <p className="font-label text-[10px] uppercase text-neutral-500 mb-2">Method</p>
                                <p className="font-body text-sm text-[#1a1c1c]">Archival Secure Shipping (3-5 Business Days)</p>
                            </div>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section>
                        <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-6">Payment Method</h3>
                        <div className="bg-[#f3f3f3] p-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-[#1a1c1c]"><FaCreditCard size={22} /></span>
                                <div>
                                    <p className="font-body text-sm font-bold text-[#1a1c1c]">Visa ending in 8829</p>
                                    <p className="font-label text-[10px] uppercase text-neutral-500">Expires 11/26</p>
                                </div>
                            </div>
                            <div className="text-[10px] font-label uppercase underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity text-[#777777]">Edit</div>
                        </div>
                    </section>

                    {/* Order Items */}
                    <section>
                        <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-6">Order Items (02)</h3>
                        <div className="space-y-4">
                            {/* Item 1 */}
                            <div className="flex gap-6 items-center bg-white p-4">
                                <div className="w-24 aspect-[3/4] bg-neutral-200 overflow-hidden">
                                    <img
                                        alt="Sculptural Wool Overcoat"
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOSISX2Bs76TiVXBNRS69hfJWvmsI1QXlUVT3B0NvJf15r26oZpZzTv79MvwtMnOx5GMm1XhS69Do_djHk5x-xUe5HFAWAtlGhqOixm6yjp9laiFt5XowJlYdK4e7bJyDX2O3-ojjxnf2TT9ZwbCR8_hK_C90g0oqxxTr9NfwAxtjnjY8jQdUlifooJjk3tC_PGNvoqrvYHGN4HVorQ4S8GF2xLWNhr6sd5_bCfNjnjjHPhyqs97KWXKBwzBrsnpHUcXDiQxcryK4"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-body font-bold text-sm text-[#1a1c1c]">Sculptural Wool Overcoat</h4>
                                    <p className="font-label text-[10px] text-neutral-500 uppercase mt-1">Size: 48 / Midnight Black</p>
                                </div>
                                <div className="font-body text-sm font-bold text-[#1a1c1c]">$2,850.00</div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex gap-6 items-center bg-white p-4">
                                <div className="w-24 aspect-[3/4] bg-neutral-200 overflow-hidden">
                                    <img
                                        alt="Raw Silk Trousers"
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-04j8ULEQffeTtpfO1PU9ERCbmzJucNfT-ECqp3IxVo2wfYQJ9to9LK30yv78Kt-WCHZ5AbUkNf5q42Gw-Exf4p6UPRCR_QoaS3TGXH8KGaD8A1P9Fq4K9CoF-wYHb-_022KOoiT35BcCaNY4ojBAdXKEdbZfUYYgjJ7GCkMlijBeVU_8lON3CpjRyaIKtOwi8Ped-PhfMgz9OkiKKREKgx_QOhbL6-k1eUbZuE5L6w75VjAorvZUpKiGZx2PxKR6vV4J2bPYkr0"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-body font-bold text-sm text-[#1a1c1c]">Raw Silk Trousers</h4>
                                    <p className="font-label text-[10px] text-neutral-500 uppercase mt-1">Size: 46 / Ivory</p>
                                </div>
                                <div className="font-body text-sm font-bold text-[#1a1c1c]">$920.00</div>
                            </div>
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
                                <span className="font-body text-sm font-bold text-[#1a1c1c]">$3,770.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-body text-sm text-neutral-500">Shipping</span>
                                <span className="font-body text-sm font-bold text-[#1a1c1c]">$45.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-body text-sm text-neutral-500">Tax</span>
                                <span className="font-body text-sm font-bold text-[#1a1c1c]">$312.40</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-end mb-12">
                            <span className="font-label text-[12px] tracking-[0.2em] uppercase font-bold text-[#1a1c1c]">Total</span>
                            <span className="font-headline text-4xl font-bold text-[#1a1c1c]">$4,127.40</span>
                        </div>
                        <button className="w-full bg-black text-[#e5e2e1] py-6 font-label text-[12px] tracking-[0.3em] uppercase font-bold hover:opacity-90 transition-all active:scale-[0.98]">
                            PLACE ORDER
                        </button>
                        <p className="mt-8 text-[10px] text-neutral-400 leading-relaxed font-body text-center px-4">
                            By placing your order, you agree to ATELIER VOIRE's archival purchase terms and conditions.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderReview;