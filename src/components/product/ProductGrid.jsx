import React from 'react';
import ProductCard from './ProductCard';



const ProductGrid = ({ products }) => {

    if (!products || products.length === 0) {
        return (
            <div className="w-full py-20 text-center">
                <p className="text-gray-500">No products found in this category.</p>
            </div>
        );
    }

    return (
        <section className="w-full px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;