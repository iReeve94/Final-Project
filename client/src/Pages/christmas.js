import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemComponent from '../components/itemComponent';
import { jwtDecode } from 'jwt-decode';
import Modal from 'react-modal';



const ChristmasPage = () => {
    const [specials, setSpecials] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { category } = useParams();
  
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
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/category/${category}`);
          setSpecials(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [category]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    
        const storedItems = JSON.parse(localStorage.getItem(`cartItems_${decoded?.id}`)) || [];
        localStorage.setItem(`cartItems_${decoded?.id}`, JSON.stringify([...storedItems, item]));
    
        // Open the modal
        setIsModalOpen(true);
      };
    
      const goToCart = () => {
        // Update window location to the cart page
        window.location.href = '/cart';
      };


      return (
        <div>
         {specials.map((item) => {
      console.log("Item before rendering ItemComponent:", item);
      return <ItemComponent key={item._id} item={item} addToCart={addToCart} />;
    })}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Item added to cart"
            style={{
              content: {
                width: '50%', 
                margin: 'auto',
              },
            }}
          >
            <p>Item added to cart!</p>
            <button onClick={goToCart}>Go to Cart</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </Modal>
        </div>
      );
    };
    
    export default ChristmasPage;