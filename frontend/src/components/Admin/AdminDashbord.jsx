import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './adminDashbord.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
