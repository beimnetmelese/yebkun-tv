"use client";

import { PauseCircle, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

// Create a separate component that uses useSearchParams
function VideoPlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // Get parameters from the URL
  const title = searchParams.get("title") || "Video";
  const url = searchParams.get("url") || "";
  const initialTime = parseFloat(searchParams.get("currentTime") || "0");

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Set initial time
    if (initialTime > 0) {
      videoElement.currentTime = initialTime;
    }

    const handleTimeUpdate = () => {
      if (videoElement) {
        setCurrentTime(videoElement.currentTime);
        setProgress((videoElement.currentTime / videoElement.duration) * 100);
      }
    };

    const handleDurationChange = () => {
      if (videoElement) {
        setDuration(videoElement.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    // Add event listeners
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("durationchange", handleDurationChange);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    // Clean up event listeners
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("durationchange", handleDurationChange);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [initialTime]);

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.currentTime = Math.min(
      Math.max(0, videoElement.currentTime + seconds),
      videoElement.duration
    );
  };

  // Handle click on progress bar
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (!progressBar || !video) return;

    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  return (
    <div className="relative flex flex-col w-full h-screen bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        autoPlay
      />

      {/* Top bar with back button and title */}
      <div className="absolute top-0 left-0 w-full p-6 flex items-center gap-4 bg-gradient-to-b from-black to-transparent">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <Image
            src={"/images/kids/back_arrow.svg"}
            alt="back"
            width={10}
            height={10}
            unoptimized
          />
        </button>
        <h1 className="text-white text-3xl font-bold font-[oswald] truncate">
          {title}
        </h1>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
        {/* Control buttons */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-8">
            <button
              onClick={() => skip(-15)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Image
                src={"/images/kids/rewind15.svg"}
                alt="back15"
                width={75}
                height={75}
                unoptimized
              />
            </button>

            <button
              onClick={togglePlayPause}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isPlaying ? (
                <PauseCircle className="w-16 h-16" />
              ) : (
                <PlayCircle className="w-16 h-16" />
              )}
            </button>

            <button
              onClick={() => skip(15)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Image
                src={"/images/kids/forward15.svg"}
                alt="forward15"
                width={75}
                height={75}
                unoptimized
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="w-[94%] h-2 bg-gray-600 rounded-full cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Current time / Duration */}
          <div className="text-white text-xl font-[oswald]">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the component in a Suspense boundary
export default function VideoPlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-black flex items-center justify-center text-white text-2xl">
          Loading...
        </div>
      }
    >
      <VideoPlayer />
    </Suspense>
  );
}
