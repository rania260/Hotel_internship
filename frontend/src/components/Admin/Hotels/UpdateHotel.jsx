import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateHotel = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:5000/hotels/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const hotel = response.data;

        // Set the hotel data into state variables
        setTitle(hotel.title || '');
        setCity(hotel.city || '');
        setAddress(hotel.address || '');
        setPrice(hotel.price || '');
        setDescription(hotel.description || '');
        setPhoto(hotel.photo || '');
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch hotel:', error);
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`http://127.0.0.1:5000/hotels/update/${id}`, 
        { title, city, address, price, description, photo },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      navigate('/admin/hotels'); // Redirect after update
    } catch (error) {
      console.error('Failed to update hotel:', error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Update Hotel</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter hotel title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter city" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Enter description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formPhoto">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter photo URL" 
            value={photo} 
            onChange={(e) => setPhoto(e.target.value)} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Hotel
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateHotel;
