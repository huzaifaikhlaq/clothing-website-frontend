import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const ProductCard = ({ product }) => {

    return (
        <Link to={`/product/${product.id}`} className="group cursor-pointer flex flex-col">
            <ProductImage
                src={product.image}
                alt={`Image of ${product.title}`}
                badgeLabel={product.badge}
            />

            <ProductInfo
                title={product.title}
                description={product.description}
                price={product.price}
                originalPrice={product.originalPrice}
            />
        </Link>
    );
};

export default ProductCard;