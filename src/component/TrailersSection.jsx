import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";

export default function TrailersSection() {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentTrailer]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-24 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      {/* === Trailer Player === */}
      <div ref={videoRef} className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        <ReactPlayer
          url={currentTrailer.videoUrl}
          controls={true}
          playing={true}
          muted={true} // Optional for autoplay
          className="mx-auto"
          width="960px"
          height="540px"
        />
      </div>

      {/* === Trailer Thumbnails === */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            onClick={() => setCurrentTrailer(trailer)}
            className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition ${
              trailer.videoUrl === currentTrailer.videoUrl
                ? "border-white"
                : "border-transparent"
            }`}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="w-full h-full object-cover brightness-75 group-hover:brightness-90"
            />
            <PlayCircleIcon
              className="absolute inset-0 m-auto w-10 h-10 text-white opacity-80 group-hover:opacity-100 transition"
              strokeWidth={1.6}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
