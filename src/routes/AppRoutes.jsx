import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts 
import Layout from "../components/layout/Layout";

// User Pages 
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import PaymentPage from "../pages/PaymentPage";
import ReviewOrder from "../pages/ReviewOrder";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";

// 404 page 
import NotFoundPage from "../pages/NotFoundedPage";

// Admin Pages 
import AdminLayout from "../components/admin/Layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCatalog from "../pages/admin/AdminCatalog";
import AdminSales from "../pages/admin/AdminSales";
import AdminContent from "../pages/admin/AdminContent";
import AdminSetting from "../pages/admin/AdminSetting";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Auth page (no layout) */}
                {/* <Route path="/" element={<Auth />} /> */}


                {/* Layout wrapper */}
                < Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    {/* Collections  */}
                    <Route path="/collections" element={<CategoryPage />} />
                    <Route path="/collections/:gender" element={<CategoryPage />} />
                    <Route path="/collections/:gender/:subCategory" element={<CategoryPage />} />
                    
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Checkout flow */}
                    {/* <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/review" element={<ReviewOrder />} /> */}

                    {/* 404 Page  */}
                    <Route path="*" element={<NotFoundPage/>} />

                </ Route>

                {/* Admin Layout  */}
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/catalog" element={<AdminCatalog />} />
                    <Route path="/admin/sales" element={<AdminSales />} />
                    <Route path="/admin/content" element={<AdminContent />} />
                    <Route path="/admin/settings" element={<AdminSetting />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}