import { EyeIcon, LucideRefreshCcw, PlayIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SeriesBottomCard from "./series_bottom_card";

// Define a proper interface for the RelatedCard component
interface RelatedCardProps {
  thumbnail: string;
  title: string;
  description: string;
  url: string;
}

// Create the RelatedCard component
export function RelatedCard({
  thumbnail,
  title,
  description,
  url, // eslint-disable-line @typescript-eslint/no-unused-vars
}: RelatedCardProps) {
  return (
    <div className="flex-shrink-0 w-[250px]">
      <div className="w-full rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
        <div className="relative h-[140px] w-full">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="250px"
            className="object-cover"
          />
        </div>
        <div className="p-2">
          <h3 className="text-white text-sm font-bold truncate">{title}</h3>
          <p className="text-gray-300 text-xs line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  episodeNumber: number;
}

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  videoType: "series" | "movie" | "story";
}

interface VideoScreenProps {
  videoType: "movie" | "series" | "story";
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoQuality: string;
  ageLimit: number;
  yearPublished: number;
  videoThumbnail: string;
  videoUrl: string;
  numberOfViews: number;
  videoDuration: string;
  videoGenre: string;
  videoRating: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  relatedVideos: Video[];
  videoEpisode: string;
  videoSeason: string;
  videoEpisodeTitle: string;
  videoEpisodeDescription: string;
  videoEpisodeThumbnail: string;
  videoEpisodeUrl: string;
  videoEpisodeDuration: string;
  videoEpisodeGenre: string;
  videoEpisodeRating: string;
  videoEpisodeRelatedVideos: Episode[];
}

function VideoScreen({
  videoType,
  yearPublished,
  videoQuality,
  ageLimit,
  numberOfViews,
  videoId, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoTitle,
  videoDescription, // eslint-disable-line @typescript-eslint/no-unused-vars
  numberOfSeasons,
  numberOfEpisodes,
  videoThumbnail,
  videoUrl,
  videoDuration,
  videoGenre, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoRating, // eslint-disable-line @typescript-eslint/no-unused-vars
  relatedVideos, 
  videoEpisode, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoSeason, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoEpisodeTitle, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoEpisodeDescription, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoEpisodeThumbnail, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoEpisodeUrl, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoEpisodeDuration, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoEpisodeGenre, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoEpisodeRating, // eslint-disable-line @typescript-eslint/no-unused-vars
  videoEpisodeRelatedVideos,
}: VideoScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>([]);

  const storageKey = `video-progress-${videoTitle
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  useEffect(() => {
    const videoElement = videoRef.current;

    const updateProgress = () => {
      if (videoElement && videoElement.duration) {
        const percent =
          (videoElement.currentTime / videoElement.duration) * 100;
        setProgress(percent);
        localStorage.setItem(storageKey, videoElement.currentTime.toString());
      }
    };

    const restoreProgress = () => {
      const savedTime = localStorage.getItem(storageKey);
      if (savedTime && videoElement) {
        videoElement.currentTime = parseFloat(savedTime);
      }
    };

    restoreProgress();

    videoElement?.addEventListener("timeupdate", updateProgress);
    return () => {
      videoElement?.removeEventListener("timeupdate", updateProgress);
    };
  }, [storageKey]);

  useEffect(() => {
    const filtered = videoEpisodeRelatedVideos.filter((ep) =>
      ep.episodeNumber.toString().startsWith(selectedSeason.toString())
    );
    setSeasonEpisodes(filtered);
  }, [selectedSeason, videoEpisodeRelatedVideos]);

  const formatVideoDuration = (duration: string | number) => {
    const seconds =
      typeof duration === "string" ? parseInt(duration) : duration;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  const formatVideoDurationLeft = (duration: string | number) => {
    const seconds =
      typeof duration === "string" ? parseInt(duration) : duration;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h > 0 ? `${h} hr` : ""} ${m > 0 ? `${m} min` : ""}`.trim();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black relative">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        muted
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image src={videoThumbnail} alt={videoTitle} fill sizes="100vw" />
      </div>

      <div
        className="absolute top-0 left-0 w-[40%] h-full z-20 flex items-start justify-start flex-col pl-10 pt-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
        }}
      >
        <p className="text-white text-[90px] font-[700] font-[genos]">
          {videoTitle}
        </p>

        <div className="flex flex-row gap-5">
          <span className="bg-[rgba(255,255,255,0.25)] w-[80px] h-[30px] flex items-center justify-center gap-2 rounded-lg">
            <EyeIcon className="w-5 h-5 text-white" />
            <p className="text-white text-[16px] font-[400] font-[genos]">
              {numberOfViews}
            </p>
          </span>
          <span className="bg-[rgba(255,255,255,0.25)] w-[40px] h-[30px] flex items-center justify-center rounded-lg">
            <p className="text-white text-[16px] font-[400] font-[genos]">
              {ageLimit}
            </p>
          </span>
          <span className="bg-[rgba(255,255,255,0.25)] w-[50px] h-[30px] flex items-center justify-center rounded-lg">
            <p className="text-white text-[16px] font-[400] font-[genos]">
              {videoQuality}
            </p>
          </span>
        </div>

        <div className="gap-2 my-5 flex flex-row items-center justify-center">
          <span className="bg-[rgba(255,255,255,0.25)] w-[5px] h-[5px] rounded-full"></span>
          <p className="text-white text-[16px] font-[400] font-[genos]">
            {yearPublished}
          </p>
          <span className="bg-[rgba(255,255,255,0.25)] w-[5px] h-[5px] rounded-full"></span>
          {videoType !== "series" ? (
            <p className="text-white text-[16px] font-[400] font-[genos]">
              {formatVideoDuration(videoDuration)}
            </p>
          ) : (
            <>
              <p className="text-white text-[16px] font-[400] font-[genos]">
                {numberOfSeasons} {numberOfSeasons > 1 ? "Seasons" : "Season"}
              </p>
              <span className="bg-[rgba(255,255,255,0.25)] w-[5px] h-[5px] rounded-full"></span>
              <p className="text-white text-[16px] font-[400] font-[genos]">
                {numberOfEpisodes}{" "}
                {numberOfEpisodes > 1 ? "Episodes" : "Episode"}
              </p>
            </>
          )}
        </div>

        {videoType !== "series" && (
          <div className="flex flex-col gap-2 w-full items-start">
            <div className="flex flex-row gap-2 w-full items-center">
              <div className="w-[60%] h-[6px] bg-gray-200/50 z-30 rounded-full">
                <div
                  className="h-full bg-red-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-white text-[16px] font-[400] font-[genos]">
                {videoRef.current
                  ? formatVideoDuration(
                      parseInt(videoDuration) - videoRef.current.currentTime
                    )
                  : formatVideoDurationLeft(videoDuration)}{" "}
                left
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-8">
              <button className="bg-[#81B616] text-black px-4 py-2 rounded-full border-none flex flex-row gap-2 items-center justify-center">
                <PlayIcon className="w-5 h-5 text-white" />
                <p className="text-white text-[32px] font-[600] font-[genos]">
                  Continue
                </p>
              </button>
              <button className="bg-[#3D76E1] px-4 py-2 rounded-full flex gap-2 items-center">
                <LucideRefreshCcw className="w-5 h-5 text-white" />
                <p className="text-white text-[32px] font-[600] font-[genos]">
                  Restart
                </p>
              </button>
              <button className="bg-black/20 px-4 py-2 rounded-full border border-white flex gap-2 items-center">
                <p className="text-white text-[32px] font-[600] font-[genos]">
                  Trailer
                </p>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Series Bottom Panel */}
      {videoType === "series" && (
        <div className="absolute bottom-0 w-full z-30 p-6 bg-[rgba(0,0,0,0.6)]">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {Array.from({ length: numberOfSeasons }, (_, i) => (
              <button
                key={i}
                onClick={() => setSelectedSeason(i + 1)}
                className={`px-4 py-2 border ${
                  selectedSeason === i + 1
                    ? "bg-red-600 text-white border-red-600"
                    : "text-white border-white"
                } rounded-full font-[genos]`}
              >
                Season {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-4 overflow-x-auto">
            {seasonEpisodes.map((ep) => (
              <SeriesBottomCard
                key={ep.id}
                id={ep.id}
                thumbnail={ep.thumbnail}
                title={ep.title}
                description={ep.description}
                url={ep.url}
                episodeNumber={ep.episodeNumber}
              />
            ))}
          </div>
        </div>
      )}

      {/* Related for non-series */}
      {videoType !== "series" && relatedVideos.length > 0 && (
        <div className="absolute bottom-0 w-full z-30 p-6 bg-[rgba(0,0,0,0.6)]">
          <p className="text-white text-[32px] font-[700] font-[genos] mb-4">
            Related Videos
          </p>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {relatedVideos.map((vid) => (
              <RelatedCard
                key={vid.id}
                thumbnail={vid.thumbnail}
                title={vid.title}
                description={vid.description}
                url={vid.url}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoScreen;
