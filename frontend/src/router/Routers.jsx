import React from 'react';
import { Routes, 
    Route,
     Navigate 
    } from "react-router-dom";

import Home  from '../pages/Home';
import Hotels from '../pages/Hotels';
import HotelDetails from '../pages/HotelDetails';
import Login from '../pages/Login';
import Registre from '../pages/Registre';
import SearchResultList from '../pages/SearchResultList';

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="home"/> } />
        <Route path="/home" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registre" element={<Registre />} />
        <Route path="/hotels/search" element={<SearchResultList />} />
    </Routes>
  )
}

export default Routers;
