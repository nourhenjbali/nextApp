import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateQuantity } from "../redux/actions";
import "../styles/ShoppingCart.scss";
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
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const clampedQuantity = Math.max(newQuantity, 0);
    if (clampedQuantity === 0) {
      handleRemoveFromCart(itemId);
    } else {
      dispatch(updateQuantity({ id: itemId, quantity: clampedQuantity }));
    }
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h2>
          <ShoppingCartIcon
            style={{ fontSize: "1.5em", marginRight: "0.5em" }}
          />
          Shopping Cart
        </h2>
      </div>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div className="cart-item-info">
              <span>
                {item.name} - Quantity: {item.quantity} - $
                {item.price * item.quantity}
              </span>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove from Cart
              </button>
            </div>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value))
              }
            />
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
    </div>
  );
};

export default ShoppingCart;
