"use client";

import { Episode, getAllContent, Video } from "@/lib/firebase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VideoScreen from "../../movie/movie_screen";
import { Series } from "../../page";

export default function SeriesPage() {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [allSeries, setSeries] = useState<Series[]>([]);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      const content = await getAllContent();
      setAllVideos([
        ...content.movies,
        ...content.funnyVideos,
        ...content.stories,
      ]);
      setSeries(content.series);
    };

    fetchData();
  }, []);

  const currentSeries = allSeries.find((series) => series.id === id);
  const relatedSeries = allSeries.filter((series) => series.id !== id);

  if (!currentSeries) {
    return <div className="text-white p-10">Series not found! ID: {id}</div>;
  }

  // Use the first episode for the series
  const firstEpisode =
    currentSeries.episodes.length > 0
      ? currentSeries.episodes[0]
      : {
          id: "main",
          title: currentSeries.title,
          description: currentSeries.description || "",
          thumbnail: currentSeries.thumbnail,
          url: currentSeries.url,
          episodeNumber: 1,
        };

  return currentSeries ? (
    <VideoScreen
      videoType="series"
      videoId={currentSeries.id}
      videoTitle={currentSeries.title}
      videoDescription={currentSeries.description}
      videoQuality="HD"
      ageLimit={7}
      yearPublished={2023}
      videoThumbnail={currentSeries.thumbnail}
      videoUrl={currentSeries.url}
      numberOfViews={currentSeries.views}
      videoDuration={currentSeries.duration || "120"}
      videoGenre="Kids"
      videoRating="4.5"
      numberOfEpisodes={currentSeries.numberOfEpisodes}
      numberOfSeasons={currentSeries.seasons}
      relatedVideos={allVideos.slice(0, 5)}
      videoEpisode="1"
      videoSeason="1"
      videoEpisodeTitle={firstEpisode.title}
      videoEpisodeDescription={firstEpisode.description}
      videoEpisodeThumbnail={firstEpisode.thumbnail}
      videoEpisodeUrl={firstEpisode.url}
      videoEpisodeDuration={currentSeries.duration || "120"}
      videoEpisodeGenre="Kids"
      videoEpisodeRating="4.5"
      videoEpisodeRelatedVideos={currentSeries.episodes as Episode[]}
    />
  ) : (
    <div className="text-black p-10 text-2xl font-bold flex justify-center items-center h-screen">
      Loading...
    </div>
  );
}
