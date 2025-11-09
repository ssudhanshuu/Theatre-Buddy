<<<<<<< HEAD
// src/pages/SeatLayout.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BlurCircle from "../component/BlurCircle";
import { useAuth } from "@clerk/clerk-react";

export default function SeatLayout() {
  const { isLoaded, isSignedIn, getToken, userId } = useAuth();
  const { id: movieId, date, time } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  const currentTime = time || "";
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);

  const toIdString = (raw) =>
    raw && typeof raw === "object" && raw._id ? String(raw._id) : String(raw);

  // Fetch shows
  useEffect(() => {
    let cancelled = false;

    async function fetchShow() {
      try {
        const res = await axios.get(`${API_URL}/api/shows`);
        const allShows = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.shows)
          ? res.data.shows
          : [];

        const matched = allShows.find((s) => {
          const mId = toIdString(s.movie);
          return (
            mId === movieId &&
            s.date?.startsWith(date) &&
            s.isActive
          );
        });

        if (!cancelled) setShow(matched || null);
      } catch (err) {
        console.error("Shows lookup failed:", err);
        if (!cancelled) setShow(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchShow();
    return () => {
      cancelled = true;
    };
  }, [API_URL, movieId, date]);

  // Refresh locked seats
  useEffect(() => {
    if (!show || !currentTime) return;

    axios
      .get(`${API_URL}/api/seats/locked/${show._id}/${currentTime}`)
      .then((res) => setLockedSeats(res.data.lockedSeats || []))
      .catch(() => setLockedSeats([]));
  }, [API_URL, show, currentTime]);

  const handleTimeSelect = (slot) => {
    navigate(`/movies/${movieId}/${date}/${slot}`);
  };

  const handleSeatClick = (seatId) => {
    if (!selectedSeats.includes(seatId)) {
      if (selectedSeats.length < 5) {
        setSelectedSeats((prev) => [...prev, seatId]);
      } else {
        alert("You can only select up to 5 seats");
      }
    } else {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
    }
  };

  // Checkout with Clerk token
  const handleCheckout = async () => {
    if (!currentTime) {
      return alert("Please select a time slot first");
    }
    if (selectedSeats.length === 0) {
      return alert("Select at least one seat to proceed");
    }
    if (!isLoaded) {
      return alert("Auth still loading—please wait");
    }
    if (!isSignedIn) {
      return alert("You must be signed in to continue");
    }

    try {
      const token = await getToken();
      if (!token) {
        return alert("Invalid or expired token. Please sign in again.");
      }

      // Lock seats
      await axios.post(
        `${API_URL}/api/seats/lock`,
        {
          showId: show._id,
          time: currentTime,
          seats: selectedSeats,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Create booking
      const res = await axios.post(
        `${API_URL}/api/bookings/create`,
        {
          showId: show._id,
          time: currentTime,
          seats: selectedSeats,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      navigate("/mybooking", { state: { booking: res.data.booking } });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      if (err.response?.status === 409) {
        alert(msg || "Some seats are already booked, please choose others");
      } else if (err.response?.status === 400) {
        alert(msg || "Invalid seat lock request, please try again");
      } else if (err.response?.status === 401) {
        alert("Invalid or expired token. Please sign in again.");
      } else {
        alert(msg || "Checkout failed");
      }
    }
=======
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { ClockIcon } from "lucide-react";
import BlurCircle from "../component/BlurCircle";
import Footer from '../component/Footer'
function SeatLayout() {
  const groupRows = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J']];

  const { id, date } = useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const getShow = async () => {
    const matchedShow = dummyShowsData.find((show) => show._id === id);
    if (matchedShow) {
      setShow({
        movie: matchedShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]); // Reset seat selection on time change
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return alert("Please select a time first");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return alert("You can only select up to 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex items-center gap-2 mt-2">
<<<<<<< HEAD
      <span className="w-6 text-right text-white font-semibold">
        {row}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isSelected = selectedSeats.includes(seatId);
          const isLocked = lockedSeats.includes(seatId);

          return (
            <button
              key={seatId}
              onClick={() => !isLocked && handleSeatClick(seatId)}
              disabled={isLocked}
              className={`h-8 w-8 rounded border border-primary/60 transition ${
                isLocked
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : isSelected
                  ? "bg-primary text-white"
                  : "bg-white text-black hover:bg-yellow-300"
              }`}
=======
      <span className="w-6 text-right text-white font-semibold">{row}</span>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer transition 
                ${
                  selectedSeats.includes(seatId)
                    ? "bg-primary text-white"
                    : "bg-white text-black hover:bg-yellow-300"
                }`}
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

<<<<<<< HEAD
  const formatTime = (slot) => {
    try {
      const [hour, minute] = slot.split(":");
      const dateObj = new Date();
      dateObj.setHours(Number(hour));
      dateObj.setMinutes(Number(minute));
      return dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return slot;
    }
  };

  if (loading) {
    return <div className="text-center text-white mt-20">Loading show…</div>;
  }
  if (!show) {
    return (
      <div className="text-center text-white mt-20">
        No shows available on {date}.
      </div>
    );
  }

  return (
    <>
      {/* Time slots */}
      <div className="bg-teal-800 pb-10 mt-40 pt-5 w-[80%] mx-auto my-10 rounded-lg shadow-md">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Available Timings
          <br />
          Select a Time Slot
        </h1>
        <div className="flex flex-wrap justify-center gap-4 px-4 text-white">
          {(show.timeSlots || []).map((slot) => (
            <div
              key={slot}
              onClick={() => handleTimeSelect(slot)}
              className={`px-4 py-1 rounded-md shadow cursor-pointer transition-all duration-200 ${
                currentTime === slot
                  ? "bg-yellow-400 text-black"
                  : "bg-white text-black hover:bg-yellow-300"
              }`}
            >
              {formatTime(slot)}
=======
  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <>
    <div className="mt-20">
      {/* Time Selection */}
      <div className="bg-teal-800 pb-10 pt-5 h-auto w-[80%] mx-auto my-10 rounded-lg shadow-md">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Available Timing
        </h1>

        <div className="flex flex-row justify-center gap-4 flex-wrap text-white">
          {show.dateTime[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => handleTimeSelect(item.time)}
              className={`px-4 py-1 rounded-md shadow text-sm cursor-pointer 
                transition-all duration-200 
                ${
                  selectedTime === item.time
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-black hover:bg-yellow-300"
                }`}
            >
              <p className="text-sm">
                {new Date(item.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
            </div>
          ))}
        </div>
      </div>

<<<<<<< HEAD
      {/* Seat grid */}
      {currentTime && (
        <div className="relative flex flex-col items-center mt-10">
          <BlurCircle top="-100px" left="-100px" />
          <BlurCircle bottom="0" right="0" />

          <h2 className="text-2xl font-semibold mb-4 text-white">
            Select Your Seats
          </h2>
          <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

          <div className="flex flex-col items-center text-xs text-gray-300">
            <div className="grid md:grid-cols-1 gap-4 mb-6">
              {groupRows[0].map((row) => renderSeats(row))}
            </div>
            <div className="grid grid-cols-2 gap-10">
              {groupRows.slice(1).map((group, i) => (
                <div key={i}>
                  {group.map((row) => renderSeats(row))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirm */}
      {currentTime && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleCheckout}
            className="bg-yellow-700 text-white text-2xl rounded-lg h-14 w-[80%] hover:bg-yellow-600 transition"
          >
            Confirm & Pay ({selectedSeats.length} seats)
          </button>
        </div>
      )}
    </>
  );
}
=======
      {/* Seat Selection Section */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src="" alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        {/* Seat Rows */}
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
        <div className="grid  md:grid-cols-1 gap-4 md:gap-2 mb-6">
                    {groupRows[0].map(row => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group,index )=>(
             <div key={index}>
              {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>

        </div>
       
      </div> 
   
    </div> 
   <div className="flex justify-center mt-10">
  <button onClick={()=> navigate('/mybooking')} className="bg-yellow-700 text-white text-2xl rounded-lg h-14 w-[80%] hover:bg-yellow-600 transition">
    Proceed to Checkout
  </button>
</div>

 
    </>
  ) : (
    <div className="text-center text-white mt-20">Loading...</div>
  );
}

export default SeatLayout;
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
