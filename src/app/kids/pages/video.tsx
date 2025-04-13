import { useEffect, useRef, useState } from "react";
import MostViewedVideo from "../components/most_viewed/most_viewd_video";
import MostViewedCard from "../components/most_viewed/most_viewed_card";
import RelatedContent from "../components/related_content/related_content";
import { Video } from "@/lib/firebase";





function VideoRow({ videos }: { videos: Video[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  

 console.log(`videos: ${videos}`);  

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
          {videos.map((video) => (
            <div key={video.id} className="snap-start flex-shrink-0">
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

export default function Videos({videos}: {videos: Video[]}) {
  
   console.log(`videos: ${videos}`);
  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="flex-shrink-0">
          <MostViewedVideo videos={videos} />
        </div>

      {/* Scrollable video categories */}
      <div className="flex flex-col mt-4">
        <h2 className="text-black tv-text-title font-[500] font-[genos] mb-1 px-4 flex-shrink-0">
          Our Videos
        </h2>

        <div
          className="overflow-y-auto px-4"
          style={{ height: "calc(100vh - 350px)" }}
        >
          <div className="space-y-1">
            <VideoRow videos={videos} />
          </div>
        </div>
      </div>

      {/* Related content section - displayed at the bottom of the page */}
      <div className="mt-8">
        <RelatedContent
          contentType="series"
          episodes={[]}
          seasons={0}
        />
      </div>
    </div>
  );
}
