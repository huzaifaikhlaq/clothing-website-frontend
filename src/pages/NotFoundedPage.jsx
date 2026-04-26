import { Link } from "react-router-dom";
import ProductGrid from "../components/product/ProductGrid";

const NotFoundPage = () => {

    const products = [
        { id: "p1", title: "Sculptural Linen Vest", description: "Regular fit | Womens", price: 195, originalPrice: null, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "NEW", gender: "women", category: "tops", color: "white" },
        { id: "p2", title: "Silk Bias Cut Top", description: "Slim fit | Womens", price: 280, originalPrice: null, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b", badge: "", gender: "women", category: "tops", color: "black" },
        { id: "p3", title: "Structured Poplin Shirt", description: "Oversized fit | Womens", price: 120, originalPrice: 210, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105", badge: "SALE", gender: "women", category: "tops", color: "blue" },
        { id: "p4", title: "Fine Knit Cashmere Tee", description: "Premium fit | Mens", price: 350, originalPrice: null, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633", badge: "", gender: "men", category: "tops", color: "gray" },
        { id: "p5", title: "Linen Relaxed Trousers", description: "Relaxed fit | Womens", price: 210, originalPrice: 250, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1", badge: "SALE", gender: "women", category: "bottoms", color: "beige" },
        { id: "p6", title: "Wide Leg Denim Jeans", description: "Loose fit | Womens", price: 165, originalPrice: null, image: "https://images.unsplash.com/photo-1542272604-787c3835535d", badge: "NEW", gender: "women", category: "bottoms", color: "blue" },
        { id: "p7", title: "Cotton Oversized Shirt", description: "Oversized fit | Womens", price: 110, originalPrice: null, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", badge: "", gender: "women", category: "tops", color: "white" },
        { id: "p8", title: "Minimal Black Tank", description: "Slim fit | Womens", price: 75, originalPrice: null, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", badge: "NEW", gender: "women", category: "tops", color: "black" },
        { id: "p9", title: "Classic White Tee", description: "Regular fit | Mens", price: 60, originalPrice: 80, image: "https://images.unsplash.com/photo-1520975916090-3105956dac38", badge: "SALE", gender: "men", category: "tops", color: "white" },
        { id: "p10", title: "Relaxed Fit Hoodie", description: "Relaxed fit | Mens", price: 140, originalPrice: null, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", badge: "", gender: "men", category: "tops", color: "gray" },
        { id: "p11", title: "Relaxed Cargo Pants", description: "Utility fit | Mens", price: 135, originalPrice: null, image: "https://images.unsplash.com/photo-1624371438099-6e6a2a6f0f1f", badge: "", gender: "men", category: "bottoms", color: "olive" },
        { id: "p12", title: "High Waist Trousers", description: "Tailored fit | Womens", price: 190, originalPrice: 230, image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d46", badge: "SALE", gender: "women", category: "bottoms", color: "black" },
        { id: "p13", title: "Tailored Wool Blazer", description: "Structured fit | Mens", price: 295, originalPrice: 340, image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675", badge: "SALE", gender: "men", category: "tops", color: "black" },
        { id: "p14", title: "Slim Fit Shirt", description: "Slim fit | Mens", price: 105, originalPrice: null, image: "https://images.unsplash.com/photo-1593032465171-8e7e3f6d6f0c", badge: "", gender: "men", category: "tops", color: "blue" },
        { id: "p15", title: "Denim Jacket", description: "Regular fit | Mens", price: 220, originalPrice: null, image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47", badge: "NEW", gender: "men", category: "tops", color: "blue" },
        { id: "p16", title: "Pleated Midi Skirt", description: "Flowy fit | Womens", price: 160, originalPrice: null, image: "https://images.unsplash.com/photo-1520974735194-29f0d0b1c2c2", badge: "", gender: "women", category: "bottoms", color: "beige" },
        { id: "p17", title: "Soft Knit Sweater", description: "Regular fit | Womens", price: 175, originalPrice: 200, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990", badge: "SALE", gender: "women", category: "tops", color: "gray" },
        { id: "p18", title: "Striped Oxford Shirt", description: "Classic fit | Mens", price: 98, originalPrice: null, image: "https://images.unsplash.com/photo-1604176354201-9268730608", badge: "NEW", gender: "men", category: "tops", color: "blue" },
        { id: "p19", title: "Slim Fit Chino Pants", description: "Slim fit | Mens", price: 125, originalPrice: 145, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", badge: "", gender: "men", category: "bottoms", color: "brown" },
        { id: "p20", title: "Athletic Joggers", description: "Active fit | Mens", price: 95, originalPrice: null, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461", badge: "", gender: "men", category: "bottoms", color: "gray" },
    ];

    return (
        <main className="pt-24 min-h-screen bg-white">
            {/* 404 Hero Section */}
            <section className="flex flex-col items-center justify-center py-24 px-6 text-center">
                <div className="relative mb-8">
                    {/* Large decorative background text */}
                    <h1 className="font-headline text-[12rem] md:text-[20rem] leading-none text-[#e2e2e2] tracking-tighter select-none italic">
                        404
                    </h1>
                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-12">
                        <h2 className="font-headline text-2xl md:text-3xl tracking-tight text-[#1a1c1c] font-light italic">
                            This page has gone quiet.
                        </h2>
                        <p className="font-body text-sm text-[#777777] mt-4 max-w-md">
                            The editorial piece you're looking for has been archived or moved to a new collection.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-8">
                    <Link to="/home" className="bg-black text-[#e5e2e1] px-12 py-4 font-label text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity">
                        Go Home
                    </Link>
                    <Link to="/collections" className="border border-[#c6c6c6] hover:border-black text-black px-12 py-4 font-label text-xs tracking-[0.2em] uppercase transition-colors">
                        Browse Shop
                    </Link>
                </div>
            </section>

            {/* "You Might Like" Section */}
            <section className="bg-[#f3f3f3] py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <h3 className="font-headline italic text-3xl tracking-tight text-[#1a1c1c]">You might like</h3>
                        <a
                            className="font-label text-[10px] uppercase tracking-widest text-[#777777] hover:text-black transition-colors border-b border-transparent hover:border-black pb-1"
                            href="#"
                        >
                            View All
                        </a>
                    </div>


                    <div>
                        <ProductGrid products={products.slice(0, 4)} />
                    </div>

                </div>
            </section>
        </main>
    );
};

export default NotFoundPage;