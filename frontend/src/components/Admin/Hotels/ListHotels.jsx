import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../Sidebar'; 

const ListHotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:5000/hotels', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setHotels(response.data.hotels);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  const handleDelete = async (hotelId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://127.0.0.1:5000/hotels/delete/${hotelId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setHotels(hotels.filter(hotel => hotel._id !== hotelId));
    } catch (error) {
      console.error('Failed to delete hotel:', error);
    }
  };

  const handleUpdate = (hotelId) => {
    navigate(`/admin/update-hotel/${hotelId}`);
  };

  const handleAddHotel = () => {
    navigate('/admin/add-hotel');
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center my-4">
            <h1>Hotel Management</h1>
            <Button variant="primary" onClick={handleAddHotel}>
              Add New Hotel
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Title</th>
                <th>City</th>
                <th>Address</th>
                <th>Price</th>
                <th>Description</th>
                <th>Reviews</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map(hotel => (
                <tr key={hotel._id}>
                  <td>
                    <img
                      src={hotel.photo || "default-image.jpg"}
                      alt="hotel-img"
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  <td>{hotel.title}</td>
                  <td>{hotel.city}</td>
                  <td>{hotel.address}</td>
                  <td>${hotel.price}</td>
                  <td>{hotel.description}</td>
                  <td>
                    <ul>
                      {hotel.reviews && hotel.reviews.length > 0 ? (
                        hotel.reviews.map((review, index) => (
                          <li key={index}>{review}</li>
                        ))
                      ) : (
                        <li>No reviews available</li>
                      )}
                    </ul>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleUpdate(hotel._id)}>
                      Update
                    </Button>{' '}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(hotel._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListHotels;
