import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts ,addItemToCart } from "../redux/actions";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductsState {
  list: Product[];
}

export interface RootState {
  products: ProductsState;
}

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  const cartItems = useSelector((state: any) => state.cart);

  useEffect(() => {
    const fetchedProducts = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
      { id: 3, name: "Product 3", price: 50 },
      { id: 4, name: "Product 4", price: 60 },
      { id: 5, name: "Product 5", price: 30 },
    ];

    dispatch(setProducts(fetchedProducts));
    console.log(products);
  }, [dispatch]);

  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addItemToCart({ ...product, quantity }));
  };

  return (
    <div>
      <h1>Product Listing Page</h1>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <ShoppingCart cartItems={cartItems} />

    </div>
  );
};

export default ProductsPage;
