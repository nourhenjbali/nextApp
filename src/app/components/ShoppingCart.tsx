// ShoppingCart.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../redux/actions';
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface ShoppingCartProps {
  cartItems: CartItem[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems }) => {
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItemFromCart(itemId));
  };

  // Use useEffect to update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - ${item.price * item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
    </div>
  );
};

export default ShoppingCart;

