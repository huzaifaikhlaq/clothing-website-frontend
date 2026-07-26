import React from 'react';

const ProductInfo = ({ title, subtitle, gender, price, originalPrice }) => {

    // Format currency safely
    const formatPrice = (amount) => {
        if (amount === undefined || amount === null || isNaN(amount)) return '';
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            maximumFractionDigits: 0, // Removes decimal places if preferred
        }).format(amount);
    };

    // Determine if we should show the original slashed price
    const hasOriginalPrice = originalPrice && Number(originalPrice) > 0 && Number(originalPrice) > Number(price);

    return (
        <div className="mt-4 flex flex-col items-start space-y-1">
            <h3 className="text-sm font-medium text-gray-900 italic">
                {title}
            </h3>

            <div className="text-xs text-gray-400 flex items-center space-x-1">
                {subtitle && <p>{subtitle}</p>}
                {subtitle && gender && <span>|</span>}
                {gender && <p className="capitalize">{gender}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-1">
                {/* Active Selling Price */}
                <span className="text-sm font-semibold text-black">
                    {formatPrice(price)}
                </span>

                {/* Strikethrough Price (Only shown when originalPrice exists and is greater than current price) */}
                {hasOriginalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                        {formatPrice(originalPrice)}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;