import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from "../features/cart/cartTrunks.js"
import { fetchOrdersThunk } from "../features/oders/orderTrunk.js";

// Layouts 
import Layout from "../components/layout/Layout";

// User Pages 
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ReviewOrder from "../pages/ReviewOrder";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";

// 404 page 
import NotFoundPage from "../pages/NotFoundPage";

// Admin Pages 
import AdminLayout from "../components/admin/Layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCatalog from "../pages/admin/AdminCatalog";
import AdminSales from "../pages/admin/AdminSales";
import AdminContent from "../pages/admin/AdminContent";
import AdminSetting from "../pages/admin/AdminSetting";
import AddProduct from "../pages/admin/AddProduct";
import AddCategory from "../pages/admin/AddCategory";
import AddCollection from "../pages/admin/AddCollection";

import AdminNotFound from "../pages/admin/AdminNotFound";

// Middlewares 
import AuthProtected from "../middlewares/authProtected";



export default function App() {

    const dispatch = useDispatch();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        dispatch(fetchCart());
        dispatch(fetchOrdersThunk());
    }, [dispatch, token]);

    return (
        <BrowserRouter>
            <Routes>

                {/* Auth page (no layout) */}
                <Route path="/auth" element={<Auth />} />


                {/* Layout wrapper */}
                < Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    {/* Collections  */}
                    <Route path="/collections" element={<CategoryPage />} />
                    <Route path="/collections/:gender" element={<CategoryPage />} />
                    <Route path="/collections/:gender/:subCategory" element={<CategoryPage />} />

                    <Route path="/product/:id" element={<ProductDetail />} />
                    {/* auth middleware */}
                    <Route path="/profile" element={<AuthProtected><Profile /></AuthProtected>} />
                    {/* Checkout flow */}
                    <Route path="/cart" element={<AuthProtected><Cart /></AuthProtected>} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/review" element={<ReviewOrder />} />

                    {/* 404 Page  */}
                    <Route path="*" element={<NotFoundPage />} />

                </ Route>

                {/* Admin Layout  */}
                <Route element={<AdminLayout />}>
                    <Route path="/admin/overview" element={<AdminDashboard />} />
                    <Route path="/admin/catalog" element={<AdminCatalog />} />
                    <Route path="/admin/sales" element={<AdminSales />} />
                    <Route path="/admin/content" element={<AdminContent />} />
                    <Route path="/admin/settings" element={<AdminSetting />} />

                    {/* Admin 404 page */}
                    <Route path="*" element={<AdminNotFound />} />
                </Route>

                <Route path="/admin/products/add" element={<AddProduct />} />
                <Route path="/admin/products/edit/:id" element={<AddProduct />} />
                <Route path="/admin/Categories/add" element={<AddCategory />} />
                <Route path="/admin/Categories/edit/:id" element={<AddCategory />} />
                <Route path="/admin/Collections/add" element={<AddCollection />} />
                <Route path="/admin/Collections/edit/:id" element={<AddCollection />} />
            </Routes>
        </BrowserRouter>
    );
}