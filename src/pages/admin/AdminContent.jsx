import React, { useState, useMemo } from "react";
import { IoMdAddCircle, IoMdMore, IoMdCreate, IoMdAnalytics, IoMdArrowForward, IoMdCheckmark } from "react-icons/io";
import { MdEditNote } from "react-icons/md";

const AdminContent = () => {
    const [activeCategory, setActiveCategory] = useState("All Content");

    const categories = ["All Content", "Banners", "Lookbooks", "Articles"];

    // Mock Data for the Library
    const libraryItems = [
        {
            id: 1,
            type: "Banners",
            title: "Winter 2024 Collection: The Quiet Luxury",
            tag: "Homepage Hero",
            status: "Published",
            img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
            author: "Julian V.",
            date: "Oct 24, 2023"
        },
        {
            id: 2,
            type: "Articles",
            title: "The Architecture of Silk",
            tag: "Editorial",
            status: "Draft",
            readTime: "12 min read"
        },
        {
            id: 3,
            type: "Banners",
            title: "Jewelry Spotlight",
            tag: "Navigation Menu",
            status: "Active",
            img: "https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?q=80&w=600"
        },
        {
            id: 4,
            type: "Lookbooks",
            title: "Spring '24 Monolith",
            tag: "Lookbook",
            status: "Live",
            products: 24,
            img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600"
        },
        {
            id: 5,
            type: "Lookbooks",
            title: "Parisian Loft Concepts",
            tag: "Showroom",
            status: "Scheduled",
            pages: 12,
            img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600"
        }
    ];

    const editorialQueue = [
        { id: "01.", title: "Sustainability Report 2024", type: "Internal Communications", status: "Draft", statusColor: "text-[#777777]", time: "Last Saved: 2h ago" },
        { id: "02.", title: "The Evolution of the Trench", type: "Global Editorial", status: "Published", statusColor: "text-black font-bold", time: "Last Saved: Oct 20" }
    ];

    // Filter Logic
    const filteredContent = useMemo(() => {
        if (activeCategory === "All Content") return libraryItems;
        return libraryItems.filter(item => item.type === activeCategory);
    }, [activeCategory]);

    const handleCreate = () => {
        alert(`Initializing new ${activeCategory === "All Content" ? "Content" : activeCategory} entry...`);
    };

    return (
        <main className="md:ml-72 bg-[#F7F7F5] min-h-screen">
            <div className="px-6 md:px-12 max-w-[1400px] mx-auto">

                {/* Editorial Header Section */}
                <header className="mb-16">
                    <h1 className="font-headline text-5xl lg:text-7xl font-light tracking-tight text-[#1a1c1c] mb-4">
                        Content Library
                    </h1>
                    <p className="font-label text-[#777777] max-w-lg leading-relaxed uppercase text-xs tracking-tight">
                        Curating the digital presence of VOIRE. Manage seasonal lookbooks, editorial narratives, and primary navigational banners.
                    </p>
                </header>

                {/* Filters & Actions */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                    <div className="flex gap-8 border-b border-[#eeeeee] pb-2 w-full lg:w-auto overflow-x-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`font-label text-[10px] uppercase tracking-widest font-bold pb-2 transition-all whitespace-nowrap ${activeCategory === cat ? "border-b-2 border-black text-black" : "text-[#777777] hover:text-black"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleCreate}
                        className="bg-black text-white px-8 py-3 font-label text-[10px] uppercase tracking-widest font-bold transition-transform active:scale-95"
                    >
                        Create New {activeCategory === "All Content" ? "Entry" : activeCategory.slice(0, -1)}
                    </button>
                </div>

                {/* Bento Grid Content Display */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-[#eeeeee] border border-[#eeeeee]">

                    {/* Logic to handle dynamic layout based on filter */}
                    {filteredContent.map((item) => {
                        // Large Hero Tile (First Banner)
                        if (item.type === "Banners" && item.id === 1) {
                            return (
                                <div key={item.id} className="lg:col-span-8 bg-white p-1">
                                    <div className="group relative aspect-[16/9] overflow-hidden bg-[#f3f3f3]">
                                        <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={item.img} alt={item.title} />
                                        <div className="absolute top-6 left-6 flex gap-2">
                                            <span className="bg-white/90 backdrop-blur px-3 py-1 font-label text-[9px] uppercase tracking-tighter font-bold">{item.status}</span>
                                            <span className="bg-black text-white px-3 py-1 font-label text-[9px] uppercase tracking-tighter font-bold">{item.tag}</span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
                                            <p className="text-white/70 font-label text-[10px] uppercase tracking-[0.2em] mb-2">Primary Banner</p>
                                            <h3 className="font-headline text-4xl text-white italic">{item.title}</h3>
                                        </div>
                                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="bg-white p-3 rounded-full shadow-2xl text-black hover:bg-black hover:text-white transition-colors"><IoMdCreate size={20} /></button>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-end p-4">
                                        <div>
                                            <p className="font-label text-[9px] uppercase tracking-widest text-[#777777]">Last Edited</p>
                                            <p className="font-label text-xs font-bold">{item.date} by {item.author}</p>
                                        </div>
                                        <button className="font-label text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1 flex items-center gap-2">
                                            <IoMdAnalytics /> View Analytics
                                        </button>
                                    </div>
                                </div>
                            );
                        }

                        // Article Tile
                        if (item.type === "Articles") {
                            return (
                                <div key={item.id} className="lg:col-span-4 bg-white p-8 group flex flex-col min-h-[300px]">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-[#f3f3f3] px-3 py-1 font-label text-[9px] uppercase tracking-tighter font-bold text-[#777777]">{item.status}</span>
                                        <IoMdMore className="text-[#c6c6c6] cursor-pointer hover:text-black" size={20} />
                                    </div>
                                    <p className="font-label text-[9px] uppercase tracking-[0.2em] text-[#777777] mb-3">Editorial Article</p>
                                    <h4 className="font-headline text-3xl leading-tight mb-4 group-hover:italic transition-all">{item.title}</h4>
                                    <div className="mt-auto pt-8 flex items-center justify-between border-t border-[#f9f9f9]">
                                        <span className="font-label text-[10px] text-[#777777] uppercase font-bold">{item.readTime}</span>
                                        <MdEditNote className="text-black opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                    </div>
                                </div>
                            );
                        }

                        // Standard Image Card (Lookbooks or Secondary Banners)
                        return (
                            <div key={item.id} className="lg:col-span-4 bg-white p-1 group">
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f3]">
                                    <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={item.img} alt={item.title} />
                                    <div className="absolute bottom-6 left-6">
                                        <p className="bg-black text-white px-2 py-1 inline-block font-label text-[9px] uppercase tracking-widest mb-2">{item.tag}</p>
                                        <h4 className="text-white font-headline text-2xl">{item.title}</h4>
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between font-label text-[9px] uppercase tracking-widest font-bold text-[#777777]">
                                    <span>{item.products ? `${item.products} Products` : item.pages ? `${item.pages} Pages` : 'Active'}</span>
                                    <span className={item.status === 'Scheduled' ? 'text-red-600' : 'text-black'}>{item.status}</span>
                                </div>
                            </div>
                        );
                    })}

                    {/* Add New Section (Static) */}
                    <div
                        onClick={handleCreate}
                        className="lg:col-span-4 bg-[#f9f9f9] p-8 flex flex-col justify-center border-dashed border-2 border-[#c6c6c6] text-center group cursor-pointer hover:bg-white transition-all"
                    >
                        <IoMdAddCircle className="text-4xl text-[#c6c6c6] mx-auto mb-4 group-hover:scale-110 group-hover:text-black transition-all" />
                        <p className="font-headline text-2xl mb-2">Create New Section</p>
                        <p className="font-label text-[10px] uppercase tracking-widest text-[#777777]">Campaign or Landing Page</p>
                    </div>
                </div>

                {/* List View for Articles */}
                <section className="mt-24 pb-24">
                    <h2 className="font-headline text-3xl mb-8 italic">Editorial Queue</h2>
                    <div className="flex flex-col gap-px bg-[#eeeeee] border border-[#eeeeee]">
                        {editorialQueue.map((item) => (
                            <div key={item.id} className="bg-white grid grid-cols-12 items-center p-6 hover:bg-[#fcfcfc] transition-colors cursor-pointer group">
                                <div className="col-span-12 lg:col-span-6 flex items-center gap-6 mb-4 lg:mb-0">
                                    <span className="font-label text-xs text-[#c6c6c6] tabular-nums font-bold">{item.id}</span>
                                    <div>
                                        <h5 className="font-label text-xs font-bold uppercase tracking-widest text-black">{item.title}</h5>
                                        <p className="text-[10px] uppercase font-bold text-[#777777]">{item.type}</p>
                                    </div>
                                </div>
                                <div className="col-span-4 lg:col-span-2">
                                    <span className={`font-label text-[9px] uppercase tracking-widest ${item.statusColor}`}>{item.status}</span>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <p className="font-label text-[9px] uppercase tracking-widest text-[#777777]">{item.time}</p>
                                </div>
                                <div className="col-span-2 lg:col-span-1 flex justify-end">
                                    <IoMdArrowForward className="text-[#c6c6c6] group-hover:text-black transition-colors" size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AdminContent;