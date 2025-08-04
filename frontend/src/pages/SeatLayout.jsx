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
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex items-center gap-2 mt-2">
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
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

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
            </div>
          ))}
        </div>
      </div>

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
