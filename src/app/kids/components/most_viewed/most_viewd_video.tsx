import { Video } from "@/lib/firebase";
import { useEffect, useRef, useState } from "react";
import MostViewedCard from "./most_viewed_card";
import MostViewedBottomCard from "./most_viewed_video_bottom";

export default function MostViewedVideo({ videos }: { videos: Video[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRefBottom = useRef<HTMLDivElement>(null);
  const scrollContainerRefBottom2 = useRef<HTMLDivElement>(null);
  const scrollContainerRefBottom3 = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [showLeftScrollBottom, setShowLeftScrollBottom] = useState(false);
  const [showRightScrollBottom, setShowRightScrollBottom] = useState(true);
  const [showLeftScrollBottom2, setShowLeftScrollBottom2] = useState(false);
  const [showRightScrollBottom2, setShowRightScrollBottom2] = useState(true);
  const [showLeftScrollBottom3, setShowLeftScrollBottom3] = useState(false);
  const [showRightScrollBottom3, setShowRightScrollBottom3] = useState(true);


  console.log("videos on most viewed video", videos);
  console.log(videos);

  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setShowLeftScroll(container.scrollLeft > 0);
        setShowRightScroll(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScroll);
    return () => container?.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {

    const checkScrollBottom = () => {
      const container = scrollContainerRefBottom.current;
      if (container) {
        setShowLeftScrollBottom(container.scrollLeft > 0);
        setShowRightScrollBottom(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    const container = scrollContainerRefBottom.current;
    container?.addEventListener("scroll", checkScrollBottom);
    return () => container?.removeEventListener("scroll", checkScrollBottom);
  }, []);

  useEffect(() => {
    const checkScrollBottom2 = () => {
      const container = scrollContainerRefBottom2.current;
      if (container) {
        setShowLeftScrollBottom2(container.scrollLeft > 0);
        setShowRightScrollBottom2(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    const container = scrollContainerRefBottom2.current;
    container?.addEventListener("scroll", checkScrollBottom2);
    return () => container?.removeEventListener("scroll", checkScrollBottom2);
  }, []);

  useEffect(() => {
    const checkScrollBottom3 = () => {
      const container = scrollContainerRefBottom3.current;
      if (container) {
        setShowLeftScrollBottom3(container.scrollLeft > 0);
        setShowRightScrollBottom3(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    const container = scrollContainerRefBottom3.current;
    container?.addEventListener("scroll", checkScrollBottom3);
    return () => container?.removeEventListener("scroll", checkScrollBottom3);
  }, []);

  
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      // Instead of relying on finding an element, use our tv-card class width
      let cardWidth = 270; // Default HD size

      // Adjust based on screen width
      if (window.innerWidth >= 7680) {
        // 8K
        cardWidth = 490;
      } else if (window.innerWidth >= 2560) {
        // 3K/4K
        cardWidth = 390;
      } else if (window.innerWidth >= 1920) {
        // FHD
        cardWidth = 320;
      }

      const gap = 16;
      const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollBottom = (direction: "left" | "right" ) => {
    const container = scrollContainerRefBottom.current;
    if (container) {
      const cardWidth = 270; // Default HD size
      const gap = 16; 
      const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollBottom2 = (direction: "left" | "right") => {
    const container = scrollContainerRefBottom2.current;
    if (container) {
      const cardWidth = 270; // Default HD size
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollBottom3 = (direction: "left" | "right") => {
    const container = scrollContainerRefBottom3.current;
    if (container) {
      const cardWidth = 270; // Default HD size
      const gap = 16;

      const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };


    
  return videos.length > 0 ? (
    <div className="flex flex-col gap-4">
      <div
        className="flex flex-col rounded-lg bg-black/30 backdrop-blur-sm p-4"
        style={{
          borderRadius: "var(--radius)",
          width: "fit-content",
          maxWidth: "100%",
        }}
      >
        <h5 className="text-black tv-text-title font-[500] font-genos mb-2">
          Most Viewed
        </h5>
        <div className="relative w-full">
          {showLeftScroll && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
              aria-label="Scroll left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-2 snap-x scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              gap: "var(--space-md)",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            {videos.map((video) => (
              <div key={video.title} className="snap-start flex-shrink-0 gap-2">
                <MostViewedCard
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  type={video.type}
                  views={video.views}
                  videoType={video.videoType}
                  description={video.description}
                  duration={video.duration}
                  videoCount={videos.length}
                />
              </div>
            ))}
            {videos.map((video) => (
              <div key={video.title} className="snap-start flex-shrink-0 gap-2">
                <MostViewedCard
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  type={video.type}
                  views={video.views}
                  videoType={video.videoType}
                  description={video.description}
                  duration={video.duration}
                  videoCount={videos.length}
                />
              </div>
            ))}
          </div>
          {showRightScroll && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
              aria-label="Scroll right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto ">
        <div className="flex flex-col rounded-lg bg-white/10 backdrop-blur-sm p-4 overflow-hidden">
          <h5 className="text-black tv-text-title font-[500] font-genos mb-2">
            Most Viewed
          </h5>
          {showLeftScrollBottom && (
            <button
              onClick={() => scrollBottom("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
              aria-label="Scroll left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div
            ref={scrollContainerRefBottom}
            className="flex overflow-x-auto py-2 snap-x scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              gap: "var(--space-md)",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            {videos.map((video) => (
              <div key={video.title} className="snap-start flex-shrink-0 gap-2">
                <MostViewedBottomCard
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  type={video.type}
                  views={video.views}
                  videoType={video.videoType}
                  description={video.description}
                  duration={video.duration}
                  videoCount={videos.length}
                />
              </div>
            ))}
            {videos.map((video) => (
              <div key={video.title} className="snap-start flex-shrink-0 gap-2">
                <MostViewedBottomCard
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  type={video.type}
                  views={video.views}
                  videoType={video.videoType}
                  description={video.description}
                  duration={video.duration}
                  videoCount={videos.length}
                />
              </div>
            ))}
          </div>
          {showRightScrollBottom && (
            <button
              onClick={() => scrollBottom("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
              aria-label="Scroll right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-col rounded-lg bg-white/10 backdrop-blur-sm p-4 overflow-hidden">
          {showLeftScrollBottom2 && (
            <button
              onClick={() => scrollBottom2("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
              aria-label="Scroll left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div
            ref={scrollContainerRefBottom2}
            className="flex overflow-x-auto py-2 snap-x scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              gap: "var(--space-md)",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            {videos.map((video) => (
              <div key={video.title} className="snap-start flex-shrink-0 gap-2">
                <MostViewedBottomCard
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  type={video.type}
                  views={video.views}
                  videoType={video.videoType}
                  description={video.description}
                  duration={video.duration}
                  videoCount={videos.length}
                />
              </div>
            ))}
            {videos.map((video) => (
              <div key={video.title} className="snap-start flex-shrink-0 gap-2">
                <MostViewedBottomCard
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  type={video.type}
                  views={video.views}
                  videoType={video.videoType}
                  description={video.description}
                  duration={video.duration}
                  videoCount={videos.length}
                />
              </div>
            ))}
          </div>
          {showRightScrollBottom2 && (
            <button
              onClick={() => scrollBottom2("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
              aria-label="Scroll right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex flex-col rounded-lg bg-white/10 backdrop-blur-sm p-4 overflow-hidden">
          {showLeftScrollBottom3 && (
            <button
              onClick={() => scrollBottom3("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
              aria-label="Scroll left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div
            ref={scrollContainerRefBottom3}
            className="flex overflow-x-auto py-2 snap-x scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              gap: "var(--space-md)",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            {videos.map((video) => (
              <div key={video.title} className="snap-start flex-shrink-0 gap-2">
                <MostViewedBottomCard
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  type={video.type}
                  views={video.views}
                  videoType={video.videoType}
                  description={video.description}
                  duration={video.duration}
                  videoCount={videos.length}
                />
              </div>
            ))}
            {videos.map((video) => (
              <div key={video.title} className="snap-start flex-shrink-0 gap-2">
                <MostViewedBottomCard
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  type={video.type}
                  views={video.views}
                  videoType={video.videoType}
                  description={video.description}
                  duration={video.duration}
                  videoCount={videos.length}
                />
              </div>
            ))}
          </div>
          {showRightScrollBottom3 && (
            <button
              onClick={() => scrollBottom3("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
              aria-label="Scroll right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-black p-10 text-2xl font-bold flex justify-center items-center h-screen"></div>
  );
}
