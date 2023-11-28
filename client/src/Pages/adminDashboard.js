import React from 'react';
import AdminDataTable from '../components/adminDataTable';
import AddItem from '../components/createItem'; 
import OrderDataTable from '../components/adminDataTableOrders';

const AdminDashboard = () => {
  return (
    <div>
      <AddItem />
      <AdminDataTable />
    </div>
  );
};

export default AdminDashboard;