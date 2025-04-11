import { EyeIcon, LucideRefreshCcw, PlayIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SeriesBottomCard from "./series_bottom_card";

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
  videoId,
  videoTitle,
  videoDescription,
  numberOfSeasons,
  numberOfEpisodes,
  videoThumbnail,
  videoUrl,
  videoDuration,
  videoGenre,
  videoRating,
  relatedVideos,
  videoEpisode,
  videoSeason,
  videoEpisodeTitle,
  videoEpisodeDescription,
  videoEpisodeThumbnail,
  videoEpisodeUrl,
  videoEpisodeDuration,
  videoEpisodeGenre,
  videoEpisodeRating,
  videoEpisodeRelatedVideos,
}: VideoScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4;
  const router = useRouter();

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
    const filtered = videoEpisodeRelatedVideos.filter(
      (ep) =>
        ep.episodeNumber &&
        ep.episodeNumber.toString().startsWith(selectedSeason.toString())
    );
    setSeasonEpisodes(filtered);
    setCurrentPage(0);
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

  const navigateToPlayer = (mode: "continue" | "restart" | "trailer") => {
    const currentTime =
      mode === "continue" ? videoRef.current?.currentTime || 0 : 0;
    const url =
      mode === "trailer" ? videoUrl.replace(".mp4", "_trailer.mp4") : videoUrl;

    router.push(
      `/kids/video-player?title=${encodeURIComponent(
        videoTitle
      )}&url=${encodeURIComponent(url)}&currentTime=${currentTime}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black relative">
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        muted
        ref={videoRef}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image src={videoThumbnail} alt={videoTitle} fill />
      </div>

      <div
        className="absolute top-0 left-0 w-[40%] h-full z-20 flex items-start justify-start flex-col pl-10 pt-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
        }}
      >
        <p className="text-white text-[90px] font-[700] font-[oswald]">
          {videoTitle}
        </p>

        <div className="flex flex-row gap-5">
          <span className="bg-[rgba(255,255,255,0.25)] w-[80px] h-[30px] flex items-center justify-center gap-2 rounded-lg">
            <EyeIcon className="w-5 h-5 text-white" />
            <p className="text-white text-[16px] font-[400] font-[oswald]">
              {numberOfViews}
            </p>
          </span>
          <span className="bg-[rgba(255,255,255,0.25)] w-[40px] h-[30px] flex items-center justify-center rounded-lg">
            <p className="text-white text-[16px] font-[400] font-[oswald]">
              {ageLimit}
            </p>
          </span>
          <span className="bg-[rgba(255,255,255,0.25)] w-[50px] h-[30px] flex items-center justify-center rounded-lg">
            <p className="text-white text-[16px] font-[400] font-[oswald]">
              {videoQuality}
            </p>
          </span>
        </div>

        <div className="gap-2 my-5 flex flex-row items-center justify-center">
          <span className="bg-[rgba(255,255,255,0.25)] w-[5px] h-[5px] rounded-full"></span>
          <p className="text-white text-[16px] font-[400] font-[oswald]">
            {yearPublished}
          </p>
          <span className="bg-[rgba(255,255,255,0.25)] w-[5px] h-[5px] rounded-full"></span>
          {videoType !== "series" ? (
            <p className="text-white text-[16px] font-[400] font-[oswald]">
              {formatVideoDuration(videoDuration)}
            </p>
          ) : (
            <>
              <p className="text-white text-[16px] font-[400] font-[oswald]">
                {numberOfSeasons} {numberOfSeasons > 1 ? "Seasons" : "Season"}
              </p>
              <span className="bg-[rgba(255,255,255,0.25)] w-[5px] h-[5px] rounded-full"></span>
              <p className="text-white text-[16px] font-[400] font-[oswald]">
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
              <div className="text-white text-[16px] font-[400] font-[oswald]">
                {videoRef.current
                  ? formatVideoDuration(
                      parseInt(videoDuration) - videoRef.current.currentTime
                    )
                  : formatVideoDurationLeft(videoDuration)}{" "}
                left
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-8">
              <button
                onClick={() => navigateToPlayer("continue")}
                className="bg-[#81B616] text-black px-4 py-2 rounded-full border-none flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-[#70a011] transition-colors"
              >
                <PlayIcon className="w-5 h-5 text-white" />
                <p className="text-white text-[32px] font-[600] font-[oswald]">
                  Continue
                </p>
              </button>
              <button
                onClick={() => navigateToPlayer("restart")}
                className="bg-[#3D76E1] px-4 py-2 rounded-full flex gap-2 items-center cursor-pointer hover:bg-[#3467c5] transition-colors"
              >
                <LucideRefreshCcw className="w-5 h-5 text-white" />
                <p className="text-white text-[32px] font-[600] font-[oswald]">
                  Restart
                </p>
              </button>
              <button
                onClick={() => navigateToPlayer("trailer")}
                className="bg-black/20 px-4 py-2 rounded-full border border-white flex gap-2 items-center cursor-pointer hover:bg-black/30 transition-colors"
              >
                <p className="text-white text-[32px] font-[600] font-[oswald]">
                  Trailer
                </p>
              </button>
            </div>
          </div>
        )}
      </div>

      {videoType === "series" && (
        <div className="absolute bottom-0 w-full z-30 p-6 bg-[rgba(0,0,0,0.6)]">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {Array.from({ length: numberOfSeasons }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedSeason(i + 1);
                  setCurrentPage(0);
                }}
                className={`px-4 py-2 border ${
                  selectedSeason === i + 1
                    ? "bg-red-600 text-white border-red-600"
                    : "text-white border-white"
                } rounded-full font-[oswald]`}
              >
                Season {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="flex flex-row items-center gap-4 w-full justify-center">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                className={`px-4 py-2 rounded-full font-[oswald] ${
                  currentPage === 0
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-white text-black"
                }`}
              >
                Prev
              </button>

              <div className="flex gap-4 overflow-x-auto max-w-[80vw]">
                {seasonEpisodes
                  .slice(
                    currentPage * pageSize,
                    currentPage * pageSize + pageSize
                  )
                  .map((ep) => (
                    <SeriesBottomCard
                      key={ep.id}
                      thumbnail={ep.thumbnail}
                      title={ep.title}
                      description={ep.description}
                      url={ep.url}
                      episodeNumber={ep.episodeNumber}
                    />
                  ))}
              </div>

              <button
                disabled={(currentPage + 1) * pageSize >= seasonEpisodes.length}
                onClick={() =>
                  setCurrentPage((prev) =>
                    (prev + 1) * pageSize < seasonEpisodes.length
                      ? prev + 1
                      : prev
                  )
                }
                className={`px-4 py-2 rounded-full font-[oswald] ${
                  (currentPage + 1) * pageSize >= seasonEpisodes.length
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-white text-black"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoScreen;
