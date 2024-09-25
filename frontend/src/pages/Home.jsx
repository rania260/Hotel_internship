import React from 'react';
import '../styles/home.css'
import { Container, Row,Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/aerial-view.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import Subtitle from './../shared/Subtitle';
import experienceImg from '../assets/images/experience.png'
import SearchBar from '../shared/SearchBar';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import NewsLetter from '../shared/Newsletter';
import ServiceList from '../services/ServiceList';

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
  {/* ==================== HERO SECTION START ====================== */}
  <section>
         <Container>
            <Row>
               <Col lg='3'>
                  <h5 className="services__subtitle">What we serve</h5>
                  <h2 className="services__title">We offer our best services</h2>
               </Col>
              <ServiceList/>
            </Row>
         </Container>
      </section>

      {/* ========== FEATURED TOUR SECTION START ========== */}
      <section>
         <Container>
            <Row>
               <Col lg='12' className='mb-5'>
                  <Subtitle Subtitle={'Explore'} />
                  <h2 className='featured__tour-title'>Our featured tours</h2>
               </Col>
               
            </Row>
         </Container>
      </section>
      {/* ========== FEATURED TOUR SECTION END =========== */}

      {/* ========== EXPERIENCE SECTION START ============ */}
      <section>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="experience__content">
                     <Subtitle Subtitle={'Experience'} />
                     <h2>With our all experience <br /> we will serve you</h2>
                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        <br /> Quas aliquam, hic tempora inventore suscipit unde. </p>
                  </div>

                  <div className="counter__wrapper d-flex align-items-center gap-5">
                     <div className="counter__box">
                        <span>12k+</span>
                        <h6>Successful trip</h6>
                     </div>
                     <div className="counter__box">
                        <span>2k+</span>
                        <h6>Regular clients</h6>
                     </div>
                     <div className="counter__box">
                        <span>15</span>
                        <h6>Year experience</h6>
                     </div>
                  </div>
               </Col>
               <Col lg='6'>
                  <div className="experience__img">
                     <img src={experienceImg} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
      {/* ========== EXPERIENCE SECTION END ============== */}

      {/* ========== GALLERY SECTION START ============== */}
      <section>
         <Container>
            <Row>
               <Col lg='12'>
                  <Subtitle Subtitle={'Gallery'} />
                  <h2 className="gallery__title">Visit our customers tour gallery</h2>
               </Col>
               <Col lg='12'>
                 <MasonryImagesGallery/>
               </Col>
            </Row>
         </Container>
      </section>
      {/* ========== GALLERY SECTION END ================ */}
      <NewsLetter/>
  
  </>
}

export default Home
