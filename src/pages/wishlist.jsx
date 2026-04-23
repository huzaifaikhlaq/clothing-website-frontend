import { useState } from "react";
import ProductGrid from "../components/product/ProductGrid";

const Wishlist = ({ handleAddToCart }) => {

    const [wishlist1, setwishlist1] = useState([
        {
            id: 1,
            title: "Heavy Knit Sweater",
            price: 185,
            color: "Charcoal Melange",
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633"
        },
        {
            id: 2,
            title: "Square Toe Boot",
            price: 560,
            color: "Oxblood Leather",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"
        }
    ]);

    return (
        <div>
            <div >

                < ProductGrid products={wishlist1} layout="grid" />

            </div>
        </div>
    );
};

export default Wishlist;