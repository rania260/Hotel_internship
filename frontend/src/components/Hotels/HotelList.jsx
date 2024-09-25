// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import HotelCard from '../../shared/HotelCard';
// import { Col } from 'reactstrap';

// const HotelList = () => {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const token = localStorage.getItem('access_token');  // Récupérer le token
//         const response = await axios.get('http://localhost:5000/hotels', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         if (response.data && response.data.hotels) {
//           setHotels(response.data.hotels);
//         } else {
//           console.error('Unexpected response structure:', response.data);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching hotels:', error.response ? error.response.data : error.message);
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, []);

//   if (loading) {
//     return <p>Loading hotels...</p>;
//   }

//   if (hotels.length === 0) {
//     return <p>No hotels found.</p>;
//   }

//   return (
//     <>
//       {hotels.map(hotel => (
//         <Col lg='3' className='mb-4' key={hotel._id}>
//           <HotelCard hotel={hotel} />
//         </Col>
//       ))}
//     </>
//   );
// };

// export default HotelList;
