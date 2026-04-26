import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdMenu, IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { TbShoppingBag } from "react-icons/tb";

const AdminNavbar = ({ setSidebarOpen }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();

    const getPageName = () => {
        const path = location.pathname;
        if (path === "/admin") return "Overview";
        if (path.includes("/catalog")) return "Catalog";
        if (path.includes("/sales")) return "Sales";
        if (path.includes("/content")) return "Content";
        if (path.includes("/settings")) return "Settings";
        return "404";
    };

    return (
        <header className="bg-white/80 backdrop-blur-md fixed top-0 right-0 left-0 md:left-72 z-40 px-6 py-4 flex justify-between items-center border-b border-[#eeeeee]">
            <div className="flex items-center space-x-4">
                {/* Fixed the trigger here */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden text-[#1a1c1c] p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Open Menu"
                >
                    <IoMdMenu size={26} />
                </button>

                <h1 className="font-label uppercase tracking-widest text-[10px] md:text-[11px] font-bold text-[#1a1c1c]">
                    Admin / <span className="text-[#c6c6c6]">{getPageName()}</span>
                </h1>
            </div>

            {/* Right side remains same... */}
            <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center bg-[#f3f3f3] px-3 py-1.5 gap-2 border border-transparent focus-within:border-black transition-all">
                    <IoMdSearch className="text-[#777777]" size={18} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-xs w-40 font-label outline-none"
                        placeholder="Search..."
                        type="text"
                    />
                </div>
                <IoMdNotificationsOutline className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
                <TbShoppingBag className="text-2xl cursor-pointer hover:opacity-60 transition-opacity" />
            </div>
        </header>
    );
};

export default AdminNavbar;