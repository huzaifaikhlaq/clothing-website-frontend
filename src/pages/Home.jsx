import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md"; // correct refresh icon

import { PiPackageBold } from "react-icons/pi";
import { RiVerifiedBadgeLine } from "react-icons/ri";

const Home = () => {
    return (
        <div className="">
            <section className="flex flex-col md:flex-row min-h-[91vh] bg-zinc-50 overflow-hidden">
                <div className="w-full md:w-[60%] relative aspect-[4/5] md:aspect-auto">
                    <img
                        alt="Minimalist fashion editorial"
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop"
                    />
                    {/* Subtle Overlay for depth */}
                    <div className="absolute inset-0 bg-black/5 md:hidden"></div>
                </div>

                <div className="w-full md:w-[40%] flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white">
                    <span className="font-label tracking-[0.3em] uppercase text-[9px] mb-4 text-zinc-400">Editorial Vol. 01</span>
                    <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-zinc-900">
                        Dressed for silence.
                    </h2>
                    <p className="font-sans text-sm md:text-base text-zinc-500 mb-10 max-w-sm tracking-wide leading-relaxed">
                        The intersection of architectural form and quiet luxury. Our permanent collection focuses on the essential, the enduring, and the silent.
                    </p>
                    <button className="bg-zinc-900 text-white px-12 py-4 self-start font-label uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-zinc-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                        Shop Collection
                    </button>
                </div>
            </section>

            {/* Category Tiles */}
            <section className="px-6 py-24 md:px-12 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-[1440px] mx-auto">
                    {['Women', 'Men', 'Accessories', 'New In'].map((cat) => (
                        <a key={cat} className="group cursor-pointer block" href="#">
                            <div className="aspect-[3/4] bg-zinc-100 overflow-hidden mb-4 relative">
                                <img
                                    alt={cat}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-110"
                                    src={`https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop`}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-serif italic text-xl text-zinc-900">{cat}</span>
                                <span className="material-symbols-outlined text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">east</span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Featured Collection Banner */}
            <section className="bg-zinc-950 text-white py-32 md:py-48 px-6 flex flex-col items-center text-center overflow-hidden relative">
                <div className="relative z-10 max-w-2xl">
                    <span className="font-label tracking-[0.4em] uppercase text-[10px] mb-6 block text-zinc-400">SS 25 Collection</span>
                    <h2 className="font-serif italic text-6xl md:text-8xl mb-8 leading-none">Quiet Form</h2>
                    <p className="font-sans text-zinc-400 mb-12 text-sm md:text-base leading-relaxed tracking-wide opacity-80">
                        An exploration of negative space and textile weight. The SS25 collection debuts a new philosophy of wearability.
                    </p>
                    <button className="border border-white/20 hover:border-white/100 hover:bg-white hover:text-black px-12 py-4 font-label uppercase tracking-widest text-[10px] transition-all duration-500">
                        Explore Film
                    </button>
                </div>
                {/* Parallax-style Background */}
                <div className="absolute inset-0 opacity-40 scale-105 hover:scale-100 transition-transform duration-[3s]">
                    <img
                        alt="Macro fabric texture"
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2526&auto=format&fit=crop"
                    />
                </div>
            </section>

            {/* Bestsellers Section */}
            <section className="px-6 py-24 md:px-12 bg-white">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex justify-between items-end mb-16 border-b border-zinc-100 pb-8">
                        <div>
                            <h3 className="font-serif italic text-4xl mb-2">The Bestsellers</h3>
                            <p className="text-zinc-400 text-xs tracking-wide">Most-loved pieces from our permanent studio.</p>
                        </div>
                        <a className="font-label text-[10px] uppercase tracking-widest border-b border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-300 transition-colors" href="#">View All</a>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 md:gap-x-10">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="group cursor-pointer">
                                <div className="aspect-[3/4] bg-zinc-50 mb-6 relative overflow-hidden">
                                    <img
                                        alt="Product showcase"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2672&auto=format&fit=crop"
                                    />
                                    {/* Quick Add Button - Appears on Hover */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <button className="w-full bg-white/90 backdrop-blur-md text-zinc-900 py-3 text-[10px] uppercase tracking-widest font-bold shadow-xl">
                                            Quick Add +
                                        </button>
                                    </div>
                                    <button className="absolute top-4 right-4 text-zinc-900 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h4 className="font-label text-[11px] uppercase tracking-wider font-bold text-zinc-800">Sculpted Wool Blazer</h4>
                                    <p className="font-sans text-xs text-zinc-500 font-medium">$420.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Editorial Strip / Trust Bar */}
            <section className="bg-zinc-50 border-y border-zinc-200/50">
                <div className="max-w-[1440px] mx-auto flex overflow-x-auto no-scrollbar md:justify-center divide-x divide-zinc-200 py-16 px-6">
                    {[
                        { icon: <MdOutlineLocalShipping />, text: 'Complimentary Global Shipping' },
                        { icon: <MdOutlineRefresh />, text: '30-Day Quiet Returns' },
                        { icon: <PiPackageBold />, text: 'Plastic-Free Conscious Packaging' },
                        { icon: <RiVerifiedBadgeLine />, text: 'Certified Editorial Excellence' }
                    ].map((feature, i) => (
                        <div key={i} className="flex-shrink-0 flex flex-col justify-center items-center px-10 md:px-16 text-center group">
                            <span className="material-symbols-outlined mb-2 text-zinc-400 group-hover:text-zinc-900 transition-colors duration-500 text-2xl">{feature.icon}</span>
                            <p className="font-label text-[9px] uppercase tracking-[0.25em] text-zinc-500 leading-loose max-w-[150px] mx-auto">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home