import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './hotel-card.css'
const HotelCard = ({ hotel }) => {
    const { id, title, city, photo, price, avgRating, reviews } = hotel;

    return (
        <div className='tour__card'>
            <Card>
                <div className="tour__img">
                    <img src={photo} alt="tour-img" />
                    <span>Featured</span>
                </div>
                <CardBody>
                    <div className="card__top d-flex align-items-center justify-content-between">
                        <span className="tour__location d-flex align-items-center gap-1">
                            <i className='ri-map-pin-line'></i> {city}
                        </span>
                        <span className="tour__rating d-flex align-items-center gap-1">
                            <i className='ri-star-fill'></i> {avgRating} {" "}
                            <span>({reviews.length})</span>
                        </span>
                    </div>
                    <h5 className='tour__title'><Link to={`/hotels/${id}`}>{title}</Link></h5>
                    <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                        <h5>${price} <span> /per person</span></h5>
                        <button className='booking__btn'>
                            <Link to={`/hotels/${id}`}>Book Now</Link>
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

HotelCard.propTypes = {
    hotel: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        avgRating: PropTypes.number.isRequired,
        reviews: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
};

export default HotelCard;
