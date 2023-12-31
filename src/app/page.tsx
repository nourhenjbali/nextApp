"use client";
import ProductsPage from "./pages/products";
import { Provider } from "react-redux";
import store from "./redux/store";
export default function Home() {
  return (
    <Provider store={store}>
      <ProductsPage />
    </Provider>
  );
}
