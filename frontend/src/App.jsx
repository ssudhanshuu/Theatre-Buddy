<<<<<<< HEAD
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  useUser,
  SignIn,
  SignUp,
  SignedIn,
} from "@clerk/clerk-react";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Favorite from "./pages/Favorite";
import MovieDetails from "./pages/MovieDetails";
import MyBooking from "./pages/MyBooking";
import SeatLayout from "./pages/SeatLayout";
import ContactUs from "./pages/ContactUs";
import FullDetails from "./pages/FullDetails";
// import PaymentPage from "./pages/PaymentPage";
import Dashboard from "./pages/admin/Dashboard";
import AddShow from "./pages/admin/Addshow";
import ListShow from "./pages/admin/ListShow";
import ListBookings from "./pages/admin/ListBookings";
import Layout from "./pages/admin/Layout";
import AddTheater from "./pages/admin/AddTheater";
import Theaters from "./pages/Theaters";
import { Toaster } from "react-hot-toast";
import AddUpcomingMovie from "./pages/admin/AddUpcomingMovie";
import ListUpcomingMovies from "./pages/ListUpcomingMovies";

import "./app.css";
import SuccessPage from "./pages/SuccessPage";
import FailurePage from "./pages/failurePage";
=======
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
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804

export default function App() {
  const location = useLocation();
  const { user } = useUser();
<<<<<<< HEAD
  const isAdminRoute = location.pathname.startsWith("/admin");

  const isLoggedIn = !!user;

  useEffect(() => {
    const publicPaths = ["/", "/movies", "/contactus"];
    const isPublic = publicPaths.some((path) =>
      location.pathname.startsWith(path)
    );

    if (!isLoggedIn && !isPublic) {
      toast.error("Please login to your account", { id: "auth-warning" });
=======

  const isLoggedIn = !!user;
  // const userRole = user?.publicMetadata?.role || 'user';
  const isAdminRoute = location.pathname.startsWith('/admin');

 
  useEffect(() => {
    const publicPaths = ['/', '/movies', '/contactus', '/movies/:id'];
    const isPublic = publicPaths.some(path => location.pathname.startsWith(path));
    if (!isLoggedIn && !isPublic) {
      toast.error("Please login to your account", { id: 'auth-warning' });
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
    }
  }, [isLoggedIn, location.pathname]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
<<<<<<< HEAD
        {/* Clerk Auth Routes */}
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />

        {/* Public Routes */}
=======
       
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<FullDetails />} />
        <Route path="/contactus" element={<ContactUs />} />
<<<<<<< HEAD
        <Route path="/payment-success" element={<SuccessPage></SuccessPage>}/>
        <Route path="/payment-failure" element={<FailurePage/>}/>
         
        {/* User Routes */}
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/movies/:id/:date/:time" element={<SeatLayout />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/moviedetails" element={<MovieDetails />} />
        <Route path="/mybooking" element={<MyBooking />} />
        {/* <Route path="/payments/:bookingId" element={<PaymentPage />} /> */}
       <Route path="/favorites" element={<Favorite />} />
       <Route path="/theaters" element={<Theaters />} />
       <Route path="/theaters/shows" element={<ListShow />} />
        {/* Admin Routes */}
        <Route path="api/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="shows" element={<ListShow />} />
          <Route path="bookings" element={<ListBookings />} />
          <Route path="shows/add" element={<AddShow />} />
          <Route path="add-theaters" element={<AddTheater />} />
          <Route path="movies/add" element={<AddUpcomingMovie />} />
          <Route path="movies/upcoming" element={<ListUpcomingMovies />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="text-center p-10 text-xl">404 - Page Not Found</div>
          }
        />
      </Routes>

     
=======

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
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
    </div>
  );
}
