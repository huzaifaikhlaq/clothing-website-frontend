import React from 'react';

const ProductInfo = ({ title, price, originalPrice }) => {
    // Format currency
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
        }).format(amount);
    };

    return (
        <div className="mt-4 flex flex-col items-start space-y-1">
            <h3 className="text-sm font-medium text-gray-900 italic">
                {title}
            </h3>

            <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-black">
                    {formatPrice(price)}
                </span>


                {originalPrice !== null && (
                    <span className="text-xs text-gray-400 line-through">
                        {formatPrice(originalPrice)}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;