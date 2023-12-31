import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  setProducts,
  addItemToCart,
  removeItemFromCart,
  updateQuantity,
} from "./actions";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface RootState {
  products: Product[];
  cart: CartItem[];
}

const initialState: RootState = {
  products: [],
  cart: [],
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProducts, (state, action: PayloadAction<Product[]>) => {
      console.log("Reducer  Setting Products:", action.payload);
      state.products = action.payload;
    })
    .addCase(addItemToCart, (state, action: PayloadAction<CartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push(action.payload);
      }
    })
    .addCase(removeItemFromCart, (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    })
    .addCase(
      updateQuantity,
      (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const { id, quantity } = action.payload;
        const existingItem = state.cart.find((item) => item.id === id);

        if (existingItem) {
          existingItem.quantity = quantity;
        }
      }
    );
});

export default rootReducer;
