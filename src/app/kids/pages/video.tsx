import { useEffect, useRef, useState } from "react";
import MostViewedVideo from "../components/most_viewed/most_viewd_video";
import MostViewedCard from "../components/most_viewed/most_viewed_card";
import RelatedContent from "../components/related_content/related_content";

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

type VideoType = "Stories" | "Videos" | "Movies";
type ContentType = "series" | "movie" | "story";

interface VideoItem {
  id: string;
  video: string;
  title: string;
  thumbnail: string;
  type: VideoType;
  views: number;
  videoType: ContentType;
}

interface VideoCategory {
  title: string;
  videos: VideoItem[];
}

// Define 5 categories of videos with different content
const videoCategories: VideoCategory[] = [
  {
    title: "Popular Videos",
    videos: [
      {
        id: "popvid1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Toy Story Adventures",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 45689,
        videoType: "series",
      },
      {
        id: "popvid2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Peppa's Big Day",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Videos",
        views: 32456,
        videoType: "series",
      },
      {
        id: "popvid3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "PAW Patrol Rescue",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Videos",
        views: 67890,
        videoType: "series",
      },
      {
        id: "popvid4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Bluey's Playdate",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Videos",
        views: 54321,
        videoType: "series",
      },
      {
        id: "popvid5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Mickey Mouse Clubhouse",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 98765,
        videoType: "series",
      },
    ],
  },
  {
    title: "Educational Videos",
    videos: [
      {
        id: "eduvid1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Learning Numbers",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 23456,
        videoType: "series",
      },
      {
        id: "eduvid2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Colors and Shapes",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Videos",
        views: 34567,
        videoType: "series",
      },
      {
        id: "eduvid3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Animal Facts",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Videos",
        views: 45678,
        videoType: "series",
      },
      {
        id: "eduvid4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Science Experiments",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Videos",
        views: 56789,
        videoType: "series",
      },
      {
        id: "eduvid5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Exploring Space",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 67890,
        videoType: "series",
      },
    ],
  },
  {
    title: "Music Videos",
    videos: [
      {
        id: "musicvid1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Nursery Rhymes Collection",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 78901,
        videoType: "series",
      },
      {
        id: "musicvid2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Dance Along Songs",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Videos",
        views: 89012,
        videoType: "series",
      },
      {
        id: "musicvid3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Baby Shark and Friends",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Videos",
        views: 90123,
        videoType: "series",
      },
      {
        id: "musicvid4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Alphabet Songs",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Videos",
        views: 12345,
        videoType: "series",
      },
      {
        id: "musicvid5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Musical Instruments",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 23456,
        videoType: "series",
      },
    ],
  },
  {
    title: "Animated Shorts",
    videos: [
      {
        id: "shortvid1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Pixar Shorts",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 34567,
        videoType: "series",
      },
      {
        id: "shortvid2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Funny Animal Adventures",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Videos",
        views: 45678,
        videoType: "series",
      },
      {
        id: "shortvid3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Tiny Tales",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Videos",
        views: 56789,
        videoType: "series",
      },
      {
        id: "shortvid4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "5-Minute Stories",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Videos",
        views: 67890,
        videoType: "series",
      },
      {
        id: "shortvid5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Adventures of Pingu",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 78901,
        videoType: "series",
      },
    ],
  },
  {
    title: "Nature Videos",
    videos: [
      {
        id: "naturevid1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Ocean Wonders",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 89012,
        videoType: "series",
      },
      {
        id: "naturevid2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Jungle Explorers",
        thumbnail: "/images/kids/thumb_nails/strange_world.png",
        type: "Videos",
        views: 90123,
        videoType: "series",
      },
      {
        id: "naturevid3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Amazing Animals",
        thumbnail: "/images/kids/thumb_nails/inside_out.png",
        type: "Videos",
        views: 12345,
        videoType: "series",
      },
      {
        id: "naturevid4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Dinosaur Discovery",
        thumbnail: "/images/kids/thumb_nails/cartoon.png",
        type: "Videos",
        views: 23456,
        videoType: "series",
      },
      {
        id: "naturevid5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Planets and Stars",
        thumbnail: "/images/kids/thumb_nails/ice_age.png",
        type: "Videos",
        views: 34567,
        videoType: "series",
      },
    ],
  },
];

function VideoRow({ category }: { category: VideoCategory }) {
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
      <div className="relative w-full">
        {showLeftScroll && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center text-white"
            style={{ minWidth: "32px", minHeight: "32px" }}
          >
            ◀
          </button>
        )}
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
          {category.videos.map((video) => (
            <div key={video.id} className="snap-start flex-shrink-0">
              <MostViewedCard
                id={video.id}
                video={video.video}
                title={video.title}
                thumbnail={video.thumbnail}
                type={video.type}
                views={video.views}
                videoType={video.videoType}
              />
            </div>
          ))}
        </div>
        {showRightScroll && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center text-white"
            style={{ minWidth: "32px", minHeight: "32px" }}
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}

export default function Video() {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="flex-shrink-0">
        <MostViewedVideo />
      </div>

      {/* Scrollable video categories */}
      <div className="flex flex-col mt-2">
        <h2 className="text-black tv-text-title font-[500] font-genos mb-1 px-4 flex-shrink-0">
          Our Videos
        </h2>

        <div
          className="overflow-y-auto px-4"
          style={{ height: "calc(100vh - 350px)" }}
        >
          <div className="space-y-1">
            {videoCategories.map((category) => (
              <VideoRow key={category.title} category={category} />
            ))}
          </div>
        </div>
      </div>

      {/* Related content section - displayed at the bottom of the page */}
      <div className="mt-8">
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
      </div>
    </div>
  );
}
