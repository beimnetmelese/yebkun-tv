import { Video } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


// function formatViews(views: number): string {
//   return views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views.toString();
// }

const MostViewedCard = ({
  id,
  url,
  title,
  thumbnail,
  videoType = "movie",
  videoCount,
}: Video & { videoCount: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Clear any pending timeouts to prevent race conditions
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set a small timeout to debounce rapid mouse movements
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);

      if (videoRef.current && !hasError) {
        try {
          // Ensure video source is valid before playing
          if (
            !videoRef.current.src &&
            videoRef.current.querySelector("source")
          ) {
            const source = videoRef.current.querySelector(
              "source"
            ) as HTMLSourceElement;
            videoRef.current.src = source.src;
          }

          if (videoRef.current.src) {
            const videoElement = videoRef.current;
            // Only attempt to play if video is paused
            if (videoElement.paused) {
              playPromiseRef.current = videoElement.play();
              if (playPromiseRef.current !== undefined) {
                playPromiseRef.current
                  .then(() => {
                    // Video started playing successfully
                    setIsVideoLoaded(true);
                  })
                  .catch((error) => {
                    // Only log real errors, not abort errors from normal interaction
                    if (error.name !== "AbortError") {
                      console.error("Video play error:", error);
                      setHasError(true);
                    }
                  });
              }
            }
          } else {
            console.warn("Video has no valid source");
            setHasError(true);
          }
        } catch (error) {
          console.error("Error playing video:", error);
          setHasError(true);
        }
      }
    }, 150); // Debounce delay
  };

  const handleMouseLeave = () => {
    // Clear any pending timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set timeout for leaving to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);

      if (videoRef.current) {
        const videoElement = videoRef.current;

        // Wait for any pending play promise to resolve before pausing
        const pauseVideo = () => {
          if (!videoElement.paused) {
            videoElement.pause();
          }
        };

        if (playPromiseRef.current) {
          playPromiseRef.current.then(pauseVideo).catch(() => {
            // Handle any play promise rejection and still try to pause
            pauseVideo();
          });
        } else {
          pauseVideo();
        }
      }
    }, 150); // Debounce delay
  };

  const handleVideoError = () => {
    setHasError(true);
    console.error("Video failed to load");
  };

  console.log(videoCount);
  console.log(screen.width);

  return (
    <div
      ref={containerRef}
      className={`w-[${screen.width / videoCount}px] h-[200px] relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 group`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/kids/${
          videoType === "story"
            ? "story"
            : videoType === "series"
            ? "series"
            : "movie"
        }/${encodeURIComponent(id)}`}
        className="block w-full h-full"
      >
        {/* Video Element */}
        {!hasError && (
          <video
            ref={videoRef}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered && isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
            muted
            playsInline
            poster={thumbnail}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={handleVideoError}
            preload="metadata"
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Thumbnail Image */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            isHovered && isVideoLoaded && !hasError
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
       
        </div>

        {/* Play Icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Type & Views */}
        {/* <div className="absolute bottom-0 left-0 w-full p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium tv-text-title line-clamp-1 mr-2">
              {title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded tv-text-badge">
                {type}
              </span>
              <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded tv-text-badge flex items-center">
                {formatViews(views)}
              </span>
            </div>
          </div>
        </div> */}
      </Link>
    </div>
  );
};

export default MostViewedCard;
