import React from 'react'
import HotelCard from '../../shared/HotelCard'
import hotelData from '../../assets/data/hotels'
import { Col } from 'reactstrap'
const HotelList = () => {
  return (
    <>
    {
    hotelData?.map(hotel=>(
        <Col lg='3' className='mb-4' key={hotel.id}><HotelCard hotel={hotel}/>
            </Col>
    ))
    }
  </>
  )
}

export default HotelList
