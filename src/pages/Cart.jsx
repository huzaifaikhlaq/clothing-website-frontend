import { MdOutlineLock } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RxLoop } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa6";

const Cart = () => {
    
    const cartItems = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
            name: "STRUCTURED WOOL OVERCOAT",
            details: "Oatmeal / Medium",
            price: "$1,250.00",
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
            name: "ARCHIVAL LEATHER TOTE",
            details: "Ebony / OS",
            price: "$890.00",
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675",
            name: "SQUARE-TOE DERBY BOOT",
            details: "Nero / 42",
            price: "$640.00",
        }
    ];

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
                {cartItems.map((item, index) => (
                    <div key={item.id}>
                        <div className="flex gap-6 group">
                            <div className="w-24 aspect-[3/4] bg-[#eeeeee] overflow-hidden">
                                <img className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700" src={item.img} alt={item.name} />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-label font-bold uppercase text-[12px] tracking-wider text-[#1a1c1c]">
                                            {item.name}
                                        </h3>
                                        <button className="text-[#c6c6c6] hover:text-[#1a1c1c] transition-colors">
                                            <span className="cursor-pointer text-lg"><IoClose /></span>
                                        </button>
                                    </div>
                                    <p className="font-body text-xs text-[#777777] mt-1">{item.details}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-6 border-b border-[#c6c6c6] pb-1">
                                        <span className="material-symbols-outlined text-sm cursor-pointer hover:text-black"><FaMinus /></span>
                                        <span className="font-label text-xs">1</span>
                                        <span className="material-symbols-outlined text-sm cursor-pointer hover:text-black"><HiPlus /></span>
                                    </div>
                                    <p className="font-label font-bold text-sm text-[#1a1c1c]">{item.price}</p>
                                </div>
                            </div>
                        </div>
                        {index !== cartItems.length - 1 && (
                            <div className="bg-[#c6c6c6] h-[1px] opacity-30"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Order Summary Panel */}
            <section className="mt-20 pt-10 border-t border-[#c6c6c6]">
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                        <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Subtotal</span>
                        <span className="font-label text-sm text-[#1a1c1c]">$2,780.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Shipping</span>
                        <span className="font-label text-sm text-[#1a1c1c]">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <span className="font-label text-xs uppercase tracking-[0.3em] font-bold text-[#1a1c1c]">Total</span>
                        <span className="font-label text-xl font-bold tracking-tight text-[#1a1c1c]">$2,780.00</span>
                    </div>
                </div>

                <button className="w-full bg-black text-[#e5e2e1] py-5 font-label uppercase text-[12px] tracking-[0.25em] font-bold mb-4 active:opacity-70 transition-opacity">
                    Proceed to Checkout
                </button>

                {/* Trust Icons */}
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
        </main>
    );
};

export default Cart;