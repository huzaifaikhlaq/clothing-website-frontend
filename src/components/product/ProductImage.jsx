import React from 'react';

const ProductImage = ({ src, alt, badgeLabel }) => {
    return (
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">

            {badgeLabel && (
                <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 z-10">
                    {badgeLabel}
                </span>
            )}

            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
        </div>
    );
};

export default ProductImage;