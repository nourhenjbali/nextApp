import React, { useState } from "react";
import "../styles/ProductList.scss";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const [productQuantities, setProductQuantities] = useState<{
    [key: number]: number;
  }>({});

  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <div className="product-info">
                <span>
                  {product.name} - ${product.price}
                </span>
                <button
                  onClick={() =>
                    onAddToCart(product, productQuantities[product.id] || 1)
                  }
                >
                  Add to Cart
                </button>
              </div>
              <input
                type="number"
                value={productQuantities[product.id] || 1}
                onChange={(e) =>
                  setProductQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [product.id]: parseInt(e.target.value) || 1,
                  }))
                }
                className="quantity-input"
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default ProductList;
