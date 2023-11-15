import React from 'react';

const ItemComponent = ({ item }) => (
  <div key={item._id}>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <p>Price: {item.price}</p>
    {/* Add more item details as needed */}
  </div>
);

export default ItemComponent;