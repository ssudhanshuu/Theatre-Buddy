import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { dummyDateTimeData } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function DateSelect({ dateTime = dummyDateTimeData }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { id: movieId } = useParams();

  const onBookHandler = () => {
    if (!selected) {
      toast.error("Please select a date");
      return;
    }

    navigate(`/movies/${movieId}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col mb-10 mt-[120px] overflow-hidden md:flex-row items-start justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle top="100px" left="0px" />
      <div className="flex-1">
        <p className="text-lg text-center font-semibold">Choose Date</p>
        <div className="flex items-center gap-6 text-sm mt-5 flex-wrap">
          <ChevronLeftIcon width={28} />
          <div className="grid grid-cols-4 md:flex flex-wrap md:max-w-lg gap-4">
            {dateTime &&
              Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-10 w-14 rounded cursor-pointer ${
                    selected === date
                      ? "bg-orange-500 text-white"
                      : "border hover:bg-orange-500"
                  }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
          </div>
          <ChevronRightIcon width={28} />
          <button
            onClick={onBookHandler}
            className="bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition-all cursor-pointer ml-auto"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
