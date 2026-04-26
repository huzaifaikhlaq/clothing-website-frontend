import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
    return (
        <div className="bg-white min-h-screen text-[#1a1c1c]">
            {/* Fixed Header */}
            <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b border-[#eeeeee]">
                <div className="flex items-cente justify-center gap-3">
                    <Link to="/admin/catalog" className="hover:bg-[#f3f3f3] transition-colors duration-200 p-2">
                        <span className="material-symbols-outlined text-[#1a1c1c] text-lg"><IoMdArrowRoundBack /></span>
                    </Link>
                    <h1 className="font-headline tracking-tight text-xl uppercase font-medium text-[#1a1c1c]">
                        Add Product
                    </h1>
                </div>
            </header>

            <main className="pt-32 pb-32 max-w-5xl mx-auto px-6">
                <form className="space-y-16">
                    {/* Section 01: Imagery */}
                    <section className="space-y-8">
                        <div className="flex items-baseline justify-between border-b border-[#eeeeee] pb-4">
                            <h2 className="font-headline text-3xl font-medium">Imagery</h2>
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Section 01</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Main Image Upload */}
                            <div className="md:col-span-3 aspect-[3/4] bg-[#f3f3f3] flex flex-col items-center justify-center border-2 border-dashed border-[#c6c6c6] group hover:border-black transition-colors cursor-pointer relative overflow-hidden">
                                <img
                                    alt="Background Placeholder"
                                    className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDGMRwcNDyeToevO-TKR2UPh9HNEN_wdX5Wg2Pvazn_bT7B5TqoDk1owN9nNz897ci82OSWNOX8EUxls50wpCCaBRJCENCaXbqaEUofowYrzdSHI4MUT8pTHDrI86TtduW3t7jdXah1TYmdzf6Iskp154NoFm-bxx-YTRUUwOC6jALTwCl9AFuhvGzXccQ1OLWuC078Z5VJcL5CRfabEgzh9iFcrMUEMfMUXnGziN3VWc677enTtbyeR-iSaTK3r8AXAECrkR8bZA"
                                />
                                <div className="z-10 flex flex-col items-center text-center p-8">
                                    <span className="material-symbols-outlined text-4xl mb-3 text-[#1a1c1c]"><FaCloudUploadAlt /></span>
                                    <p className="font-label text-sm uppercase tracking-widest font-bold text-[#1a1c1c]">Upload Main Image</p>
                                    <p className="font-body text-xs text-[#777777] mt-2">Portrait orientation (3:4) recommended</p>
                                </div>
                            </div>
                            {/* Gallery Slots */}
                            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`aspect-[3/4] bg-[#f9f9f9] flex items-center justify-center border border-dashed border-[#c6c6c6] cursor-pointer hover:bg-[#f3f3f3] transition-colors ${i === 3 ? 'hidden md:flex' : ''}`}>
                                        <span className="material-symbols-outlined text-[#777777]"><FaPlus /></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Section 02: Core Details */}
                    <section className="space-y-8">
                        <div className="flex items-baseline justify-between border-b border-[#eeeeee] pb-4">
                            <h2 className="font-headline text-3xl font-medium">Core Details</h2>
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Section 02</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-2">
                                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Product Name</label>
                                <input className="w-full border-b border-[#c6c6c6] py-2 focus:border-black outline-none font-body transition-colors" placeholder="e.g. Silk Drape Midi Dress" type="text" />
                            </div>
                            <div className="space-y-2">
                                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">SKU</label>
                                <input className="w-full border-b border-[#c6c6c6] py-2 focus:border-black outline-none font-body transition-colors" placeholder="VO-2024-001" type="text" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Description</label>
                                <textarea className="w-full border border-[#c6c6c6] p-4 focus:border-black outline-none font-body transition-colors resize-none" placeholder="Crafted from Italian mulberry silk..." rows="5"></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Inventory */}
                    <section className="bg-[#f3f3f3] p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Base Price (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#777777] font-body">$</span>
                                    <input className="w-full bg-transparent border-b border-[#c6c6c6] py-2 pl-6 focus:border-black outline-none font-body transition-colors" placeholder="0.00" type="number" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Sale Price</label>
                                <div className="relative">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#777777] font-body">$</span>
                                    <input className="w-full bg-transparent border-b border-[#c6c6c6] py-2 pl-6 focus:border-black outline-none font-body transition-colors" placeholder="0.00" type="number" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Initial Stock</label>
                                <input className="w-full bg-transparent border-b border-[#c6c6c6] py-2 focus:border-black outline-none font-body transition-colors" placeholder="0" type="number" />
                            </div>
                        </div>
                    </section>

                    {/* Section 03: Taxonomy */}
                    <section className="space-y-8">
                        <div className="flex items-baseline justify-between border-b border-[#eeeeee] pb-4">
                            <h2 className="font-headline text-3xl font-medium">Taxonomy</h2>
                            <span className="font-label text-xs uppercase tracking-widest text-[#777777]">Section 03</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Category</label>
                                <select className="w-full border-b border-[#c6c6c6] py-2 bg-transparent outline-none font-body appearance-none">
                                    <option value="">Select Category</option>
                                    <option value="ready-to-wear">Ready-to-Wear</option>
                                    <option value="leather-goods">Leather Goods</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-[#777777]">Collection</label>
                                <select className="w-full border-b border-[#c6c6c6] py-2 bg-transparent outline-none font-body appearance-none">
                                    <option value="">Select Collection</option>
                                    <option value="spring-summer-24">Spring / Summer 24</option>
                                    <option value="archival">Archival Series</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </form>
            </main>

            {/* Fixed Bottom Action Bar */}
            <nav className="fixed bottom-0 left-0 w-full h-17 flex justify-around items-stretch bg-white z-50 border-t border-[#eeeeee]">
                <button className="flex flex-col items-center justify-center text-[#777777] w-full h-full hover:bg-[#f9f9f9] transition-all active:scale-95 duration-150">
                    <span className="material-symbols-outlined mb-1 text-xl font-black"><RxCross2 /></span>
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold">Discard</span>
                </button>
                <button className="flex flex-col items-center justify-center text-[#e5e2e1] bg-black w-full h-full hover:bg-[#1a1c1c] transition-all active:scale-95 duration-150">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}><FaCheck /></span>
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold">Save Product</span>
                </button>
            </nav>
        </div>
    );
};

export default AddProduct;