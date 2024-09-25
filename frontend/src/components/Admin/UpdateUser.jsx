import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:5000/getallusers/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUsername(response.data.username);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`http://127.0.0.1:5000/getallusers/update/${id}`, 
        { username, email, role },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      navigate('/admin'); // Redirect to AdminDashboard after updating
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <Container>
      <h1>Update User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update User
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateUser;
