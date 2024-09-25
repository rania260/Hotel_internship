// import React, { useState, useEffect, useRef } from 'react';
// import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';  // Import Axios for making HTTP requests
// import Newsletter from './../shared/Newsletter';
// import calculateAvgRating from '../utils/avgRating';
// import avatar from '../assets/images/avatar.jpg';
// import Booking from '../components/Booking/Booking';
// import '../styles/hotel.details.css';

// const HotelDetails = () => {
//   const { id } = useParams(); // Get the hotel ID from the URL
//   const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const reviewMsgRef = useRef('');
//   const [setHotelRating] = useState(null);

//   // Fetch hotel details from API
//   useEffect(() => {
//     const fetchHotel = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:5000/hotels/${id}`);
//         setHotel(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };
//     fetchHotel();
//   }, [id]);

//   if (loading) {
//     return <p>Chargement des détails de l'hôtel...</p>;
//   }

//   if (error) {
//     return <p>Erreur lors de la récupération des détails de l'hôtel : {error}</p>;
//   }

//   const { photo, title, description, price, reviews, city, address, distance, maxGroupSize } = hotel;
//   const { avgRating } = calculateAvgRating(reviews);

//   const submitHandler = e => {
//     e.preventDefault();
//     const reviewText = reviewMsgRef.current.value;
//     // Implement review submission logic here
//   };

//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg='8'>
//             <div className="tour__content">
//               <img src={photo} alt="" />
//               <div className="tour__info">
//                 <h2>{title}</h2>
//                 <div className="d-flex align-items-center gap-5">
//                   <span className="tour__rating d-flex align-items-center gap-1">
//                     <i className='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> 
//                     {avgRating === 0 ? 'Not rated' : `${avgRating} (${reviews.length} reviews)`}
//                   </span>
//                   <span><i className='ri-map-pin-fill'></i> {address}</span>
//                 </div>

//                 <div className="tour__extra-details">
//                   <span><i className='ri-map-pin-2-line'></i> {city}</span>
//                   <span><i className='ri-money-dollar-circle-line'></i> {price} / per night</span>
//                   <span><i className='ri-map-pin-time-line'></i> {distance} km</span>
//                   <span><i className='ri-group-line'></i> {maxGroupSize} people</span>
//                 </div>
//                 <h5>Description</h5>
//                 <p>{description}</p>
//               </div>

//               <div className="tour__reviews mt-4">
//                 <h4>Reviews ({reviews.length} reviews)</h4>

//                 <Form onSubmit={submitHandler}>
//                   <div className="d-flex align-items-center gap-3 mb-4 rating__group">
//                     {[1, 2, 3, 4, 5].map(star => (
//                       <span key={star} onClick={() => setHotelRating(star)}>{star} <i className='ri-star-s-fill'></i></span>
//                     ))}
//                   </div>

//                   <div className="review__input">
//                     <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
//                     <button className='btn primary__btn text-white' type='submit'>Submit</button>
//                   </div>
//                 </Form>

//                 <ListGroup className='user__reviews'>
//                   {reviews.map((review, index) => (
//                     <div className="review__item" key={index}>
//                       <img src={avatar} alt="" />
//                       <div className="w-100">
//                         <div className="d-flex align-items-center justify-content-between">
//                           <div>
//                             <h5>{review.username}</h5>
//                             <p>{new Date(review.date).toLocaleDateString('en-US')}</p>
//                           </div>
//                           <span className='d-flex align-items-center'>
//                             {review.rating}<i className='ri-star-s-fill'></i>
//                           </span>
//                         </div>
//                         <h6>{review.comment}</h6>
//                       </div>
//                     </div>
//                   ))}
//                 </ListGroup>
//               </div>
//             </div>
//           </Col>

//           <Col lg='4'>
//             <Booking hotel={hotel} avgRating={avgRating} />
//           </Col>
//         </Row>
//       </Container>
//       <Newsletter />
//     </section>
//   );
// };

// export default HotelDetails;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Newsletter from './../shared/Newsletter';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import '../styles/hotel.details.css';
import defaultImage from '../assets/images/tour.jpg';

const HotelDetails = () => {
  const { id } = useParams(); // Récupérer l'ID de l'hôtel à partir de l'URL
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les détails de l'hôtel depuis l'API
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(`http://127.0.0.1:5000/hotels/${id}`, config);
        setHotel(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Une erreur est survenue');
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  if (loading) {
    return <p>Chargement des détails de l'hôtel...</p>;
  }

  if (error) {
    return <p>Erreur lors de la récupération des détails : {error}</p>;
  }

  if (!hotel) {
    return <p>Aucun hôtel trouvé.</p>;
  }

  const { photo, title, description, price, reviews, city, address } = hotel;
  const { avgRating } = calculateAvgRating(reviews);

  return (
    <section className="hotel-details">
      <Container>
        <Row>
          <Col lg="8">
            <div className="hotel__content">
              <img src={defaultImage} alt={title} className="hotel__image" />
              <div className="hotel__info">
                <h2 className="hotel__title">{title}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span className="hotel__location"><i className="ri-map-pin-fill"></i> {city}</span>
                  <span className="hotel__price"><i className="ri-money-dollar-circle-line"></i> {price} € / nuit</span>
                  <span className="hotel__address"><i className="ri-map-pin-2-line"></i> {address}</span>
                </div>
                <div className="hotel__rating">
                  <span><i className='ri-star-fill' style={{ color: 'var(--secondary-color)' }}></i> {avgRating === 0 ? 'Non noté' : `${avgRating} (${reviews.length} avis)`}</span>
                </div>
                <h5>Description</h5>
                <p className="hotel__description">{description}</p>
              </div>
            </div>

            {/* Section des avis */}
            <div className="hotel__reviews mt-4">
              <h4>Avis ({reviews.length})</h4>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review__item d-flex align-items-start mb-3">
                    <img src={avatar} alt="" className="review__avatar" />
                    <div className="review__details">
                      {/* Affichage du nom d'utilisateur et de la date */}
                      {/* Vous pouvez décommenter ces lignes si vous avez ces informations dans vos avis */}
                      {/* <h5>{review.username}</h5> */}
                      {/* <p>{new Date(review.date).toLocaleDateString('fr-FR')}</p> */}
                      <p>{review}</p> {/* Afficher le commentaire de l'avis */}
                    </div>
                  </div>
                ))
              ) : (
                <p>Aucun avis pour cet hôtel.</p>
              )}
            </div>

          </Col>

          {/* Section de réservation */}
          <Col lg='4'>
            <Booking hotel={hotel} />
          </Col>
        </Row>
      </Container>

      {/* Newsletter */}
      <Newsletter />
    </section>
  );
};

export default HotelDetails;