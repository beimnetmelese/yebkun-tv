import { useEffect, useRef, useState } from "react";
import MoviesAndSeriesCard from "./movies_and_stories_card";
import { Series } from "../../page";
import { Video } from "@/lib/firebase";



export default function LatestMoviesSeries({ movies, series} : {movies: Video[], series: Series[]}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  console.log(series)
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

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      // Instead of relying on finding an element, use our tv-card class width
      let cardWidth = 170; // Default portrait width

      // Adjust based on screen width
      if (window.innerWidth >= 7680) {
        // 8K
        cardWidth = 250;
      } else if (window.innerWidth >= 2560) {
        // 3K/4K
        cardWidth = 200;
      } else if (window.innerWidth >= 1920) {
        // FHD
        cardWidth = 190;
      }

      const gap = 16;
      const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="flex flex-col w-full rounded-lg bg-black/30 backdrop-blur-sm p-2"
      style={{
        borderRadius: "var(--radius)",
      }}
    >
      <h5 className="text-black tv-text-title font-[500] font-genos mb-1">
        Latest Movies and Series
      </h5>
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-1 snap-x scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: "var(--space-md)",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start flex-shrink-0">
              <MoviesAndSeriesCard
                id={movie.id}
                video={movie.url}
                title={movie.title}
                thumbnail={movie.thumbnail}
                type={movie.type}
                views={movie.views}
                videoType={movie.videoType}
              />
            </div>
          ))}
        </div>

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
  );
}
