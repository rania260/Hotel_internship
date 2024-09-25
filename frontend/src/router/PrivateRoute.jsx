import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if necessary

const PrivateRoute = ({ roleRequired }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />; // Redirect if not authenticated
    }

    if (roleRequired && userRole !== roleRequired) {
        return <Navigate to="/hotels" />; // Redirect if the user doesn't have the correct role
    }

    return <Outlet />; // Render the child component if everything is good
};

// Define prop-types for roleRequired
PrivateRoute.propTypes = {
    roleRequired: PropTypes.string, // roleRequired is expected to be a string
};

export default PrivateRoute;
