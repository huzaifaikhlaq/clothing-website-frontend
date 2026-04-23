import { Outlet } from "react-router-dom";
import Header from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />   
            <Footer />
        </>
    );
};

export default Layout;