import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/layout/Layout";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    {/* <Route path="/:category" element={<CategoryPage />} /> */}
                    <Route path="/" element={<ProductPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
