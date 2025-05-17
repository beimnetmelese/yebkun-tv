"use client";

import { useRef, useState, useEffect } from "react";

const episodes = Array(10).fill({
  title: "Sample Clip",
  views: "159K",
  img: "/images/sample.jpg",
});

export default function VideoPlayerSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Toggle play/pause
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

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    resetTimeout();

    window.addEventListener("mousemove", resetTimeout);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimeout);
    };
  }, []);

  return (
    <div className="bg-[#1c1b1d] min-h-screen text-white p-4 space-y-6">
      {/* Video Player */}
      <div className="rounded-xl overflow-hidden bg-black shadow-lg max-w-4xl mx-auto relative group">
        <video
          ref={videoRef}
          className="w-full cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          poster="/images/adults/chef.jpg"
        >
          <source src="/images/adults/cooking.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Controls Overlay */}
        {showControls && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}

        {/* Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
        >
          {/* Progress Bar */}
          <div className="mb-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ff0000 ${
                  (currentTime / (duration || 1)) * 100
                }%, #4b5563 ${(currentTime / (duration || 1)) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-xs mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="text-white">
                {isPlaying ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button onClick={() => skip(-10)} className="text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                </svg>
              </button>
              <button onClick={() => skip(10)} className="text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            <button onClick={toggleFullscreen} className="text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Thumbnail List */}
      <section>
        <h2
          className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
          style={{ backgroundColor: "#FFFFFF40" }}
        >
          Music Clip
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {[
            "/images/adults/podcast.jpg",
            "/images/adults/chef.png",
            "/images/adults/live.jpg",
            "/images/adults/podcast.jpg",
          ].map((label, i) => (
            <div
              key={i}
              className="w-full relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
            >
              <img
                src={label}
                alt="Chef"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                <span className="bg-gray-800 text-xs mr-2 px-2 py-0.5 rounded-md">
                  nu ye
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <button className="flex items-center space-x-2 bg-white text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-white-700 transition">
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
              <div className="absolute bottom-3 left-3">
                <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                  Clip Name
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                  Clip Name
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
