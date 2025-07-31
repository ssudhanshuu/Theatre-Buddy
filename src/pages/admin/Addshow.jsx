import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { dummyShowsData } from "../../assets/assets";
import { StarIcon } from "lucide-react";
import Title from "./Title";

export default function Addshow() {
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [dateTimeSelection, setDateTimeSelection] = useState({});

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      // Uncomment this when API is ready
      // const res = await fetch('/api/movies/now-playing');
      // const data = await res.json();
      // setNowPlayingMovie(data);

      // For now, use dummy data
      setNowPlayingMovie(dummyShowsData);
    };

    fetchNowPlayingMovies();
  }, []);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });

    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filtered = prev[date].filter((t) => t !== time);
      if (filtered.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filtered };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0) {
      alert("Please fill all fields and add at least one date/time.");
      return;
    }

    const allShows = [];

    for (const date in dateTimeSelection) {
      dateTimeSelection[date].forEach((time) => {
        const showDateTime = `${date}T${time}`;
        allShows.push({
          movieId: selectedMovie.id,
          movieName: selectedMovie.title,
          showDateTime,
          price: showPrice,
        });
      });
    }

    console.log("Shows to be added:", allShows);
    alert("Shows added successfully!");

    setSelectedMovie(null);
    setDateTimeInput("");
    setShowPrice("");
    setDateTimeSelection({});
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="p-4 ml-20 md:ml-40 w-full overflow-auto">
        {nowPlayingMovies.length > 0 ? (
          <>
            <Title text1="Add" text2="Show" />

            <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
            <div className="flex flex-wrap gap-4 mt-4">
              {nowPlayingMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className={`cursor-pointer max-w-[160px] rounded overflow-hidden shadow hover:scale-105 transition-all duration-300 ${
                    selectedMovie?.id === movie.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-2 bg-gray-800 text-white text-sm">
                    <div className="flex justify-between items-center">
                      <p className="flex items-center gap-1 text-primary">
                        <StarIcon className="w-4 h-4 fill-yellow-400" />
                        {movie.vote_average.toFixed(1)}
                      </p>
                      <p>{movie.vote_count} votes</p>
                    </div>
                    <p className="mt-1 font-semibold truncate">{movie.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Movie Selection Dropdown */}
            <div className="mt-6 mb-4">
              <label className="block mb-2 font-medium">Select a Movie</label>
              <select
                value={selectedMovie?.id || ""}
                onChange={(e) => {
                  const movie = nowPlayingMovies.find(
                    (m) => String(m.id) === e.target.value
                  );
                  setSelectedMovie(movie || null);
                }}
                className="w-full p-2 border rounded bg-gray-500"
              >
                <option value="">-- Choose a Movie --</option>
                {nowPlayingMovies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Picker */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Show Date & Time</label>
              <div className="flex gap-2 items-center">
                <input
                  type="datetime-local"
                  value={dateTimeInput}
                  onChange={(e) => setDateTimeInput(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleDateTimeAdd}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Time
                </button>
              </div>
            </div>

            {/* Show Price */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Show Price ({currency})
              </label>
              <input
                type="number"
                value={showPrice}
                onChange={(e) => setShowPrice(e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
              />
            </div>

            {/* Added Timings Preview */}
            {Object.keys(dateTimeSelection).length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">Added Show Timings</h3>
                {Object.entries(dateTimeSelection).map(([date, times]) => (
                  <div key={date} className="mb-2">
                    <p className="font-medium">{date}</p>
                    <div className="flex gap-2 flex-wrap mt-1">
                      {times.map((time) => ( 
                        <div
                          key={time}
                          className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          <span>{time}</span>
                          <button
                            onClick={() => handleRemoveTime(date, time)}
                            className="text-red-500 hover:underline text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Show
            </button>
          </>
        ) : (
          <div>No movies available.</div>
        )}
      </div>
    </div>
  );
}
