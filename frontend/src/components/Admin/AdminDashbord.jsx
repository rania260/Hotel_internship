import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:5000/getallusers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!userId) {
      console.error("Error: User ID is undefined or null.");
      return;
    }

    console.log('Attempting to delete user with ID:', userId);  // Ajout d'un log pour vérifier l'ID

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.delete(`http://127.0.0.1:5000/getallusers/delete/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 204) {
        setUsers(users.filter(user => user._id !== userId));
        console.log('User deleted successfully');
      } else {
        console.log('Error in response:', response.data);
      }
    } catch (error) {
      console.error('Error while deleting user:', error.response ? error.response.data : error.message);
    }
  };


  const handleAddUser = () => {
    navigate('/admin/add-user');
  };

  const handleUpdate = (user) => {
    navigate(`/admin/update-user/${user._id}`);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center my-4">
            <h1>User Management</h1>
            <Button variant="primary" onClick={handleAddUser}>
              Add New User
            </Button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afficher l'erreur */}

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                console.log(user);  // Ajout de ce log pour inspecter les objets utilisateur
                return (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleUpdate(user)}>
                        Update
                      </Button>{' '}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
