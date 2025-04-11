import { useEffect, useRef, useState } from "react";
import MoviesAndSeriesCard from "./movies_and_stories_card";

interface NewStoriesCardProps {
  id: string;
  video: string;
  title: string;
  thumbnail: string;
  type: "Stories" | "Videos" | "Movies" | "Series";
  views: number;
  videoType?: "series" | "movie" | "story";
}

const mostViewedMovies: NewStoriesCardProps[] = [
  {
    id: "the_super_mario_bros",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "The Super Mario Bros",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    type: "Series",
    views: 3542,
    videoType: "movie",
  },

  {
    id: "the_lion_king",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "The Lion King",
    thumbnail: "/images/kids/thumb_nails/strange_world.png",
    type: "Series",
    views: 8765,
    videoType: "story",
  },

  {
    id: "kung_fu_panda_3",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Kung Fu Panda 3",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
    type: "Videos",
    views: 5421,
    videoType: "series",
  },

  {
    id: "tom_and_jerry3",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Tom and Jerry",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
    type: "Videos",
    views: 7621,
    videoType: "series",
  },
  {
    id: "mufasa",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Mufasa",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    type: "Movies",
    views: 9654,
    videoType: "movie",
  },
  {
    id: "the_super_mario_bros1",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "The Super Mario Bros",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    type: "Series",
    views: 3542,
    videoType: "movie",
  },
  {
    id: "kung_fu_panda_33",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Kung Fu Panda 3",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
    type: "Videos",
    views: 5421,
    videoType: "series",
  },

  {
    id: "tom_and_jerry2",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Tom and Jerry",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
    type: "Videos",
    views: 7621,
    videoType: "series",
  },
  {
    id: "kung_fu_panda_31",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Kung Fu Panda 3",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
    type: "Videos",
    views: 5421,
    videoType: "series",
  },

  {
    id: "tom_and_jerry1",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Tom and Jerry",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
    type: "Videos",
    views: 7621,
    videoType: "series",
  },
];

export default function LatestMoviesSeries() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(3);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1280) {
        setVisibleCards(2);
      } else if (width < 1920) {
        setVisibleCards(3);
      } else if (width < 3840) {
        setVisibleCards(4);
      } else {
        setVisibleCards(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Display more cards than just visible to enable smooth scrolling
  const displayedMovies = mostViewedMovies.slice(
    0,
    Math.min(mostViewedMovies.length, visibleCards * 2)
  );

  return (
    <div
      className="flex flex-col w-full rounded-lg bg-black/30 backdrop-blur-sm p-4"
      style={{
        borderRadius: "var(--radius)",
      }}
    >
      <h5 className="text-black tv-text-title font-[500] font-genos mb-2">
        Latest Movies and Series
      </h5>
      <div className="relative w-full">
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
          {displayedMovies.map((movie) => (
            <div key={movie.title} className="snap-start flex-shrink-0">
              <MoviesAndSeriesCard
                id={movie.id}
                video={movie.video}
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
