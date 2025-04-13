import { useEffect, useRef, useState } from "react";
import NewStories from "../components/new_stories/new_stories";
import NewStoriesCard from "../components/new_stories/new_stories_card";
import RelatedContent from "../components/related_content/related_content";
import { Video } from "@/lib/firebase";



function StoryRow({ stories }: {stories: Video[]}) {
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
      let cardWidth = 270;
      if (window.innerWidth >= 7680) cardWidth = 490;
      else if (window.innerWidth >= 2560) cardWidth = 390;
      else if (window.innerWidth >= 1920) cardWidth = 320;

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
          {stories.map((story: Video) => (
            <div key={story.id} className="snap-start flex-shrink-0">
              <NewStoriesCard
                id={story.id}
                video={story.url}
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

export default function Stories({stories}: {stories: Video[]}) {


  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="flex-shrink-0">
        <NewStories stories={stories} />
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
          }}
        >
          <div className="space-y-1">
            <StoryRow stories={stories} />
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
