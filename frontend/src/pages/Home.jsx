import React from 'react';
import '../styles/home.css'
import { Container, Row,Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/aerial-view.jpg'
import heroVideo from '../assets/images/video2.mp4'
import worldImg from '../assets/images/world.png'
import Subtitle from './../shared/Subtitle';

import SearchBar from '../shared/SearchBar';

const Home = () => {
  return <>

  <section>
  <Container>
    <Row>
      <Col lg='6'>
        <div className="hero__content">
          <div className="hero__subtitle d-flex align-items-center">
            <Subtitle Subtitle={'know before you go '}/>
            <img src={worldImg} alt="" />
          </div>
          <h1>Booking with us opens the door to unforgettable <span className='highlight'> memories </span> </h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque quas aliquid possimus, minus eos recusandae optio esse tempora magni. Nesciunt vero, odit quos ad officia eius? Dolore eos perspiciatis tempora?</p>
        </div>
      </Col>
      
      <Col lg='2'>
        <div className="hero__img-box">
          <img src={heroImg} alt="" />
        </div>
      </Col>

      <Col lg='2'>
        <div className="hero__img-box mt-4">
          <video src={heroVideo} alt="" controls />
        </div>
      </Col>

      <Col lg='2'>
        <div className="hero__img-box mt-5">
          <img src={heroImg02} alt="" />
        </div>
      </Col>

      {/* Search bar */}
      <SearchBar/>

    </Row>
  </Container>
  </section>
  
  </>
}

export default Home
