import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        localStorage.removeItem('token');  // Supprimer le jeton du stockage local
        navigate('/login');  // Rediriger vers la page de connexion
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/admin">Gestion Users</Link>
        </li>
        <li>
          <Link to="/admin/hotels">Gestion Hôtels</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
