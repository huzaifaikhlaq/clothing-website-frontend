import React from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const ProductCard = ({ product }) => {

    return (
        <article className="group cursor-pointer flex flex-col">
            <ProductImage
                src={product.image}
                alt={`Image of ${product.title}`}
                badgeLabel={product.badge}
            />

            <ProductInfo
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
            />
        </article>
    );
};

export default ProductCard;