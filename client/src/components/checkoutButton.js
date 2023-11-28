import React, { useState } from 'react';
import axios from 'axios';


const CheckoutButton = ({ cartItems }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  let token = localStorage.getItem("token");
  const handleCheckout = async () => {
    try {
      // Set loading state
      setIsCheckingOut(true);

      if (!cartItems || cartItems.length === 0) {
        console.error('Cart is empty. Add items to cart before checkout.');
        return;
      }

      const lineItems = cartItems.map(item => {
        if (item.stripePriceId) {
          return { price: item.stripePriceId, quantity: 1 };
        } else {
          return {
            price_data: {
              currency: 'euro', // Change this to the appropriate currency
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100), // Stripe requires the amount in cents
            },
            quantity: 1,
          };
        }
      });
      console.log(cartItems);
      const response = await axios.post('http://localhost:8000/create-checkout-session', 
        cartItems, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log(response.data);
      // Redirect to the Stripe Checkout page
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error initiating checkout:', error.message);
      // Display an error message to the user
    } finally {
      // Reset loading state
      setIsCheckingOut(false);
    }
  };

  return (
    <div>
      <button id='checkout' onClick={handleCheckout} disabled={isCheckingOut}>
        {isCheckingOut ? 'Checking Out...' : 'Checkout'}
      </button>
      <p>If you encounter any issues, please contact support.</p>
    </div>
  );
};

export default CheckoutButton;