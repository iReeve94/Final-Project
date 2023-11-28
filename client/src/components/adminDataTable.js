import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const AdminDataTable = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({
    id: null,
    title: '',
    price: '',
    description: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/');
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const columns = [
    {
      name: 'Image',
      cell: (row) => <img src={row.imageUrl} alt={row.title} style={{ maxWidth: '50px', maxHeight: '50px' }} />,
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row._id)}>Delete</button>
        </>
      ),
    },
  ];

  const handleEdit = (row) => {
    setEditItem({
      id: row._id,
      title: row.title,
      price: row.price,
      description: row.description,
    });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/${editItem.id}`, {
        title: editItem.title,
        price: editItem.price,
        description: editItem.description,
      });

      fetchData(); // Fetch data after edit

      setEditItem({
        id: null,
        title: '',
        price: '',
        description: '',
      });
    } catch (error) {
      console.error('Error editing item', error);
    }
  };

  const handleCancelEdit = () => {
    setEditItem({
      id: null,
      title: '',
      price: '',
      description: '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/${id}`);
      fetchData(); // Fetch data after delete
    } catch (error) {
      console.log('Error deleting item', error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <DataTable
        columns={columns}
        data={items}
        pagination
        paginationPerPage={20} 
        paginationRowsPerPageOptions={[20, 50, 100]} 
      />
      {editItem.id && (
        <div>
          <h2>Edit Item</h2>
          <label>Title:</label>
          <input
            type="text"
            value={editItem.title}
            onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
          />
          <label>Price:</label>
          <input
            type="text"
            value={editItem.price}
            onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
          />
          <label>Description:</label>
          <input
            type="text"
            value={editItem.description}
            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
          />
          <button onClick={handleEditSubmit}>Submit Edit</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminDataTable;