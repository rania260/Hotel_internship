// import React from 'react';
// import PropTypes from 'prop-types';
// import { Card, CardBody } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import './hotel-card.css';

// const HotelCard = ({ hotel }) => {
//     const { _id, title, city, address, price, description, photo } = hotel;

//     return (
//         <div className='tour__card'>
//             <Card>
//                 <div className="tour__img">
//                     {/* Utiliser la photo de l'hôtel si elle est disponible, sinon afficher une image par défaut */}
//                     <img src={photo || "default-image.jpg"} alt="hotel-img" />
//                     <span>Featured</span>
//                 </div>
//                 <CardBody>
//                     <div className="card__top d-flex align-items-center justify-content-between">
//                         <span className="tour__location d-flex align-items-center gap-1">
//                             <i className='ri-map-pin-line'></i> {city}
//                         </span>
//                     </div>
//                     <h5 className='tour__title'><Link to={`/hotels/${_id}`}>{title}</Link></h5>
//                     <p className='tour__address'>{address}</p>
//                     <p className='tour__description'>{description}</p>
//                     <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
//                         <h5>${price} <span> / per night</span></h5>
//                         <button className='booking__btn'>
//                             <Link to={`/hotels/${_id}`}>Book Now</Link>
//                         </button>
//                     </div>
//                 </CardBody>
//             </Card>
//         </div>
//     );
// };

// // Validation des propriétés avec PropTypes
// HotelCard.propTypes = {
//     hotel: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         city: PropTypes.string.isRequired,
//         address: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         description: PropTypes.string,
//         photo: PropTypes.string // Ajouter la validation pour photo
//     }).isRequired,
// };

// export default HotelCard;
