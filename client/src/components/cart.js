import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import CheckoutButton from './checkoutButton';
 import "./cart.css";

const Cart = () => {
  let token;
  let decoded;
  try {
    token = localStorage.getItem('token');

    if (token) {
      decoded = jwtDecode(token);
    }
  } catch (error) {
    console.log('Invalid token', error);
  }

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem(`cartItems_${decoded?.id}`)) || []
  );

  const updateCart = (updatedCartItems) => {
    setCartItems(updatedCartItems);
    localStorage.setItem(`cartItems_${decoded?.id}`, JSON.stringify(updatedCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(`cartItems_${decoded?.id}`);
  };

  const removeFromCart = (itemId) => {
    
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
  
    
    updateCart(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
  }, [cartItems]);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>€{item.price}</p>
              <img className='imgedit2' src={item.imageUrl} alt={item.title} />
              <button id='remove' onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <p>Total Price: €{calculateTotalPrice()}</p>
          <CheckoutButton cartItems={cartItems} />
          <button id='clear' onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;