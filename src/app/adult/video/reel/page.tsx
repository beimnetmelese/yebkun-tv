"use client";
import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function VideoFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white px-4 py-6 flex flex-col gap-6 items-center">
      {/* Top Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-7xl">
        {[
          "/images/adults/podcast.jpg",
          "/images/adults/chef.png",
          "/images/adults/live.jpg",
          "/images/adults/podcast.jpg",
        ].map((label, i) => (
          <div
            key={i}
            className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
          >
            {/* BACKGROUND IMAGE */}
            <img
              src={label}
              alt="Chef"
              className={
                "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              }
            />

            {/* DARK GRADIENT OVERLAY */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* TOP-RIGHT CHANNEL INFO */}
            <div className="absolute bottom-3 right-3 flex flex-col items-end text-white space-y-1">
              <span className="bg-gray-800 text-xs mr-2 px-2 py-0.5 rounded-md">
                📺 159K
              </span>
            </div>

            {/* TOP-LEFT WATCH BUTTON */}
            <div className="absolute bottom-3 left-3">
              <button className="flex items-center space-x-2 bg-white text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-gray-200 transition">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 8.64v6.72L15.27 12 10 8.64z" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </button>
            </div>

            {/* BOTTOM-LEFT WATCH BUTTON */}
            <div className="absolute top-3 right-3">
              <button className="flex items-center space-x-2 bg-white text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-gray-200 transition">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 8.64v6.72L15.27 12 10 8.64z" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Center Reel Area */}
      <div className="relative w-full max-w-4xl flex items-center justify-center gap-6 mt-8">
        {/* Left Icon Strip */}
        <div className="flex flex-col justify-end items-center h-[480px]">
          <div className="flex flex-col gap-3 mb-4">
            {[
              "/images/adults/podcast.jpg",
              "/images/adults/podcast.jpg",
              "/images/adults/podcast.jpg",
              "/images/adults/podcast.jpg",
            ].map((icon, i) => (
              <img key={i} src={icon} className="w-10 h-10 rounded-full" />
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-10">
          <FaArrowLeft />
        </button>

        {/* Video Reel */}
        <div
          className="relative w-[270px] h-[480px] bg-black rounded-xl overflow-hidden shadow-lg cursor-pointer"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/images/adults/cooking.mp4"
            loop
          />
        </div>

        <div className="flex items-center gap-2 bg-[#222] px-4 py-2 rounded-xl text-sm self-end mt-6 mr-6">
          <img src="/images/user.jpg" className="w-6 h-6 rounded-full" />
          <span>Shevan Perwer</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">Song name</span>
        </div>

        {/* Right Arrow */}
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-10">
          <FaArrowRight />
        </button>
      </div>

      {/* Bottom Info - right side */}
    </div>
  );
}
