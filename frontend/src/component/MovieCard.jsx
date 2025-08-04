import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyDashboardData } from "../assets/assets";
import { StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";


export default function MovieCard() {
  // const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // const fetchMovies = async () => {
  //   const res = await fetch(
  //     "https://api.themoviedb.org/3/movie/popular?api_key=1b8242549b94dcd207f827ee41a5f1fe"
  //   );
  //   const data = await res.json();
  //   setMovies(data.results); // ✅ TMDb returns results array
  // };

  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {dummyDashboardData.activeShows.map((item) => (
      // {movies.slice(0, 8).map((item, index) => (
        <div
          key={item._id}
          className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden p-4"
        >
          <img
             onClick={() => {
                navigate(`/movies/${item.movie?._id}`);
                scrollTo(0, 0);
              }}
            src={item.movie.backdrop_path}
            // src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
            alt={item.title}
            className="rounded-md mb-4 h-52 w-full object-cover object-right-bottom cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            {item.movie?.title || "Untitled"}
            {/* {item.title || "Untitled"} */}
          </h2>


          <p className="text-gray-600 mt-2">
            {new Date(item.movie?.release_date).toLocaleDateString()} |
            {item.movie?.genres
              ?.slice(0, 2)
              .map((genre) => genre.name)
              .join(" | ")}{" "}
            | {timeFormat(item.movie?.runtime)}
              {/* {new Date(item.release_date).toLocaleDateString()} |
            {item.genre_ids?.slice(0, 2).join(" | ")} |{" "}
            {timeFormat(item.runtime || 120)} */}
          </p>


          <div>
            <button
              onClick={() => {
                navigate(`/movies/${item.movie._id}`);
                scrollTo(0, 0);
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Buy Ticket
            </button>
            <p className="flex items-center gap-1 text-sm text-gray-500 mt-1 pr-1 ">
              <StarIcon className="w-4 h-4 text-primary fill-primary" />
              {item.movie?.vote_average.toFixed(1)}
            </p>
               {/* <p className="flex items-center gap-1 text-sm text-gray-500 mt-1 pr-1 ">
              <StarIcon className="w-4 h-4 text-primary fill-primary" />
              {item.vote_average?.toFixed(1)}
            </p> */}


          </div>
        </div>
      ))}
    </div>
  );
}
