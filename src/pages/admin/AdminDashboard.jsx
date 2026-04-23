import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory2, MdOutlinePayments, MdOutlineArticle, MdMoreHoriz, MdOutlineLocalShipping, MdOutlineShoppingCart } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5"; // v5 icons
import { IoMdMenu, IoMdClose, IoMdNotificationsOutline, IoMdSearch, IoMdTrendingUp } from "react-icons/io"; // v4 icons
import { TbShoppingBag } from "react-icons/tb";

const AdminDashboard = () => {


    return (
        <div className="flex min-h-screen bg-[#F7F7F5] font-sans selection:bg-black selection:text-white">
            {/* Custom Fonts Injection */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz@1,6..96&family=Inter:wght@300;400;700&display=swap');
                .font-headline { font-family: 'Bodoni Moda', serif; }
                .font-label { font-family: 'Inter', sans-serif; letter-spacing: 0.05em; }
            `}} />


            {/* Main Content Area */}
            <main className="flex-1 md:ml-72 flex flex-col min-w-0">

                {/* Content Canvas */}
                <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 w-full">
                    {/* Header Section */}
                    <section className="flex flex-col md:flex-row justify-between items-end gap-y-4 lg:gap-6">
                        <div className="space-y-2 w-full">
                            <h2 className="font-headline text-5xl lg:text-6xl text-[#1a1c1c]">Performance Summary</h2>
                            <p className="text-[#777777] font-label text-sm tracking-wide">Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <button className="whitespace-nowrap py-3 px-8 bg-black text-[#e5e2e1] text-[11px] uppercase tracking-[0.2em] font-label font-bold transition-all hover:bg-[#333] active:scale-95">
                            Export Data
                        </button>
                    </section>

                    {/* Stat Cards Row */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#eeeeee] border border-[#eeeeee]">
                        {[
                            { label: 'Total Revenue', val: '$128,430', trend: '+12.4% vs LY', icon: <MdOutlinePayments size={24} />, color: 'text-green-600' },
                            { label: 'Active Orders', val: '1,240', trend: 'Steady flow', icon: <MdOutlineLocalShipping size={24} />, color: 'text-[#777777]' },
                            { label: 'Avg. Order Value', val: '$482', trend: '+5.2% trend', icon: <MdOutlineShoppingCart size={24} />, color: 'text-green-600' },
                            { label: 'Conversion Rate', val: '3.8%', trend: '-0.4% vs LW', icon: <IoMdTrendingUp size={24} />, color: 'text-red-600' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white p-8 space-y-4 hover:bg-[#efecec] transition-colors cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-label uppercase tracking-widest text-[#777777]">{stat.label}</span>
                                    <span className="text-[#c6c6c6]">{stat.icon}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-[#1a1c1c] tracking-tight">{stat.val}</p>
                                    <p className={`text-[10px] font-label font-bold uppercase tracking-tighter ${stat.color}`}>{stat.trend}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Main Data Visuals */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white p-8 space-y-8 border border-[#eeeeee]">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-label uppercase tracking-widest font-bold text-[#1a1c1c]">Sales Growth (30D)</h3>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-black block"></span>
                                    <span className="text-[10px] font-label uppercase text-[#777777]">Gross Sales</span>
                                </div>
                            </div>
                            <div className="h-80 w-full relative flex items-end justify-between border-b border-[#eeeeee] pt-4">
                                {[40, 55, 45, 70, 65, 85, 95, 75, 60, 80, 50, 90].map((height, i) => (
                                    <div
                                        key={i}
                                        style={{ height: `${height}%` }}
                                        className="flex-1 bg-[#f3f3f3] mx-1 border-t-2 border-black transition-all hover:bg-black group relative cursor-pointer"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            ${height * 100}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 space-y-8 border border-[#eeeeee]">
                            <h3 className="text-xs font-label uppercase tracking-widest font-bold text-[#1a1c1c]">Top Acquisitions</h3>
                            <div className="space-y-8">
                                {[
                                    { id: 1, name: "Sculpted Wool Blazer", sales: "142 Sales", price: "$1,250", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105" },
                                    { id: 2, name: "Silk Slip Gown", sales: "98 Sales", price: "$890", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=200&h=300" },
                                    { id: 3, name: "Archival Loafers", sales: "74 Sales", price: "$640", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" }
                                ].map((product) => (
                                    <div key={product.id} className="flex items-center space-x-4 group cursor-pointer">
                                        <div className="w-16 h-20 bg-[#f3f3f3] overflow-hidden">
                                            <img
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                src={product.img}
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-label uppercase tracking-widest text-[#1a1c1c] font-bold">{product.name}</p>
                                            <p className="text-[10px] text-[#777777]">{product.sales}</p>
                                        </div>
                                        <p className="text-xs font-bold text-[#1a1c1c]">{product.price}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-4 border border-[#eeeeee] text-[10px] uppercase tracking-[0.2em] font-label hover:bg-black hover:text-white transition-all text-[#1a1c1c]">
                                View All Products
                            </button>
                        </div>
                    </section>

                    {/* Recent Orders Table */}
                    <section className="bg-white p-8 space-y-8 border border-[#eeeeee]">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-xs font-label uppercase tracking-widest font-bold text-[#1a1c1c]">Recent Acquisitions</h3>
                            <div className="flex space-x-4 text-[10px] font-label uppercase tracking-widest text-[#c6c6c6]">
                                <span className="text-black border-b border-black cursor-pointer pb-1">Pending</span>
                                <span className="hover:text-black cursor-pointer transition-colors pb-1">Shipped</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead>
                                    <tr className="text-[10px] font-label uppercase tracking-widest text-[#777777] border-b border-[#eeeeee]">
                                        <th className="pb-4 font-normal">Order ID</th>
                                        <th className="pb-4 font-normal">Client</th>
                                        <th className="pb-4 font-normal">Date</th>
                                        <th className="pb-4 font-normal">Status</th>
                                        <th className="pb-4 font-normal">Amount</th>
                                        <th className="pb-4 font-normal text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f9f9f9]">
                                    {[
                                        { id: '#VR-88210', client: 'Elena Vance', date: '24 Oct, 2026', status: 'Processing', amount: '$2,450.00', seed: 'Elena' },
                                        { id: '#VR-88209', client: 'Julian Marx', date: '23 Oct, 2026', status: 'Awaiting Ship', amount: '$1,890.00', seed: 'Julian' },
                                    ].map((order) => (
                                        <tr key={order.id} className="group hover:bg-[#f9f9f9] transition-colors">
                                            <td className="py-6 text-xs font-bold text-[#1a1c1c]">{order.id}</td>
                                            <td className="py-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-[#eeeeee] rounded-full overflow-hidden">
                                                        <img className="w-full h-full object-cover grayscale" src={`https://api.dicebear.com/7.x/initials/svg?seed=${order.seed}`} alt={order.client} />
                                                    </div>
                                                    <span className="text-xs font-label text-[#1a1c1c]">{order.client}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 text-xs text-[#777777]">{order.date}</td>
                                            <td className="py-6">
                                                <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-1 bg-[#f3f3f3] text-[#1a1c1c]">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-6 text-xs font-bold text-[#1a1c1c]">{order.amount}</td>
                                            <td className="py-6 flex justify-end mr-2 ">
                                                <span className="text-[#c6c6c6] cursor-pointer hover:text-black transition-colors"><MdMoreHoriz size={23} /></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

            </main>
        </div>
    );
};

export default AdminDashboard;