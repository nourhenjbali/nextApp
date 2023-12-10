import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;

}

const ProductList: React.FC<ProductListProps> = ({ products ,onAddToCart  }) => {
    return (
      <div>
        <h2>Products</h2>
        <ul>
          {products && products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => onAddToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default ProductList;
