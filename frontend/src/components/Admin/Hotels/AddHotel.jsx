import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddHotel = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [reviews, setReviews] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:5000/create/hotel', 
        { title, city, address, price, photo, description, reviews: reviews.split(',') }, // Split reviews into an array
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      navigate('/admin/hotels'); // Redirect to hotel list after adding
    } catch (error) {
      console.error('Failed to add hotel:', error);
    }
  };

  return (
    <Container>
      <h1>Add New Hotel</h1>
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
        <Form.Group controlId="formPhoto">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter photo URL" 
            value={photo} 
            onChange={(e) => setPhoto(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Enter hotel description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formReviews">
          <Form.Label>Reviews</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter reviews (comma separated)" 
            value={reviews} 
            onChange={(e) => setReviews(e.target.value)} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Hotel
        </Button>
      </Form>
    </Container>
  );
};

export default AddHotel;
