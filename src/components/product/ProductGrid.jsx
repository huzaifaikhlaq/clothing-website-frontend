import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onEdit, onDelete, isAdmin = true }) => {
    if (!products || products.length === 0) {
        return (
            <div className="w-full py-20 text-center bg-white border border-[#eeeeee]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">
                    No products found in this category.
                </p>
            </div>
        );
    }

    return (
        <section className="w-full py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {products.map((item) => (
                    <ProductCard
                        key={item._id || item.id}
                        product={item}
                        isAdmin={isAdmin}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;