import React, { useState } from "react";
// Correct Icon Imports
import { IoMdMore, IoMdAdd, IoMdCheckmarkCircle, IoMdAlert } from "react-icons/io";

const AdminSetting = () => {
    // State for interactive toggles
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);
    const [debugMode, setDebugMode] = useState(false);

    return (
        <main className="md:ml-72 bg-[#F7F7F5] min-h-screen">
            <div className='px-6 md:px-12 pb-6 max-w-[1400px] mx-auto'>
                <header className="mb-12">
                    <h1 className="text-5xl font-headline tracking-tight mb-2 text-[#1a1c1c]">Settings</h1>
                    <p className="text-[#777777] font-label text-xs uppercase tracking-widest">
                        Manage your store configurations, team permissions, and financial architecture.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Settings Column */}
                    <section className="lg:col-span-8 space-y-20">

                        {/* Store Information */}
                        <div className="space-y-8">
                            <div className="border-b border-[#eeeeee] pb-4">
                                <h3 className="text-xl font-headline italic tracking-tight">Store Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#777777]">Legal Store Name</label>
                                    <input
                                        className="w-full bg-white border-0 border-b border-[#eeeeee] focus:border-black focus:ring-0 transition-all px-0 py-3 text-xs font-bold tracking-widest uppercase outline-none"
                                        type="text"
                                        defaultValue="VOIRE ATELIER"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#777777]">Reporting Currency</label>
                                    <select className="w-full bg-white border-0 border-b border-[#eeeeee] focus:border-black focus:ring-0 transition-all px-0 py-3 text-xs font-bold tracking-widest uppercase appearance-none outline-none cursor-pointer">
                                        <option>USD ($) - US Dollar</option>
                                        <option>EUR (€) - Euro</option>
                                        <option>GBP (£) - British Pound</option>
                                    </select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#777777]">Support Email</label>
                                    <input
                                        className="w-full bg-white border-0 border-b border-[#eeeeee] focus:border-black focus:ring-0 transition-all px-0 py-3 text-xs font-bold tracking-widest outline-none"
                                        type="email"
                                        defaultValue="concierge@voire-atelier.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Team Management */}
                        <div className="space-y-8">
                            <div className="border-b border-[#eeeeee] pb-4 flex justify-between items-end">
                                <h3 className="text-xl font-headline italic tracking-tight">Team Management</h3>
                                <button className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-[#777777] transition-colors flex items-center gap-1">
                                    <IoMdAdd /> Invite Member
                                </button>
                            </div>
                            <div className="space-y-2">
                                {[
                                    { name: "Julian Vane", role: "Creative Director • Owner", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
                                    { name: "Elena Moretti", role: "Inventory Specialist • Editor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" }
                                ].map((member, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-white border border-[#f0f0f0] group hover:border-black transition-all cursor-pointer">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-[#f3f3f3] overflow-hidden rounded-full">
                                                <img className="w-full h-full object-cover grayscale" src={member.img} alt={member.name} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest">{member.name}</p>
                                                <p className="text-[9px] uppercase tracking-[0.15em] text-[#777777]">{member.role}</p>
                                            </div>
                                        </div>
                                        <IoMdMore size={20} className="text-[#c6c6c6] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Billing & Subscription */}
                        <div className="space-y-8">
                            <div className="border-b border-[#eeeeee] pb-4">
                                <h3 className="text-xl font-headline italic tracking-tight">Billing & Subscription</h3>
                            </div>
                            <div className="bg-white p-10 border border-[#eeeeee] space-y-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#777777] mb-2">Current Plan</p>
                                        <h4 className="text-3xl font-headline">Enterprise Editorial</h4>
                                    </div>
                                    <span className="px-4 py-1.5 bg-black text-[9px] text-white uppercase tracking-widest font-bold">Active</span>
                                </div>
                                <div className="flex items-center gap-16">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-[#777777] mb-1">Next Invoice</p>
                                        <p className="text-xs font-bold uppercase tracking-widest">October 12, 2024</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-[#777777] mb-1">Amount</p>
                                        <p className="text-xs font-bold uppercase tracking-widest">$420.00</p>
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-[#f9f9f9] flex gap-4">
                                    <button className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors">Change Plan</button>
                                    <button className="border border-[#eeeeee] px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#f9f9f9] transition-colors">View Invoices</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sidebar Column */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Global Controls */}
                        <div className="p-8 bg-white border border-[#eeeeee] space-y-8">
                            <h3 className="text-lg font-headline italic tracking-tight">Global Controls</h3>
                            <div className="space-y-8">
                                {[
                                    { label: "Maintenance Mode", sub: "Disable public access", state: maintenanceMode, fn: setMaintenanceMode },
                                    { label: "Two-Factor Auth", sub: "Mandatory for all staff", state: twoFactor, fn: setTwoFactor },
                                    { label: "Debug Logging", sub: "Capture system events", state: debugMode, fn: setDebugMode }
                                ].map((control, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest">{control.label}</p>
                                            <p className="text-[9px] text-[#777777] uppercase tracking-wide">{control.sub}</p>
                                        </div>
                                        <div
                                            onClick={() => control.fn(!control.state)}
                                            className={`w-10 h-5 transition-colors duration-300 flex items-center px-0.5 cursor-pointer ${control.state ? 'bg-black' : 'bg-[#eeeeee]'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white shadow-sm transition-transform duration-300 ${control.state ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Storage Usage */}
                        <div className="space-y-4 px-2">
                            <h3 className="text-lg font-headline italic tracking-tight">Storage Usage</h3>
                            <div className="bg-[#eeeeee] h-0.5 w-full">
                                <div className="bg-black h-full w-[65%] transition-all duration-1000"></div>
                            </div>
                            <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                                <span>1.4 GB used</span>
                                <span className="text-[#777777]">2 GB Limit</span>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="border border-red-200 p-8 space-y-6 bg-red-50/30">
                            <div className="flex items-center gap-2 text-red-600">
                                <IoMdAlert size={18} />
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Danger Zone</h3>
                            </div>
                            <p className="text-[9px] text-[#777777] leading-relaxed uppercase tracking-widest">
                                Deleting the store will permanently erase all catalog data, orders, and customer profiles. This action cannot be undone.
                            </p>
                            <button className="w-full py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-all">
                                Terminate Store
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default AdminSetting;