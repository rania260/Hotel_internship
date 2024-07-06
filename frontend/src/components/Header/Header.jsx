import React from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

import logo from '../../assets/images/logonew.png';
import './header.css';

const nav_links = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/about',
        display: 'About'
    },
    {
        path: '/hotels',
        display: 'hotels'
    }
];

const Header = () => {
    return (
        <header className="header">
            <Container>
                <Row>
                    <div className="nav__wrapper d-flex align-item-center justify-content-between">
                        {/* ==== logo =====*/}
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                        {/* ======= logo end ====== */}

                        {/* ====== menu start ======= */}
                        <div className="navigation">
                            <ul className="menu d-flex align-items-center gap-5">
                                {
                                nav_links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                        {/* ======= menu end ====== */}

                        <div className="nav__right d-flex align-items-center gap-4">
                            <div className="nav__btns d-flex align-items-center gap-2">
                            <>
                            <Button className='btn btn-dark' >Logout</Button>
                              </>  <>
                                <Button className="btn secondary__btn">
                                    <Link to='/login'>Login</Link>
                                </Button>
                                <Button className="btn primary__btn">
                                    <Link to='/register'>Register</Link>
                                </Button>
                                </>
                            </div>
                            <span className="mobile__menu">
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
