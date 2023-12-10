import { createAction } from '@reduxjs/toolkit';
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


export const setProducts = createAction<Product[]>('setProducts');
export const addItemToCart = createAction<CartItem>('addItemToCart');
export const removeItemFromCart = createAction<number>('removeItemFromCart');
export const updateQuantity = createAction<{ id: number; quantity: number }>('updateQuantity');
