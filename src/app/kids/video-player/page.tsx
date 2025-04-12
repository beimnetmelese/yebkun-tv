"use client";

import { PauseCircle } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

// Use actual thumbnails from existing content
const RELATED_VIDEOS = [
  {
    id: 1,
    title: "Kung Fu Panda",
    duration: "03:45",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
  },
  {
    id: 2,
    title: "Shaun the Sheep",
    duration: "02:30",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
  },
  {
    id: 3,
    title: "Oggy and the Cockroaches",
    duration: "05:15",
    thumbnail: "/images/kids/thumb_nails/strange_world.png",
  },
  {
    id: 4,
    title: "Oscar's Oasis",
    duration: "01:45",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
  },
  {
    id: 5,
    title: "Zig and Sharko",
    duration: "04:20",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
  },
  {
    id: 6,
    title: "Little Krishna",
    duration: "03:10",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
  },
  {
    id: 7,
    title: "Tom and Jerry",
    duration: "02:55",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
  },
  {
    id: 8,
    title: "Peppa Pig",
    duration: "06:30",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
  },
];

// Create a related video card component
function RelatedVideoCard({
  title,
  duration,
  thumbnail,
}: {
  title: string;
  duration: string;
  thumbnail: string;
}) {
  return (
    <div className="relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
      <Image
        src={thumbnail}
        alt={title}
        width={240}
        height={135}
        className="object-cover w-full h-full"
        // If using mock paths, provide a fallback
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/images/kids/mockthumbnail1.jpg";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
        <p className="text-white text-sm truncate">{title}</p>
        <p className="text-white text-xs bg-black/50 px-1 rounded">
          {duration}
        </p>
      </div>
    </div>
  );
}

// Create a separate component that uses useSearchParams
function VideoPlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const relatedPanelRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showRelatedPanel, setShowRelatedPanel] = useState(false);
  const [relatedVideos] = useState(RELATED_VIDEOS);

  // Determine if this is a story view based on URL params
  const isStoryView = searchParams.get("type") === "story";

  // Get parameters from the URL
  const title = searchParams.get("title") || "Video";
  const url = searchParams.get("url") || "";
  const initialTime = parseFloat(searchParams.get("currentTime") || "0");

  // Handle touch events for swipe up gesture
  useEffect(() => {
    const container = containerRef.current;
    const relatedPanel = relatedPanelRef.current;
    if (!container || !relatedPanel) return;

    let startY = 0;
    let currentY = 0;
    let initialPanelVisible = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      initialPanelVisible = showRelatedPanel;
      touchStartYRef.current = startY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;

      currentY = e.touches[0].clientY;
      const diff = touchStartYRef.current - currentY;

      // If swiped up more than 50px and panel is hidden, show the panel
      if (diff > 50 && !initialPanelVisible) {
        setShowRelatedPanel(true);
      }

      // If swiped down more than 50px and panel is visible, hide the panel
      if (diff < -50 && initialPanelVisible) {
        setShowRelatedPanel(false);
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    // Handle clicks outside the related panel to close it
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showRelatedPanel &&
        relatedPanel &&
        !relatedPanel.contains(e.target as Node)
      ) {
        // Don't close if clicking on swipe indicator or any control buttons
        const target = e.target as HTMLElement;
        if (
          target.closest("[data-swipe-indicator]") ||
          target.closest("[data-control]")
        )
          return;

        setShowRelatedPanel(false);
      }
    };

    // Add event listeners to both container and related panel
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("mousedown", handleClickOutside);

    // Add specific listeners for the related panel
    relatedPanel.addEventListener("touchstart", handleTouchStart);
    relatedPanel.addEventListener("touchmove", handleTouchMove);
    relatedPanel.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("mousedown", handleClickOutside);

      relatedPanel.removeEventListener("touchstart", handleTouchStart);
      relatedPanel.removeEventListener("touchmove", handleTouchMove);
      relatedPanel.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showRelatedPanel]);

  // Function to reset the inactivity timer
  const resetInactivityTimer = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    setShowControls(true);

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showRelatedPanel) {
        setShowControls(false);
      }
    }, 3000); // Hide controls after 3 seconds of inactivity
  };

  // Set up mouse/touch event listeners for showing controls
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleMovement = () => {
      resetInactivityTimer();
    };

    // Add event listeners for mouse and touch events
    container.addEventListener("mousemove", handleMovement);
    container.addEventListener("touchstart", handleMovement);
    container.addEventListener("click", handleMovement);

    // Initial setup
    resetInactivityTimer();

    return () => {
      // Clean up event listeners
      container.removeEventListener("mousemove", handleMovement);
      container.removeEventListener("touchstart", handleMovement);
      container.removeEventListener("click", handleMovement);

      // Clear any existing timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showRelatedPanel]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Set volume to max
    videoElement.volume = 1.0;
    videoElement.muted = isMuted;

    // Set initial time
    if (initialTime > 0) {
      videoElement.currentTime = initialTime;
    }

    const handleLoadedMetadata = () => {
      videoElement.volume = 1.0; // ensure volume is set after metadata is loaded
      // Explicitly unmute the video
      videoElement.muted = false;

      // Try to play with sound - this handles autoplay restrictions in modern browsers
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay with sound started successfully
            videoElement.muted = false;
            setIsPlaying(true);
            // Hide controls after video starts playing
            resetInactivityTimer();
          })
          .catch((error) => {
            // Autoplay was prevented, show play button
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    };

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

    const handlePlay = () => {
      setIsPlaying(true);
      resetInactivityTimer();
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true); // Always show controls when paused
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(true); // Always show controls when ended
      setShowRelatedPanel(true); // Show related videos when video ends
    };

    // Add event listeners
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("durationchange", handleDurationChange);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    // Clean up event listeners
    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("durationchange", handleDurationChange);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [initialTime, isMuted]);

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Toggle play/pause with event parameter
  const togglePlayPause = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    resetInactivityTimer();
  };

  // Skip forward/backward
  const skip = (seconds: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.currentTime = Math.min(
      Math.max(0, videoElement.currentTime + seconds),
      videoElement.duration
    );
    resetInactivityTimer();
  };

  // Restart video
  const restartVideo = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.currentTime = 0;
    if (!isPlaying) {
      videoElement.play();
    }
    resetInactivityTimer();
  };

  // Handle click on progress bar
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (!progressBar || !video) return;

    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
    resetInactivityTimer();
  };

  // Toggle related videos panel
  const toggleRelatedPanel = () => {
    setShowRelatedPanel(!showRelatedPanel);
    setShowControls(true);
    resetInactivityTimer();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col w-full h-screen bg-black cursor-none"
      style={{ cursor: showControls ? "auto" : "none" }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        playsInline
        controls={false}
        autoPlay={true}
        onClick={(e) => togglePlayPause(e)}
      />

      {/* Top bar with back button and title - always above related panel */}
      <div
        className={`absolute top-0 left-0 w-full p-6 flex items-center gap-4 transition-opacity duration-300 z-30 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
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

      {/* Related Videos Panel */}
      <div
        ref={relatedPanelRef}
        className={`absolute bottom-0 left-0 w-full transition-transform duration-300 ease-out p-4 pt-6 rounded-t-3xl z-20 ${
          showRelatedPanel ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "40%", minHeight: "250px" }}
      >
        {/* Handle for dragging */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-14 h-1.5 rounded-full"></div>

        <div className="grid grid-cols-4 gap-4 overflow-y-auto h-[calc(100%-50px)] pr-2">
          {relatedVideos.map((video) => (
            <RelatedVideoCard
              key={video.id}
              title={video.title}
              duration={video.duration}
              thumbnail={video.thumbnail}
            />
          ))}
        </div>
      </div>

      {/* Bottom controls - now positioned above the related panel with z-index */}
      <div
        className={`absolute bottom-0 left-0 w-full p-6 transition-opacity duration-300 z-30 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: showRelatedPanel
            ? "transparent"
            : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
          bottom: showRelatedPanel ? "40%" : "0",
        }}
      >
        {/* Control buttons */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-8">
            <button
              onClick={(e) => restartVideo(e)}
              className="text-white hover:text-gray-300 transition-colors"
              data-control="restart"
            >
              <Image
                src={"/images/kids/restart.svg"}
                alt="restart"
                width={55}
                height={55}
                unoptimized
              />
            </button>

            <button
              onClick={(e) => skip(-15, e)}
              className="text-white hover:text-gray-300 transition-colors"
              data-control="rewind"
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
              onClick={(e) => togglePlayPause(e)}
              className="text-white hover:text-gray-300 transition-colors"
              data-control="playpause"
            >
              {isPlaying ? (
                <PauseCircle
                  className={`w-16 h-16 ${
                    isStoryView ? "text-blue-400" : "text-white"
                  }`}
                />
              ) : (
                <Image
                  src={"/images/kids/play.svg"}
                  alt="play"
                  width={75}
                  height={75}
                  unoptimized
                />
              )}
            </button>

            <button
              onClick={(e) => skip(15, e)}
              className="text-white hover:text-gray-300 transition-colors"
              data-control="forward"
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
        {/* Progress bar */}
        <div className="flex items-center justify-between w-full mb-4">
          <div
            ref={progressBarRef}
            className={`w-[94%] h-2 ${
              isStoryView ? "bg-blue-700/50" : "bg-gray-600/70"
            } rounded-full cursor-pointer`}
            onClick={handleProgressBarClick}
          >
            <div
              className={`h-full ${
                isStoryView ? "bg-blue-500" : "bg-red-500"
              } rounded-full transition-all`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Current time / Duration */}
          <div className="text-white text-xl font-[oswald]">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Swipe indicator - show only when related panel is hidden */}
        {!showRelatedPanel && (
          <div className="flex justify-center">
            <button
              onClick={toggleRelatedPanel}
              className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity"
              data-swipe-indicator="true"
            >
              <span className="text-xs mb-1">
                {isStoryView ? "Most Viewed Stories" : "Related Videos"}
              </span>
              <svg
                width="36"
                height="10"
                viewBox="0 0 36 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L18 8L34 2"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
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
