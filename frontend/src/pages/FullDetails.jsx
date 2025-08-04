import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../component/BlurCircle";
import { StarIcon, PlayCircleIcon, Heart } from "lucide-react";
import DateSelect from "../component/DateSelect";
import Footer from "../component/Footer";
import FeaturedSection from "../component/FeaturedSection";

export default function FullDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const selectedShow = dummyShowsData.find((item) => item._id === id);
    if (selectedShow) {
      setShow({
        movie: selectedShow,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  const timeFormat = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  if (!show) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  return (
    <div className="px-8 pt-20 md:pt-30">
      <div className="flex flex-col w-full lg:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={show.movie?.poster_path}
          alt="Movie Poster"
          className="rounded-xl h-[500px] w-full max-w-sm object-cover"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">English | Hindi</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie?.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie?.vote_average?.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie?.overview}
          </p>

          <p className="text-gray-300 mt-1 text-sm">
            {timeFormat(show.movie?.runtime)} |{" "}
            {show.movie?.genres?.map((genre) => genre.name).join(", ")} |{" "}
            {show.movie?.release_date?.split("-")[0]}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button className="px-4 py-2 w-full flex justify-center items-center gap-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
              <PlayCircleIcon />
              Watch Trailer
            </button>

            <a
              href="#"
              className="px-4 py-2 w-full text-center bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Buy Tickets
            </a>

            <button className="px-4 py-2 w-full flex justify-center items-center gap-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
              <Heart className="w-5 h-5" />
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
      <div className="no-scrollbar overflow-x-auto mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie?.casts?.slice(0, 12).map((cast, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className="text-lg font-medium mt-20 mb-10">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData.slice(0, 1).map((movie, index) => (
          <FeaturedSection key={index} />
        ))}
      </div>

   
    </div>
  );
}
