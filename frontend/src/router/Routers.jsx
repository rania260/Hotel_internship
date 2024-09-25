import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Hotels from '../pages/Hotels';
import HotelDetails from '../pages/HotelDetails';
import Login from '../pages/Login';
import SearchResultList from '../pages/SearchResultList';
import AdminDashboard from '../components/Admin/AdminDashbord';
import Register from '../pages/Register';
import PrivateRoute from '../router/PrivateRoute'; // Importer le composant PrivateRoute
import ListHotels from '../components/Admin/Hotels/ListHotels';
import AddUser from '../components/Admin/AddUser';
import UpdateUser from '../components/Admin/UpdateUser';
import AddHotel from '../components/Admin/Hotels/AddHotel';
import UpdateHotel from '../components/Admin/Hotels/UpdateHotel';
import Booking from '../components/Booking/Booking';

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="home"/> } />
        <Route path="/home" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotels/search" element={<SearchResultList />} />
        <Route path="/hotels/booking" element={<Booking />} />
        

        {/* Protéger la route admin */}
        <Route element={<PrivateRoute roleRequired="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/hotels" element={<ListHotels />} />
            <Route path="/admin/add-user" element={<AddUser />} />
            <Route path="/admin/update-user/:id" element={<UpdateUser />} />
            <Route path="/admin/add-hotel" element={<AddHotel />} />
            <Route path="/admin/update-hotel/:id" element={<UpdateHotel />} />

        </Route>
    </Routes>
  );
}

export default Routers;
