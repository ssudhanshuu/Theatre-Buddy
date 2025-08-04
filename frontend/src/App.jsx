import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Favorite from './pages/Favorite';
import MovieDetails from './pages/MovieDetails';
import MyBooking from './pages/MyBooking';
import SeatLayout from './pages/SeatLayout';
import ContactUs from './pages/ContactUs';
import FullDetails from './pages/FullDetails';
import { Toaster, toast } from 'react-hot-toast';
import './app.css';
import AdminSidebar from './pages/admin/AdminSidebar';
import Dashbord from './pages/admin/Dashbord'
import Addshow from './pages/admin/Addshow';
import ListShow from './pages/admin/ListShow';
import ListBookings from './pages/admin/ListBookings';

export default function App() {
  const location = useLocation();
  const { user } = useUser();

  const isLoggedIn = !!user;
  // const userRole = user?.publicMetadata?.role || 'user';
  const isAdminRoute = location.pathname.startsWith('/admin');

 
  useEffect(() => {
    const publicPaths = ['/', '/movies', '/contactus', '/movies/:id'];
    const isPublic = publicPaths.some(path => location.pathname.startsWith(path));
    if (!isLoggedIn && !isPublic) {
      toast.error("Please login to your account", { id: 'auth-warning' });
    }
  }, [isLoggedIn, location.pathname]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<FullDetails />} />
        <Route path="/contactus" element={<ContactUs />} />

        {isLoggedIn && (
          <>
            <Route path="/movies/:id/:date" element={<SeatLayout />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/moviedetails" element={<MovieDetails />} />
            <Route path="/mybooking" element={<MyBooking />} />
          </>
        )}

       

          <>
             <Route path="/admin" element={<AdminSidebar/>} />
             <Route path="/admin/dashboard" element={<Dashbord/>} />
         <Route path="/admin/add-show" element={<Addshow/>} />
        <Route path="/admin/list-show" element={<ListShow/>} />
         <Route path="/admin/list-bookings" element={<ListBookings/>} />
       
           
           
          </>
      

        <Route path="*" element={<div className="text-center p-10 text-xl">404 - Page Not Found</div>} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}
