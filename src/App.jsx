import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'; // ✅ Clerk import
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

export default function App() {
  const location = useLocation();
  const { user } = useUser();         
  const isLoggedIn = !!user;         
  const isAdminRoute = location.pathname.startsWith('/admin');
  const userRole = user?.publicMetadata?.role;

  // Show login alert only when needed
  if (!isLoggedIn && location.pathname !== '/' && location.pathname !== '/movies') {
    toast.error("Please login to your account");
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        {isLoggedIn && (userRole === "Admin" || userRole === "Super Admin") ? (
          <>
            {/* Admin Routes Here */}
          </>
        ) : (
          <>
            {isLoggedIn && (
              <>
                <Route path="/movies/:id" element={<FullDetails />} />
                <Route path="/movies/:id/:date" element={<SeatLayout />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/moviedetails" element={<MovieDetails />} />
                <Route path="/mybooking" element={<MyBooking />} />
                <Route path="/seatlayout" element={<SeatLayout />} />
                <Route path="/contactus" element={<ContactUs />} />
              </>
            )}
          </>
        )}
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}
