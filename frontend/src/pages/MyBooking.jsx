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
