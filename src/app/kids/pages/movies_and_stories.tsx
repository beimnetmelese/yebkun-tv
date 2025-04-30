import { Video } from "@/lib/firebase";
import { useEffect, useRef, useState } from "react";
import LatestMoviesCard from "../components/movies_and_stories/latest_movies_card";
import LatestMoviesSeries from "../components/movies_and_stories/latest_movies_series";
import { Series } from "../page";
import SeriesCard from "../components/movies_and_stories/series_card";

function MediaRow({ movies, series }: { movies: Video[]; series: Series[] }) {
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
  console.log('series',series)
  return (
    <div className="pb-1">
      <div className="relative w-full">
        <h1 className="text-black font-genos font-[500] text-sm">
          Latest Movies
        </h1>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-1 snap-x scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: "16px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        >
          {movies.map((item) => (
            <div key={item.id} className="snap-start flex">
              <LatestMoviesCard
                id={item.id}
                video={item.url}
                title={item.title}
                thumbnail={item.thumbnail}
                type={item.type}
                views={item.views}
                videoType={item.videoType}
                videoCount={movies.length}
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
      <div className="relative w-full">
        <h1 className="text-black font-genos font-[500] text-sm">Our Series</h1>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-1 snap-x scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: "16px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        >
          {series.map((seriesItem) => (
            <div key={seriesItem.id} className="snap-start flex-shrink-0 bg-black">
              <SeriesCard
                id={seriesItem.id}
                url={seriesItem.url}
                title={seriesItem.title}
                thumbnail={seriesItem.thumbnail}
                type="Series"
                views={seriesItem.views}
                videoType="series"
                description={seriesItem.description}
                numberOfEpisodes={seriesItem.numberOfEpisodes}
                seasons={seriesItem.seasons}
                episodes={seriesItem.episodes}
                videoCount={movies.length + series.length}
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

const MoviesAndStories = ({
  series,
  movies,
}: {
  series: Series[];
  movies: Video[];
}) => {

  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div
        className="flex flex-col rounded-lg backdrop-blur-sm p-4 overflow-hidden"
        style={{
          borderRadius: "var(--radius)",
          width: "fit-content",
          maxWidth: "100%",
        }}
      >
        <LatestMoviesSeries movies={movies} series={series} />
      </div>

      {/* Scrollable media categories */}
      <div className="flex flex-col mt-4">
        <div
          className="overflow-y-auto px-4"
          style={{
            height: "calc(100vh - 600px)",
          }} /* Reduced height to make room for related content */
        >
          <div className="space-y-1">
            <MediaRow movies={movies} series={series} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesAndStories;
