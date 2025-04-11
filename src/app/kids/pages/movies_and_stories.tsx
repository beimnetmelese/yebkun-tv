import { useEffect, useRef, useState } from "react";
import LatestMoviesSeries from "../components/movies_and_stories/latest_movies_series";
import MoviesAndSeriesCard from "../components/movies_and_stories/movies_and_stories_card";
import RelatedContent from "../components/related_content/related_content";

type MediaType = "Stories" | "Videos" | "Movies";
type VideoType = "series" | "movie" | "story";

interface MediaItem {
  id: string;
  video: string;
  title: string;
  thumbnail: string;
  type: MediaType;
  views: number;
  videoType: VideoType;
}

interface MediaCategory {
  title: string;
  items: MediaItem[];
}

// Define movie and series categories
const mediaCategories: MediaCategory[] = [
  {
    title: "Latest Movies",
    items: [
      {
        id: "the_super_mario_bros",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "The Super Mario Bros",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Movies",
        views: 3542,
        videoType: "movie",
      },
      {
        id: "kung_fu_panda_3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Kung Fu Panda 3",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Movies",
        views: 5421,
        videoType: "movie",
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
        id: "the_lion_king",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "The Lion King",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Movies",
        views: 8765,
        videoType: "movie",
      },
      {
        id: "zootopia",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Zootopia",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Movies",
        views: 7621,
        videoType: "movie",
      },
      {
        id: "kung_fu_panda_3_2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Kung Fu Panda 3",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Movies",
        views: 5421,
        videoType: "movie",
      },
      {
        id: "mufasa1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Mufasa",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Movies",
        views: 9654,
        videoType: "movie",
      },
      {
        id: "the_lion_king1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "The Lion King",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Movies",
        views: 8765,
        videoType: "movie",
      },
      {
        id: "zootopia1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Zootopia",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Movies",
        views: 7621,
        videoType: "movie",
      },
    ],
  },
  {
    title: "Our Stories",
    items: [
      {
        id: "tom_and_jerry",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Tom and Jerry",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Stories",
        views: 7621,
        videoType: "story",
      },
      {
        id: "oscars_oasis1_1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Oscar's Oasis",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Stories",
        views: 8765,
        videoType: "story",
      },
      {
        id: "oggy_and_the_cockroaches1_1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Oggy and the Cockroaches",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Stories",
        views: 5421,
        videoType: "story",
      },
      {
        id: "shaun_the_sheep1_1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Shaun the Sheep",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Stories",
        views: 3542,
        videoType: "story",
      },
      {
        id: "zig_and_sharko1_1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Zig & Sharko",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Stories",
        views: 9654,
        videoType: "story",
      },
      {
        id: "oscars_oasis1_2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Oscar's Oasis",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Stories",
        views: 8765,
        videoType: "story",
      },
      {
        id: "oggy_and_the_cockroaches1_2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Oggy and the Cockroaches",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Stories",
        views: 5421,
        videoType: "story",
      },
      {
        id: "shaun_the_sheep1_2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Shaun the Sheep",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Stories",
        views: 3542,
        videoType: "story",
      },
      {
        id: "zig_and_sharko1_2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Zig & Sharko",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Stories",
        views: 9654,
        videoType: "story",
      },
    ],
  },
];

// Import the episodes database
const episodesDatabase = {
  nesha: [
    {
      id: "ep1",
      title: "Nesha and the Monkey",
      description: "Nesha meets a cheeky monkey who steals her map.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 1,
    },
    {
      id: "ep2",
      title: "The River Challenge",
      description: "Crossing a wild river isn't easy!",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 2,
    },
    {
      id: "ep3",
      title: "Lost in the Jungle",
      description: "A sudden storm gets Nesha lost.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 3,
    },
    {
      id: "ep4",
      title: "Jungle Dance Party",
      description: "The animals throw a party for Nesha.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 4,
    },
    {
      id: "ep5",
      title: "Map to the Waterfall",
      description: "Nesha follows a mysterious treasure map.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 5,
    },
    {
      id: "ep6",
      title: "Echo Cave",
      description: "Strange voices in a cave reveal a secret.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 6,
    },
    {
      id: "ep7",
      title: "The Bamboo Bridge",
      description: "Crossing a shaky bridge over crocodiles!",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 7,
    },
    {
      id: "ep8",
      title: "Forest Maze",
      description: "Nesha races against time in a jungle maze.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 8,
    },
    {
      id: "ep9",
      title: "Jungle Friends Forever",
      description: "Nesha says goodbye to her animal friends.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 9,
    },
    {
      id: "ep10",
      title: "Treasure Under the Tree",
      description: "The journey ends with a sparkling surprise.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 10,
    },
    {
      id: "ep11",
      title: "Nesha's New Adventure",
      description: "Nesha begins a new journey in the mountains.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 11,
    },
    {
      id: "ep12",
      title: "Mountain Mystery",
      description: "Strange footprints lead to an unexpected discovery.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 12,
    },
    {
      id: "ep13",
      title: "Snow Friends",
      description: "Nesha meets mountain animals during a snowstorm.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 13,
    },
    {
      id: "ep14",
      title: "The Hidden Cave",
      description: "A cave holds ancient secrets and beautiful crystals.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/images/kids/sample_videos/nesha.mp4",
      episodeNumber: 14,
    },
  ],
};

function MediaRow({ category }: { category: MediaCategory }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

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

  return (
    <div className="pb-1">
      <h5 className="text-black tv-text-title font-[500] font-genos mb-2">
        {category.title}
      </h5>
      <div className="relative w-full">
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
          {category.items.map((item) => (
            <div key={item.id} className="snap-start flex-shrink-0">
              <MoviesAndSeriesCard
                id={item.id}
                video={item.video}
                title={item.title}
                thumbnail={item.thumbnail}
                type={item.type}
                views={item.views}
                videoType={item.videoType}
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

export default function MoviesAndStories() {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="flex-shrink-0">
        <LatestMoviesSeries />
      </div>

      {/* Scrollable media categories */}
      <div className="flex flex-col mt-2">
        <h2 className="text-black tv-text-title font-[500] font-genos mb-1 px-4 flex-shrink-0">
          Our Movies & Series
        </h2>

        <div
          className="overflow-y-auto px-4"
          style={{
            height: "calc(100vh - 600px)",
          }} /* Reduced height to make room for related content */
        >
          <div className="space-y-1">
            {mediaCategories.map((category) => (
              <MediaRow key={category.title} category={category} />
            ))}
          </div>
        </div>
      </div>

      {/* Related content sections */}
      <div className="mt-4 px-4 space-y-6">
        {/* Series episodes */}
        <RelatedContent
          contentType="series"
          episodes={episodesDatabase.nesha.map((ep) => ({
            id: ep.id,
            title: ep.title,
            thumbnail: ep.thumbnail,
            episodeNumber: ep.episodeNumber,
            duration: "26:00", // Add a fixed duration since it's not in the original data
          }))}
          seasons={2}
        />

        {/* Related movies */}
        <RelatedContent
          contentType="movie"
          relatedItems={[
            {
              id: "nesha",
              title: "Nesha the Explorer",
              thumbnail: "/images/kids/thumb_nails/ice_age.png",
            },
            {
              id: "the_super_mario_bros",
              title: "The Super Mario Bros",
              thumbnail: "/images/kids/thumb_nails/ice_age.png",
            },
            {
              id: "kung_fu_panda_3",
              title: "Kung Fu Panda 3",
              thumbnail: "/images/kids/thumb_nails/inside_out.png",
            },
            {
              id: "mufasa",
              title: "Mufasa",
              thumbnail: "/images/kids/thumb_nails/ice_age.png",
            },
            {
              id: "the_lion_king",
              title: "The Lion King",
              thumbnail: "/images/kids/thumb_nails/strange_world.png",
            },
            {
              id: "strange_world",
              title: "Strange World",
              thumbnail: "/images/kids/thumb_nails/strange_world.png",
            },
          ]}
        />
      </div>
    </div>
  );
}
