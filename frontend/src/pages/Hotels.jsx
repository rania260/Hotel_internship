import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';
import CommonSection from '../shared/CommonSection';
import '../styles/hotel.css';
import SearchBar from './../shared/SearchBar';
import Newsletter from './../shared/Newsletter';
import axios from 'axios';  // Importer axios pour les requêtes HTTP

// Importer l'image par défaut
import defaultImage from '../assets/images/tour.jpg';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:5000/hotels', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);  // Vérifiez la structure de la réponse ici
        if (response.data && response.data.hotels) {
          setHotels(response.data.hotels);
        } else {
          console.error('Structure de réponse inattendue:', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des hôtels:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const pages = Math.ceil(hotels.length / 4);
    setPageCount(pages);
  }, [hotels]);

  if (loading) {
    return <p>Chargement des hôtels...</p>;
  }

  return (
    <>
      <CommonSection title={"Tous les hôtels"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {hotels.length === 0 ? (
              <p>Aucun hôtel trouvé.</p>
            ) : (
              hotels.slice(page * 4, (page * 4) + 4).map(hotel => (
                <Col lg='3' md='6' sm='6' className='mb-4' key={hotel._id}>
                  <div className='tour__card'>
                    <Card>
                      <div className="tour__img">
                        {/* Utiliser la photo de l'hôtel si elle est disponible, sinon afficher l'image par défaut */}
                        <img src={defaultImage} alt="" />
                        <span>Featured</span>
                      </div>
                      <CardBody>
                        <div className="card__top d-flex align-items-center justify-content-between">
                          <span className="tour__location d-flex align-items-center gap-1">
                            <i className='ri-map-pin-line'></i> {hotel.city}
                          </span>
                        </div>
                        <h5 className='tour__title'><a href={`/hotels/${hotel._id}`}>{hotel.title}</a></h5>
                        <p className='tour__address'>{hotel.address}</p>
                        <p className='tour__description'>{hotel.description}</p>
                        <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                          <h5>${hotel.price} <span> / per night</span></h5>
                          <button className='booking__btn'>
                            <Link to={`/hotels/${hotel._id}`}>Book Now</Link>
                          </button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
              ))
            )}
            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map(number => (
                  <span key={number} onClick={() => setPage(number)}
                    className={page === number ? 'active__page' : ''}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Hotels;
