import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory2, MdOutlinePayments, MdOutlineArticle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { name: 'Overview', path: '/admin', icon: <LuLayoutDashboard /> },
        { name: 'Catalog', path: '/admin/catalog', icon: <MdOutlineInventory2 /> },
        { name: 'Sales', path: '/admin/sales', icon: <MdOutlinePayments /> },
        { name: 'Content', path: '/admin/content', icon: <MdOutlineArticle /> },
        { name: 'Settings', path: '/admin/settings', icon: <IoSettingsOutline /> },
    ];

    return (
        <>
            {/* Overlay: Fixed visibility logic */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed top-0 bottom-0 left-0 z-[70] h-screen transition-transform duration-300 ease-in-out bg-[#0D0D0D] text-white flex flex-col w-72 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

                {/* Header */}
                <div className="p-8 border-b border-white/10 flex justify-between items-center">
                    <div>
                        <span className="font-headline text-3xl italic tracking-widest block uppercase">VOIRE</span>
                        <span className="text-[10px] font-label uppercase tracking-widest text-[#777777] mt-2 block">
                            Editorial Intelligence
                        </span>
                    </div>
                    <button className="md:hidden text-white p-1 hover:bg-white/10 rounded" onClick={() => setSidebarOpen(false)}>
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)} // Close on link click (mobile)
                            className={({ isActive }) =>
                                `w-full flex items-center space-x-4 px-4 py-3 transition-all duration-300 group ${isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-[#777777] hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="text-[20px]">{item.icon}</span>
                            <span className="text-sm tracking-widest uppercase font-label">
                                {item.name}
                            </span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-8 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-[#1a1c1c] rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                            <img
                                className="object-cover w-full h-full opacity-80"
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                                alt="Admin Profile"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-label uppercase tracking-widest text-white truncate">Director</p>
                            <p className="text-[10px] text-[#777777] cursor-pointer hover:text-white transition-colors">Sign Out</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;