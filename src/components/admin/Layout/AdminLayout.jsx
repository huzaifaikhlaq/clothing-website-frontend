import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. Sidebar remains fixed */}
            <AdminSidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* 2. Main Wrapper - This pushes the content on desktop */}
            <div className="flex flex-col  transition-all duration-500">

                {/* Navbar */}
                <AdminNavbar setSidebarOpen={setSidebarOpen} />

                {/* Page Content */}
                <main className="pt-24">
                    <Outlet />
                </main>

                {/* Footer */}
                <div className='md:pl-72'>
                    <AdminFooter />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;