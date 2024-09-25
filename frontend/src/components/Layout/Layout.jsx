// import React from 'react';

// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// import Routers from '../../router/Routers';

// const Layout = () => {
//   return (
//     <>
//     <Header/>
//     <Routers/>
//     <Footer/>
//     </>

//   )
// };

// export default Layout;
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../router/Routers';

const Layout = () => {
  const location = useLocation(); // Get the current route

  const isAdminDashboard = location.pathname.startsWith('/admin'); // Check if the current route is the admin dashboard

  return (
    <>
      {!isAdminDashboard && <Header />} {/* Render Header only if not on the admin dashboard */}
      <Routers />
      {!isAdminDashboard && <Footer />} {/* Render Footer only if not on the admin dashboard */}
    </>
  );
};

export default Layout;
