import React, { useState, useRef, useEffect } from 'react';
import './itemComponent.css';

const ItemComponent = ({ item, addToCart }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modalRef = useRef();

  // Close the modal if clicked outside of it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    // Attach event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Detach event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className='container'>
      <div className='wrapper' key={item._id}>
        <div className='check'>
          <img
            className='imgedit'
            src={item.imageUrl}
            alt={item.title}
            onClick={openModal}
          />
          <div className='info'>
            <div className='item-text'>
              <h3 className='title'>{item.title}</h3>
              <p className='description'>{item.description}</p>
              <p className='price'>Price €: {item.price}</p>
            </div>
          </div>
          <button className='add-to-cart' onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>

      {modalOpen && (
        <div id='itemModal' className='modal' ref={modalRef}>
          <div className='modal-content'>
            <img src={item.imageUrl} alt={item.title} />
            <p>{item.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemComponent;