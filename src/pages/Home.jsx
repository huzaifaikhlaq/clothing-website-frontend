import { Link } from 'react-router-dom';

import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";
import { PiPackageBold } from "react-icons/pi";
import { RiVerifiedBadgeLine } from "react-icons/ri";

import ProductGrid from '../components/product/ProductGrid';

const Home = () => {

    const allProducts = [
        { id: "p1", title: "Sculptural Linen Vest", description: "Regular fit | Womens", price: 195, originalPrice: null, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "NEW", gender: "women", category: "tops", color: "white" },
        { id: "p10", title: "Relaxed Fit Hoodie", description: "Relaxed fit | Mens", price: 140, originalPrice: null, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", badge: "", gender: "men", category: "tops", color: "gray" },
        { id: "p3", title: "Striped Summer Shorts", description: "Easy fit | Junior", price: 25, originalPrice: null, image: "https://images.unsplash.com/photo-1554342321-0776d282ceac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkfGVufDB8fDB8fHww", badge: "", gender: "junior", category: "bottoms", color: "blue" },
        { id: "p4", title: "Fine Knit Cashmere Tee", description: "Premium fit | Mens", price: 350, originalPrice: null, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633", badge: "", gender: "men", category: "tops", color: "gray" }
    ]

    const categoryTiles = [
        { name: "Mens", link: "/collections/men" },
        { name: "Womens", link: "/collections/women" },
        { name: "Junior", link: "/collections/junior" },
    ];

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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-[1440px] mx-auto">
                    {categoryTiles.map((cat) => (
                        <Link
                            key={cat.name}
                            to={cat.link}
                            className="group cursor-pointer block"
                        >
                            <div className="aspect-[3/4] bg-zinc-100 overflow-hidden mb-4 relative">
                                <img
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-110"
                                    src={
                                        cat.name === "Mens"
                                            ? "https://images.unsplash.com/photo-1505022610485-0249ba5b3675"
                                            : cat.name === "Womens"
                                                ? "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww"
                                                : "https://plus.unsplash.com/premium_photo-1681842331029-2e262fb2aa22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hpbGR8ZW58MHx8MHx8fDA%3D"
                                    }
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-serif italic text-xl text-zinc-900">{cat.name}</span>
                                <span className="material-symbols-outlined text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    east
                                </span>
                            </div>
                        </Link>
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

                    <div className="">
                        <ProductGrid products={allProducts} />
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
        </div >
    )
}

export default Home 