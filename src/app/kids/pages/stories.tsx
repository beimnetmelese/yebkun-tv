import { useEffect, useRef, useState } from "react";
import NewStories from "../components/new_stories/new_stories";
import NewStoriesCard from "../components/new_stories/new_stories_card";
import RelatedContent from "../components/related_content/related_content";

type StoryType = "Stories" | "Videos" | "Movies";
type VideoType = "series" | "movie" | "story";

interface StoryItem {
  id: string;
  video: string;
  title: string;
  thumbnail: string;
  type: StoryType;
  views: number;
  videoType: VideoType;
}

interface StoryCategory {
  title: string;
  stories: StoryItem[];
}

// Define 5 categories of stories with different content
const storyCategories: StoryCategory[] = [
  {
    title: "Popular Stories",
    stories: [
      {
        id: "BERFÎNA SPÎ Û HEFT QUTIK",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "BERFÎNA SPÎ Û HEFT QUTIK",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 2456,
        videoType: "story",
      },
      {
        id: "Eledîn û Lembeya Newaze",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Eledîn û Lembeya Newaze",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 3789,
        videoType: "story",
      },
      {
        id: "JACK Û DARA FASÛLYÊ",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Jack and the Beanstalk",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 4321,
        videoType: "story",
      },
      {
        id: "Keç Tilî",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Keç Tilî",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 6543,
        videoType: "story",
      },
      {
        id: "Mîrzayê Beqê",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Mîrzayê Beqê",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 5432,
        videoType: "story",
      },
    ],
  },
  {
    title: "Adventure Stories",
    stories: [
      {
        id: "adventure1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Jungle Safari",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 3245,
        videoType: "story",
      },
      {
        id: "adventure2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Mountain Climb",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 4532,
        videoType: "story",
      },
      {
        id: "adventure3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Ocean Explorers",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 2987,
        videoType: "story",
      },
      {
        id: "adventure4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Space Journey",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 5124,
        videoType: "story",
      },
      {
        id: "adventure5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Treasure Hunt",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 7685,
        videoType: "story",
      },
    ],
  },
  {
    title: "Fantasy Stories",
    stories: [
      {
        id: "fantasy1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Dragon Tales",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 8765,
        videoType: "story",
      },
      {
        id: "fantasy2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Magic Lamp",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 6543,
        videoType: "story",
      },
      {
        id: "fantasy3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Enchanted Forest",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 4321,
        videoType: "story",
      },
      {
        id: "fantasy4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Wizard School",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 7689,
        videoType: "story",
      },
      {
        id: "fantasy5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Fairy Kingdom",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 5432,
        videoType: "story",
      },
    ],
  },
  {
    title: "Animal Stories",
    stories: [
      {
        id: "animal1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Lion King",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 9876,
        videoType: "story",
      },
      {
        id: "animal2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Monkey Troubles",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 3456,
        videoType: "story",
      },
      {
        id: "animal3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Elephant Journey",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 6789,
        videoType: "story",
      },
      {
        id: "animal4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Dolphin Tales",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 4567,
        videoType: "story",
      },
      {
        id: "animal5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Tiger's Adventure",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 7890,
        videoType: "story",
      },
    ],
  },
  {
    title: "Educational Stories",
    stories: [
      {
        id: "educational1",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Science Fun",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 5678,
        videoType: "story",
      },
      {
        id: "educational2",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Math Adventures",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 3456,
        videoType: "story",
      },
      {
        id: "educational3",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "History Heroes",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 6789,
        videoType: "story",
      },
      {
        id: "educational4",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Nature Wonders",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 7890,
        videoType: "story",
      },
      {
        id: "educational5",
        video: "/images/kids/sample_videos/nesha.mp4",
        title: "Space Discovery",
        thumbnail: "/images/kids/thumb_nails/stories.png",
        type: "Stories",
        views: 6543,
        videoType: "story",
      },
    ],
  },
];

function StoryRow({ category }: { category: StoryCategory }) {
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
          className="flex overflow-x-auto py-1 snap-x scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: "16px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        >
          {category.stories.map((story) => (
            <div key={story.id} className="snap-start flex-shrink-0">
              <NewStoriesCard
                id={story.id}
                video={story.video}
                title={story.title}
                thumbnail={story.thumbnail}
                type={story.type}
                views={story.views}
                videoType={story.videoType}
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
  );
}

export default function Stories() {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="flex-shrink-0">
        <NewStories />
      </div>

      {/* Scrollable story categories */}
      <div className="flex flex-col mt-2">
        <h2 className="text-black tv-text-title font-[500] font-genos mt-4 mb-1 px-4 flex-shrink-0">
          Our Stories
        </h2>

        <div
          className="overflow-y-auto px-4"
          style={{
            height: "calc(100vh - 480px)",
          }} /* Reduced height to make room for related content */
        >
          <div className="space-y-1">
            {storyCategories.map((category) => (
              <StoryRow key={category.title} category={category} />
            ))}
          </div>
        </div>
      </div>

      {/* Related content section */}
      <div className="mt-4 px-4">
        <RelatedContent
          contentType="story"
          relatedItems={[
            {
              id: "nesha",
              title: "Nesha the Explorer",
              thumbnail: "/images/kids/thumb_nails/ice_age.png",
            },
            {
              id: "strange_world",
              title: "Strange World",
              thumbnail: "/images/kids/thumb_nails/strange_world.png",
            },
            {
              id: "BERFÎNA SPÎ Û HEFT QUTIK",
              title: "BERFÎNA SPÎ Û HEFT QUTIK",
              thumbnail: "/images/kids/thumb_nails/stories.png",
            },
            {
              id: "Eledîn û Lembeya Newaze",
              title: "Eledîn û Lembeya Newaze",
              thumbnail: "/images/kids/thumb_nails/stories.png",
            },
            {
              id: "JACK Û DARA FASÛLYÊ",
              title: "Jack and the Beanstalk",
              thumbnail: "/images/kids/thumb_nails/stories.png",
            },
            {
              id: "Keç Tilî",
              title: "Keç Tilî",
              thumbnail: "/images/kids/thumb_nails/stories.png",
            },
          ]}
        />
      </div>
    </div>
  );
}
