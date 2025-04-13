"use client";

import { useParams } from "next/navigation";
import VideoScreen from "../movie_screen";
import { useEffect, useState } from "react";
import { Episode, getAllContent, Video } from "@/lib/firebase";
import { Series } from "../../page";



export default function MoviePage() {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [series,setSeries] = useState<Series[]>([]);
  const params = useParams();
  const id = params.id as string;

useEffect(() => {
  const fetchData = async () => {
    const content = await getAllContent();
    for (const video of content.movies) {
      setAllVideos((prevVideos) => [...prevVideos, video]);
    }
    for (const video of content.funnyVideos) {
      setAllVideos((prevVideos) => [...prevVideos, video]);
    }

    for (const video of content.stories) {
      setAllVideos((prevVideos) => [...prevVideos, video]);
    }
  
    setSeries(content.series);
    
  };
  fetchData();
}, []);
  

  const video = allVideos.find((video: Video) => video.id === id);

  const episodesDatabase = series.flatMap((series) => series.episodes);
  const relatedVideos = allVideos.filter((video) => video.id !== id);
  const commonRelatedVideos = relatedVideos.filter((video) => video.videoType === video.videoType);

  if (!video) {
    return (
      <div className="text-white p-10">Video not found! ID: {id}</div>
    );
  }



  // Use the first episode for series, or the main video for movies

  const firstEpisode =
    episodesDatabase.length > 0
      ? episodesDatabase[0]
      : {
          id: "main",
          title: video.title,
          description: video.description || "",
          thumbnail: video.thumbnail,
          url: video.url,
          episodeNumber: 1,
        };

  return (
    video ? (
    <VideoScreen
      videoType={video.videoType as "movie" | "series" | "story" | "video"}
      videoId={video.id}
      videoTitle={video.title}
      videoDescription={video.description || ""}
      videoQuality={video.videoType === "movie" ? "HD" : "SD"}
      ageLimit={video.videoType === "movie" ? 12 : 18}
      yearPublished={video.videoType === "movie" ? 2023 : 2024}
      videoThumbnail={video.thumbnail}
      videoUrl={video.url}
      numberOfViews={video.views}
      videoDuration={video.duration || "120"}
      videoGenre={video.videoType === "series" ? "Kids" : "Funny"}
      videoRating={video.videoType === "series" ? "4.5" : "4.5"}
      numberOfEpisodes={video.videoType === "series" ? 1 : 0}
      numberOfSeasons={video.videoType === "series" ? 1 : 0}
      relatedVideos={commonRelatedVideos}
      videoEpisode={firstEpisode.episodeNumber?.toString() || "1"}
      videoSeason="1" 
      videoEpisodeTitle={firstEpisode.title}
      videoEpisodeDescription={firstEpisode.description}
      videoEpisodeThumbnail={firstEpisode.thumbnail}
      videoEpisodeUrl={firstEpisode.url}
      videoEpisodeDuration={video.duration || "120"}
      videoEpisodeGenre={video.videoType === "series" ? "Kids" : "Funny"}
      videoEpisodeRating={video.videoType === "series" ? "4.5" : "4.5"}
      videoEpisodeRelatedVideos={
        episodesDatabase.length > 0
          ? (episodesDatabase as Episode[])
          : [firstEpisode as Episode]
      }
      />
    ) : (
      <div className="text-black p-10 text-2xl font-bold flex justify-center items-center h-screen">Loading...</div>
    )
  );
}
