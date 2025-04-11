import Image from "next/image";
import { useState } from "react";

// Types for the component
type ContentType = "series" | "movie" | "story";

interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  episodeNumber: number;
  duration?: string;
}

interface RelatedItem {
  id: string;
  title: string;
  thumbnail: string;
}

interface RelatedContentProps {
  contentType: ContentType;
  relatedItems?: RelatedItem[];
  episodes?: Episode[];
  seasons?: number;
}

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="relative w-[150px] md:w-[200px] lg:w-[250px] flex-shrink-0 group cursor-pointer">
      <div className="h-[100px] md:h-[140px] lg:h-[160px] rounded-lg overflow-hidden relative">
        <Image
          src={episode.thumbnail}
          alt={episode.title}
          fill
          sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 250px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          EP {episode.episodeNumber}
        </div>
        {episode.duration && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {episode.duration}
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-white text-sm font-medium truncate">
          {episode.title}
        </p>
      </div>
    </div>
  );
}

export function RelatedVideoCard({ item }: { item: RelatedItem }) {
  return (
    <div className="relative w-[150px] md:w-[200px] lg:w-[250px] flex-shrink-0 group cursor-pointer">
      <div className="h-[100px] md:h-[140px] lg:h-[160px] rounded-lg overflow-hidden relative">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 250px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-2">
        <p className="text-white text-sm font-medium truncate">{item.title}</p>
      </div>
    </div>
  );
}

export default function RelatedContent({
  contentType,
  relatedItems = [],
  episodes = [],
  seasons = 1,
}: RelatedContentProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5; // Number of episodes to show per page

  // Filter episodes by selected season (for series)
  const filteredEpisodes =
    contentType === "series"
      ? episodes.filter(
          (ep) => Math.ceil(ep.episodeNumber / 10) === selectedSeason
        )
      : [];

  return (
    <div className="w-full bg-black/30 backdrop-blur-sm rounded-lg p-4">
      {contentType === "series" ? (
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Episodes</h3>

          {/* Season selector */}
          {seasons > 1 && (
            <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
              {Array.from({ length: seasons }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedSeason(i + 1);
                    setCurrentPage(0);
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSeason === i + 1
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  Season {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Episodes */}
          <div className="relative">
            <div className="flex items-center">
              {/* Prev button */}
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                className={`mr-2 rounded-full h-8 w-8 flex items-center justify-center ${
                  currentPage === 0
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                &lt;
              </button>

              {/* Episodes */}
              <div className="flex-1 overflow-hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {filteredEpisodes
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((episode) => (
                      <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                </div>
              </div>

              {/* Next button */}
              <button
                disabled={
                  (currentPage + 1) * pageSize >= filteredEpisodes.length
                }
                onClick={() =>
                  setCurrentPage((p) =>
                    (p + 1) * pageSize < filteredEpisodes.length ? p + 1 : p
                  )
                }
                className={`ml-2 rounded-full h-8 w-8 flex items-center justify-center ${
                  (currentPage + 1) * pageSize >= filteredEpisodes.length
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Related Videos</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {relatedItems.map((item) => (
              <RelatedVideoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
