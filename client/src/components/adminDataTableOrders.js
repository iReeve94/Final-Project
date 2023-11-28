import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';

const OrderDataTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showShippingDetails, setShowShippingDetails] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/orders');
      setOrders(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/orders/${orderId}`);
      fetchOrders(); // Refresh orders after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const openItemDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeItemDetails = () => {
    setSelectedOrder(null);
  };

  const openShippingDetails = () => {
    setShowShippingDetails(true);
  };

  const closeShippingDetails = () => {
    setShowShippingDetails(false);
  };

  const columns = [
    {
      name: 'Order ID',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'Customer ID',
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: 'Total Amount',
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: 'Payment Status',
      selector: (row) => row.payment_status,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button onClick={() => openItemDetails(row)}>Item Details</button>
          <button onClick={() => handleDeleteOrder(row._id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Orders List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <DataTable columns={columns} data={orders} pagination paginationPerPage={15} />
          <Modal
            isOpen={!!selectedOrder}
            onRequestClose={closeItemDetails}
            contentLabel="Item Details"
          >
            {selectedOrder && (
              <div>
                <h2>Item Details</h2>
                <ul>
                  {selectedOrder.products.map((product, index) => (
                    <li key={index}>
                      <div>
                        <strong>Title:</strong> {product.title}
                      </div>
                      <div>
                        <strong>Price:</strong> {product.price}
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={closeItemDetails}>Close</button>
                <button onClick={openShippingDetails}>Show Shipping Details</button>
              </div>
            )}
          </Modal>
          <Modal
  isOpen={showShippingDetails}
  onRequestClose={closeShippingDetails}
  contentLabel="Shipping Details"
>
  {selectedOrder && (
    <div>
      <h2>Shipping Details</h2>
      <div>
        <strong>City:</strong> {selectedOrder.shipping.address.city || 'N/A'}
      </div>
      <div>
        <strong>Country:</strong> {selectedOrder.shipping.address.country || 'N/A'}
      </div>
      <div>
        <strong>Line 1:</strong> {selectedOrder.shipping.address.line1 || 'N/A'}
      </div>
      <div>
        <strong>Line 2:</strong> {selectedOrder.shipping.address.line2 || 'N/A'}
      </div>
      <div>
        <strong>Postal Code:</strong> {selectedOrder.shipping.address.postal_code || 'N/A'}
      </div>
      <div>
        <strong>State:</strong> {selectedOrder.shipping.address.state || 'N/A'}
      </div>
      <div>
        <strong>Name:</strong> {selectedOrder.shipping.name || 'N/A'}
      </div>
      <button onClick={closeShippingDetails}>Close</button>
    </div>
  )}
</Modal>
        </>
      )}
    </div>
  );
};

export default OrderDataTable;