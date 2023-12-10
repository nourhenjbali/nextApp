import React, { useState } from 'react';

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
  const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({});

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => onAddToCart(product, productQuantities[product.id] || 1)}>
                Add to Cart
              </button>
              <input
                type="number"
                value={productQuantities[product.id] || 1}
                onChange={(e) =>
                  setProductQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [product.id]: parseInt(e.target.value) || 1,
                  }))
                }
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;

