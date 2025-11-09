<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { useUser }              from '@clerk/clerk-react'
import axios                     from 'axios'
import BlurCircle                from '../component/BlurCircle'
import timeFormat                from '../lib/timeFormat'
import dateFormat                from '../lib/dateFormate'

export default function MyBooking() {
  const currency = import.meta.env.VITE_CURRENCY || '₹'
  const API_URL  = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  const { user } = useUser()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  const getMyBookings = async () => {
    setLoading(true); setError('')
    try {
      const token = await window.Clerk.session.getToken()
      const res = await fetch(`${API_URL}/api/bookings/my`, {
        headers: {
          Authorization:`Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) throw new Error(await res.text())
      setBookings(await res.json())
    } catch (err) {
      console.error(err)
      setError(err.message)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async booking => {
    try {
      const token = await window.Clerk.session.getToken()
      const { data } = await axios.post(
        `${API_URL}/api/payments/create-order`,
        {
          bookingId: booking._id,
          amount:    booking.amount,
          email:     user.primaryEmailAddress.emailAddress,
          phone:     user.primaryPhoneNumber?.phoneNumber || '9999999999',
          name:      user.fullName
        },
        {
          headers: {
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      // build & submit PayU form
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.payuURL
      Object.entries(data.params).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type  = 'hidden'
        input.name  = key
        input.value = value
        form.appendChild(input)
      })
      document.body.appendChild(form)
      form.submit()
    } catch (err) {
      console.error('Payment error:', err)
      alert('Could not initiate payment')
    }
  }

  useEffect(() => {
    user ? getMyBookings() : setLoading(false)
  }, [user])

  if (loading) return <div className="mt-80 text-center text-gray-400">Loading...</div>

  return (
    <div className="relative px-6 mt-40 md:px-16 lg:px-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100" />
      <BlurCircle left="400px" />
      <h1 className="text-2xl mb-4">My Bookings</h1>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button onClick={getMyBookings} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
            Retry
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <p className="mt-10 text-gray-400">No bookings found.</p>
      ) : (
        bookings.map((item, idx) => {
          const movie   = item.show?.movie || item.movie || {}
          const title   = movie.title || 'Unknown'
          const showDate= item.date || item.createdAt
          const amount  = item.amount || item.totalAmount || 0

          return (
            <div key={idx} className="flex flex-col md:flex-row justify-between bg-primary/8 border rounded-lg mt-4 p-2 max-w-3xl">
              <div className="flex gap-4">
                <img src={movie.bannerUrl ? `https://image.tmdb.org/t/p/w500${movie.bannerUrl}` : 'https://via.placeholder.com/200x300'} alt={title} className="w-28 rounded-md object-cover" />
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  {movie.runtime && <p>{timeFormat(movie.runtime)}</p>}
                  <p>{dateFormat(showDate)} {item.time}</p>
                </div>
              </div>
              <div className="flex flex-col items-end p-4">
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-semibold">
                    {currency}{amount}
                  </p>
                  {item.isPaid ? (
                    <p className="text-green-500 font-bold">Paid</p>
                  ) : (
                    <button onClick={() => handlePayment(item)} className="text-blue-500 hover:underline">
                      PAY NOW
                    </button>
                  )}
                </div>
                <p className="text-sm">
                  Tickets ({item.seats?.length || 0}): {item.seats?.join(', ')}
                </p>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
=======
import React, { useEffect, useState } from 'react';
import BlurCircle from '../component/BlurCircle';
import timeFormat from '../lib/timeFormat';
import { dateFormat } from '../lib/dateFormate';
import { dummyBookingData } from '../assets/assets';

function MyBooking() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBooking(dummyBookingData); // Replace with API call in production
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 mt-30 md:mt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100" />
      <BlurCircle left="400px" />
      <h1 className="text-2xl mb-4">My Booking</h1>

      {booking.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={item.show?.movie?.poster_path}
              alt="Poster"
              className="w-28 rounded-md object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{item.show?.movie?.title}</h2>
              <p>{timeFormat(item.show?.movie?.runtime)}</p>
              <p>{dateFormat(item.show?.showDateTime)}</p>
            </div>
          </div>

          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold mb-3">
                {currency}{item.amount}
              </p>
              {!item.isPaid && (
                <button
                  className="hover:bg-amber-600 text-xl px-4 py-1.5 mb-3 rounded-full font-medium cursor-pointer"
                >
                  Pay Now
                </button>
              )}
            </div>
            <div className="text-sm">
              <p>
                <span>Total Tickets ({item.bookedSeats.length}): </span>
                {item.bookedSeats.join(', ')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-30">Loading...</div>
  );
}

export default MyBooking;
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
