import { MdOutlineExpandMore } from "react-icons/md";
import ProductGrid from '../components/product/ProductGrid';

const Products = [
    { id: "p1", title: "Sculptural Linen Vest", price: 195, originalPrice: null, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "NEW", gender: "women", category: "tops", color: "white" },
    { id: "p2", title: "Silk Bias Cut Top", price: 280, originalPrice: null, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b", badge: "", gender: "women", category: "tops", color: "black" },
    { id: "p3", title: "Structured Poplin Shirt", price: 120, originalPrice: 210, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105", badge: "SALE", gender: "women", category: "tops", color: "blue" },
    { id: "p4", title: "Fine Knit Cashmere Tee", price: 350, originalPrice: null, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633", badge: "", gender: "men", category: "tops", color: "gray" },
    { id: "p5", title: "Linen Relaxed Trousers", price: 210, originalPrice: 250, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "SALE", gender: "women", category: "bottoms", color: "beige" },
    { id: "p6", title: "Wide Leg Denim Jeans", price: 165, originalPrice: null, image: "https://images.unsplash.com/photo-1542272604-787c3835535d", badge: "NEW", gender: "women", category: "bottoms", color: "blue" },
    { id: "p7", title: "Cotton Oversized Shirt", price: 110, originalPrice: null, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", badge: "", gender: "women", category: "tops", color: "white" },
    { id: "p8", title: "Minimal Black Tank", price: 75, originalPrice: null, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", badge: "NEW", gender: "women", category: "tops", color: "black" },
    { id: "p9", title: "Classic White Tee", price: 60, originalPrice: 80, image: "https://images.unsplash.com/photo-1520975916090-3105956dac38", badge: "SALE", gender: "men", category: "tops", color: "white" },
    { id: "p10", title: "Relaxed Fit Hoodie", price: 140, originalPrice: null, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", badge: "", gender: "men", category: "tops", color: "gray" },
];

const ProductPage = () => {
    return (
        <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 overflow-x-auto whitespace-nowrap no-scrollbar">
                <ol className="flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-outline">
                    <li>
                        <a className="hover:text-primary transition-colors" href="#">Women</a>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-[8px]">/</span>
                        <a className="hover:text-primary transition-colors" href="#">Knitwear</a>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-[8px]">/</span>
                        <span className="text-primary font-bold">Sculpted Merino Cardigan</span>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
                {/* Image Gallery */}
                <div className="md:col-span-7 flex flex-col gap-4">
                    <div className="aspect-3-4 bg-surface-container overflow-hidden group">
                        <img
                            alt="Sculpted Merino Cardigan"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIikDPhgumrZvAE1Z0v6c-AEWBrAFB75OKwyJ8Xcwbr0U0OQCEjmKhezis53ArEWYsvvMZK7RZQRoBBd25LWgFBfZwtlsmIFL5lQBy2wvVKBQJIM9qFLb6r2ER6N5tZdabFmkxIdhcD8DcCLm5Mwf6tFFr_huFy_efuopIPILMgndlI4MCaBFLrsyNXeMXnJmqaTgilY1PEkFgb8F_huPwBeL0IN1Npkd5fVPOoNmNqhMxJJ9rTgJ9F1EAhrteGZUvJKJ6gLbguh0"
                        />
                    </div>
                    <div >
                        <ProductGrid products={Products.slice(5, 9)} layout="row" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="md:col-span-5 flex flex-col gap-8">
                    <section>
                        <h1 className="font-headline text-3xl md:text-4xl text-on-background mb-2">Sculpted Merino Cardigan</h1>
                        <p className="font-body text-lg font-bold text-primary tracking-tight">$380.00</p>
                    </section>

                    <p className="font-body text-sm leading-relaxed text-on-surface-variant max-w-md">
                        Crafted from 100% sustainably sourced extra-fine Merino wool. This piece features a modern silhouette with structured shoulders and a refined ribbed finish, designed to transition seamlessly from day to evening.
                    </p>

                    {/* Color Selector */}
                    <div>
                        <span className="font-body text-[10px] tracking-widest uppercase mb-4 block">
                            Color: <span className="font-bold">Oatmeal</span>
                        </span>
                        <div className="flex gap-4">
                            <button className="w-8 h-8 rounded-full bg-[#E5E2E1] ring-1 ring-offset-2 ring-primary"></button>
                            <button className="w-8 h-8 rounded-full bg-[#1A1C1C] ring-1 ring-outline-variant"></button>
                            <button className="w-8 h-8 rounded-full bg-[#474743] ring-1 ring-outline-variant"></button>
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div>
                        <div className="flex justify-between items-end mb-4">
                            <span className="font-body text-[10px] tracking-widest uppercase block">Select Size</span>
                            <a className="font-body text-[10px] tracking-widest uppercase underline underline-offset-4 text-outline hover:text-primary" href="#">Size Guide</a>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    className={`py-3 font-body text-xs transition-colors ${size === 'S' ? 'bg-primary text-on-primary' : 'border border-outline-variant hover:border-primary'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center border border-outline-variant w-fit">
                            <button className="px-4 py-2 hover:bg-surface-container transition-colors">
                                <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="px-6 font-body text-sm">1</span>
                            <button className="px-4 py-2 hover:bg-surface-container transition-colors">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                        <button className="w-full bg-primary text-on-primary py-5 font-body text-sm uppercase tracking-[0.2em] transition-opacity active:opacity-70">
                            Add to Cart
                        </button>
                        <button className="w-full border border-outline-variant py-5 font-body text-sm uppercase tracking-[0.2em] hover:bg-surface-container-low transition-colors">
                            Add to Wishlist
                        </button>
                    </div>

                    {/* Accordions */}
                    <div className="mt-8 border-t border-outline-variant">
                        <div className="border-b border-outline-variant group" tabIndex="0">
                            <button className="w-full py-5 flex justify-between items-center">
                                <span className="font-body text-[10px] tracking-widest uppercase font-bold">Product Details</span>
                                <span className="material-symbols-outlined text-sm"><MdOutlineExpandMore /></span>
                            </button>
                            <div className="hidden group-focus:block pb-5 text-sm text-on-surface-variant font-body leading-relaxed">
                                • 100% Responsible Wool Standard certified merino wool<br />
                                • Heavyweight rib knit for structure<br />
                                • Sustainable bio-resin buttons<br />
                                • Made in Italy
                            </div>
                        </div>
                        {['Size & Fit', 'Shipping & Returns'].map((item) => (
                            <div key={item} className="border-b border-outline-variant">
                                <button className="w-full py-5 flex justify-between items-center">
                                    <span className="font-body text-[10px] tracking-widest uppercase font-bold">{item}</span>
                                    <span className="material-symbols-outlined text-sm"><MdOutlineExpandMore /></span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* You May Also Like */}
            <section className="mt-24">
                <h2 className="font-headline text-2xl mb-12 italic tracking-tight">You May Also Like</h2>

                <ProductGrid products={Products.slice(0, 4)} layout="row" />

            </section>
        </main >
    );
};

export default ProductPage;