import React, {useState, useRef} from 'react';
import '../styles/hotel.details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import hotelData from './../assets/data/hotels'
import Newsletter from './../shared/Newsletter'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'

const HotelDetails = () => {
  const { id } = useParams()

  const hotel = hotelData.find(hotel=> hotel.id === id)

  const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = hotel
  const reviewMsgRef = useRef('')
  const [setHotelRating] = useState(null)

  const { avgRating } = calculateAvgRating(reviews)

  //format date
  const options = { day: 'numeric', month: 'long', year: 'numeric' }

  const submitHandler = e => {
    e.preventDefault()
  }
  const reviewText = reviewMsgRef.current.value;

  return (
    <section>
         <Container>
               <Row>
                  <Col lg='8'>
                  <div className="tour__content">
                        <img src={photo} alt="" />
                  
                  <div className="tour__info">
                           <h2>{title}</h2>
                           <div className="d-flex align-items-center gap-5">
                           <span className="tour__rating d-flex align-items-center gap-1">
                                 <i className='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                                 {avgRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
                              </span>

                              <span><i className='ri-map-pin-fill'></i> {address}</span>
                           </div>

                           <div className="tour__extra-details">
                              <span><i className='ri-map-pin-2-line'></i> {city}</span>
                              <span><i className='ri-money-dollar-circle-line'></i> {price}/ per person</span>
                              <span><i className='ri-map-pin-time-line'></i> {distance} k/m</span>
                              <span><i className='ri-group-line'></i> {maxGroupSize} people</span>
                           </div>
                           <h5>Description</h5>
                           <p>{desc}</p>
                        </div>
                        {/* ============ TOUR REVIEWS SECTION START ============ */}
                        <div className="tour__reviews mt-4">
                           <h4>Reviews ({reviews?.length} reviews)</h4>

                           <Form onSubmit={submitHandler}>
                              <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                                 <span onClick={() => setHotelRating(1)}>1 <i className='ri-star-s-fill'></i></span>
                                 <span onClick={() => setHotelRating(2)}>2 <i className='ri-star-s-fill'></i></span>
                                 <span onClick={() => setHotelRating(3)}>3 <i className='ri-star-s-fill'></i></span>
                                 <span onClick={() => setHotelRating(4)}>4 <i className='ri-star-s-fill'></i></span>
                                 <span onClick={() => setHotelRating(5)}>5 <i className='ri-star-s-fill'></i></span>
                              </div>

                              <div className="review__input">
                                 <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
                                 <button className='btn primary__btn text-white' type='submit'>
                                    Submit
                                 </button>
                              </div>
                           </Form>

                           <ListGroup className='user__reviews'>
                              {
                                 reviews?.map(review => (
                                    <div className="review__item">
                                       <img src={avatar} alt="" />

                                       <div className="w-100">
                                          <div className="d-flex align-items-center justify-content-between">
                                             <div>
                                                <h5>Name</h5>
                                                <p>{new Date("08-08-1994").toLocaleDateString('en-US', options)}</p>
                                             </div>

                                             <span className='d-flex align-items-center'>
                                                5<i className='ri-star-s-fill'></i>
                                             </span>
                                          </div>

                                          <h6>{reviewText}</h6>
                                       </div>
                                    </div>
                                 ))
                              }
                           </ListGroup>
                        </div>
                        {/* ============ TOUR REVIEWS SECTION END ============== */}
                        </div>
                </Col>

                <Col lg='4'>
                     <Booking hotel={hotel} avgRating={avgRating} />
                  </Col>
               </Row>
            
         </Container>
         <Newsletter />
      </section>


  )
}

export default HotelDetails
