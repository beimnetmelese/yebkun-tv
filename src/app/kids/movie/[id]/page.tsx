"use client";

import { useParams } from "next/navigation";
import VideoScreen from "../movie_screen";

// Type definitions
type MediaType = "Stories" | "Videos" | "Movies" | "Series";
type VideoType = "series" | "movie" | "story";

interface MediaItem {
  id: string;
  video: string;
  title: string;
  thumbnail: string;
  type: MediaType;
  views: number;
  videoType: VideoType;
  description?: string;
  episodeNumber?: number;
  quality?: string;
  ageLimit?: number;
  yearPublished?: number;
  duration?: string;
  genre?: string;
  rating?: string;
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
}

// Combined videos database
const allVideos: Record<string, MediaItem> = {
  // Videos from latest_movies
  "Funny Animals 1": {
    id: "Funny Animals 1",
    video: "/videos/Funny Videos/Funny Animals 1.mp4",
    title: "Funny Animals 1",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 100,
    videoType: "movie",
    description: "A collection of funny animal clips",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "120", // in seconds
    genre: "Comedy",
    rating: "4.5",
  },
  "Funny Animals 2": {
    id: "Funny Animals 2",
    video: "/videos/Funny Videos/Funny Animals 2.mp4",
    title: "Funny Animals 2",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 200,
    videoType: "movie",
    description: "More funny animal clips",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "180", // in seconds
    genre: "Comedy",
    rating: "4.3",
  },
  "Funny Animals 3": {
    id: "Funny Animals 3",
    video: "/videos/Funny Videos/Funny Animals 3.mp4",
    title: "Funny Animals 3",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 300,
    videoType: "movie",
    description: "Even more funny animal clips",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "150", // in seconds
    genre: "Comedy",
    rating: "4.7",
  },
  "Funny Babies": {
    id: "Funny Babies",
    video: "/videos/Funny Videos/Funny Babies.mp4",
    title: "Funny Babies",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 400,
    videoType: "movie",
    description: "Adorable and funny baby moments",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "200", // in seconds
    genre: "Comedy",
    rating: "4.8",
  },
  "Funny Babies 2": {
    id: "Funny Babies 2",
    video: "/videos/Funny Videos/Funny Baby.mp4",
    title: "Funny Babies 2",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 500,
    videoType: "movie",
    description: "More adorable and funny baby moments",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "210", // in seconds
    genre: "Comedy",
    rating: "4.6",
  },
  "Funny Animals 4": {
    id: "Funny Animals 4",
    video: "/videos/Funny Videos/Funny Animals 1.mp4", // Reusing video
    title: "Funny Animals 4",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 600,
    videoType: "movie",
    description: "Another collection of funny animal clips",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "180", // in seconds
    genre: "Comedy",
    rating: "4.4",
  },
  "Funny Animals 5": {
    id: "Funny Animals 5",
    video: "/videos/Funny Videos/Funny Animals 2.mp4", // Reusing video
    title: "Funny Animals 5",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 700,
    videoType: "movie",
    description: "More funny animal clips collection",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "160", // in seconds
    genre: "Comedy",
    rating: "4.2",
  },
  "Funny Animals 6": {
    id: "Funny Animals 6",
    video: "/videos/Funny Videos/Funny Animals 3.mp4", // Reusing video
    title: "Funny Animals 6",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 800,
    videoType: "movie",
    description: "Final collection of funny animal clips",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "190", // in seconds
    genre: "Comedy",
    rating: "4.9",
  },
  "Funny Babies 3": {
    id: "Funny Babies 3",
    video: "/videos/Funny Videos/Funny Babies.mp4", // Reusing video
    title: "Funny Babies 3",
    thumbnail: "/images/kids/thumb_nails/cow.png",
    type: "Videos",
    views: 900,
    videoType: "movie",
    description: "Final collection of funny baby moments",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2023,
    duration: "220", // in seconds
    genre: "Comedy",
    rating: "4.7",
  },

  // Original nesha series
  nesha: {
    id: "nesha",
    title: "Nesha the Explorer",
    description: "An exciting journey through the jungle.",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    video: "/images/kids/sample_videos/nesha.mp4",
    type: "Stories",
    views: 3542,
    videoType: "series",
    quality: "HD",
    ageLimit: 7,
    yearPublished: 2023,
    duration: "1560", // in seconds
    genre: "Adventure",
    rating: "4.5",
    numberOfEpisodes: 10,
    numberOfSeasons: 2,
  },

  // Movies and Stories videos - From movies_and_stories.tsx
  the_super_mario_bros: {
    id: "the_super_mario_bros",
    video:
      "/videos/Movies & Series/Movies/Der Super Mario Bros. Film  Trailer.mp4",
    title: "The Super Mario Bros",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    type: "Movies",
    views: 3542,
    videoType: "movie",
    description:
      "Join Mario and Luigi on an adventure to save the Mushroom Kingdom.",
    quality: "HD",
    ageLimit: 5,
    yearPublished: 2023,
    duration: "600", // in seconds
    genre: "Animation",
    rating: "4.7",
  },
  kung_fu_panda_3: {
    id: "kung_fu_panda_3",
    video: "/videos/Movies & Series/Movies/Kung Fu Panda 3 Trailer.mp4",
    title: "Kung Fu Panda 3",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
    type: "Movies",
    views: 5421,
    videoType: "movie",
    description:
      "Po meets his biological father and discovers a secret panda village.",
    quality: "HD",
    ageLimit: 5,
    yearPublished: 2016,
    duration: "590", // in seconds
    genre: "Animation",
    rating: "4.6",
  },

  // Videos from Latest Movies and Series component
  the_lion_king: {
    id: "the_lion_king",
    video: "/videos/Movies%20&%20Series/Series/Oscar's%20Oasis/01-.mp4",
    title: "The Lion King",
    thumbnail: "/images/kids/thumb_nails/strange_world.png",
    type: "Series",
    views: 8765,
    videoType: "story",
    description:
      "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    quality: "HD",
    ageLimit: 5,
    yearPublished: 2019,
    duration: "500", // in seconds
    genre: "Animation",
    rating: "4.8",
  },
  tom_and_jerry3: {
    id: "tom_and_jerry3",
    video: "/videos/Movies & Series/Series/Tom & Jerry/Tom & Jerry  01.mp4",
    title: "Tom and Jerry",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
    type: "Videos",
    views: 7621,
    videoType: "series",
    description:
      "The classic cat and mouse chase continues with hilarious adventures.",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2020,
    duration: "300", // in seconds
    genre: "Comedy",
    rating: "4.5",
    numberOfEpisodes: 10,
    numberOfSeasons: 2,
  },
  mufasa: {
    id: "mufasa",
    video: "/videos/Movies & Series/Movies/MUFASA OFFIZIELLER TRAILER.mp4",
    title: "Mufasa",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    type: "Movies",
    views: 9654,
    videoType: "movie",
    description:
      "The origin story of Simba's father, Mufasa, and his journey to becoming king.",
    quality: "HD",
    ageLimit: 5,
    yearPublished: 2024,
    duration: "550", // in seconds
    genre: "Animation",
    rating: "4.9",
  },
  the_super_mario_bros1: {
    id: "the_super_mario_bros1",
    video:
      "/videos/Movies & Series/Movies/Der Super Mario Bros. Film  Trailer.mp4",
    title: "The Super Mario Bros",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    type: "Series",
    views: 3542,
    videoType: "movie",
    description:
      "Join Mario and Luigi on an adventure to save the Mushroom Kingdom.",
    quality: "HD",
    ageLimit: 5,
    yearPublished: 2023,
    duration: "600", // in seconds
    genre: "Animation",
    rating: "4.7",
  },
  kung_fu_panda_33: {
    id: "kung_fu_panda_33",
    video: "/videos/Movies & Series/Movies/Kung Fu Panda 3 Trailer.mp4",
    title: "Kung Fu Panda 3",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
    type: "Videos",
    views: 5421,
    videoType: "series",
    description:
      "Po meets his biological father and discovers a secret panda village.",
    quality: "HD",
    ageLimit: 5,
    yearPublished: 2016,
    duration: "590", // in seconds
    genre: "Animation",
    rating: "4.6",
    numberOfEpisodes: 8,
    numberOfSeasons: 1,
  },
  tom_and_jerry2: {
    id: "tom_and_jerry2",
    video: "/videos/Movies & Series/Series/Tom & Jerry/Tom & Jerry  01.mp4",
    title: "Tom and Jerry",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
    type: "Videos",
    views: 7621,
    videoType: "series",
    description: "More classic cat and mouse chase adventures.",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2020,
    duration: "300", // in seconds
    genre: "Comedy",
    rating: "4.5",
    numberOfEpisodes: 10,
    numberOfSeasons: 2,
  },
  kung_fu_panda_31: {
    id: "kung_fu_panda_31",
    video: "/videos/Movies & Series/Movies/Kung Fu Panda 3 Trailer.mp4",
    title: "Kung Fu Panda 3",
    thumbnail: "/images/kids/thumb_nails/inside_out.png",
    type: "Videos",
    views: 5421,
    videoType: "series",
    description: "Po continues his adventures in the panda village.",
    quality: "HD",
    ageLimit: 5,
    yearPublished: 2016,
    duration: "590", // in seconds
    genre: "Animation",
    rating: "4.6",
    numberOfEpisodes: 8,
    numberOfSeasons: 1,
  },
  tom_and_jerry1: {
    id: "tom_and_jerry1",
    video: "/videos/Movies & Series/Series/Tom & Jerry/Tom & Jerry  01.mp4",
    title: "Tom and Jerry",
    thumbnail: "/images/kids/thumb_nails/cartoon.png",
    type: "Videos",
    views: 7621,
    videoType: "series",
    description: "Even more classic cat and mouse chase adventures.",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2020,
    duration: "300", // in seconds
    genre: "Comedy",
    rating: "4.5",
    numberOfEpisodes: 10,
    numberOfSeasons: 2,
  },

  // Stories from the stories page
  "BERFÎNA SPÎ Û HEFT QUTIK": {
    id: "BERFÎNA SPÎ Û HEFT QUTIK",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "BERFÎNA SPÎ Û HEFT QUTIK",
    thumbnail: "/images/kids/thumb_nails/stories.png",
    type: "Stories",
    views: 2456,
    videoType: "story",
    description: "A beautiful Kurdish story for children.",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2022,
    duration: "300", // in seconds
    genre: "Animation",
    rating: "4.8",
  },
  "Eledîn û Lembeya Newaze": {
    id: "Eledîn û Lembeya Newaze",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Eledîn û Lembeya Newaze",
    thumbnail: "/images/kids/thumb_nails/stories.png",
    type: "Stories",
    views: 3789,
    videoType: "story",
    description: "A magical story about a lamp with special powers.",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2022,
    duration: "280", // in seconds
    genre: "Animation",
    rating: "4.7",
  },
  "JACK Û DARA FASÛLYÊ": {
    id: "JACK Û DARA FASÛLYÊ",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Jack and the Beanstalk",
    thumbnail: "/images/kids/thumb_nails/stories.png",
    type: "Stories",
    views: 4321,
    videoType: "story",
    description: "The classic tale of Jack and the magical beanstalk.",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2022,
    duration: "320", // in seconds
    genre: "Animation",
    rating: "4.9",
  },
  "Keç Tilî": {
    id: "Keç Tilî",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Keç Tilî",
    thumbnail: "/images/kids/thumb_nails/stories.png",
    type: "Stories",
    views: 6543,
    videoType: "story",
    description: "An engaging story for young viewers.",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2022,
    duration: "290", // in seconds
    genre: "Animation",
    rating: "4.6",
  },
  "Mîrzayê Beqê": {
    id: "Mîrzayê Beqê",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Mîrzayê Beqê",
    thumbnail: "/images/kids/thumb_nails/stories.png",
    type: "Stories",
    views: 5432,
    videoType: "story",
    description: "A fascinating story for children of all ages.",
    quality: "HD",
    ageLimit: 3,
    yearPublished: 2022,
    duration: "310", // in seconds
    genre: "Animation",
    rating: "4.7",
  },

  // Additional story from the most viewed videos
  strange_world: {
    id: "strange_world",
    video: "/images/kids/sample_videos/nesha.mp4",
    title: "Strange World",
    thumbnail: "/images/kids/thumb_nails/strange_world.png",
    type: "Stories",
    views: 8765,
    videoType: "story",
    description:
      "Journey to a mysterious world filled with wonders and dangers.",
    quality: "HD",
    ageLimit: 5,
    yearPublished: 2022,
    duration: "350", // in seconds
    genre: "Adventure",
    rating: "4.8",
  },
};

// Database of episode information for series
const episodesDatabase = {
  nesha: [
    {
      id: "ep1",
      title: "Nesha and the Monkey",
      description: "Nesha meets a cheeky monkey who steals her map.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep1.mp4",
      episodeNumber: 1,
    },
    {
      id: "ep2",
      title: "The River Challenge",
      description: "Crossing a wild river isn't easy!",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep2.mp4",
      episodeNumber: 2,
    },
    {
      id: "ep3",
      title: "Lost in the Jungle",
      description: "A sudden storm gets Nesha lost.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep3.mp4",
      episodeNumber: 3,
    },
    {
      id: "ep4",
      title: "Jungle Dance Party",
      description: "The animals throw a party for Nesha.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep4.mp4",
      episodeNumber: 4,
    },
    {
      id: "ep5",
      title: "Map to the Waterfall",
      description: "Nesha follows a mysterious treasure map.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep5.mp4",
      episodeNumber: 5,
    },
    {
      id: "ep6",
      title: "Echo Cave",
      description: "Strange voices in a cave reveal a secret.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep6.mp4",
      episodeNumber: 6,
    },
    {
      id: "ep7",
      title: "The Bamboo Bridge",
      description: "Crossing a shaky bridge over crocodiles!",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep7.mp4",
      episodeNumber: 7,
    },
    {
      id: "ep8",
      title: "Forest Maze",
      description: "Nesha races against time in a jungle maze.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep8.mp4",
      episodeNumber: 8,
    },
    {
      id: "ep9",
      title: "Jungle Friends Forever",
      description: "Nesha says goodbye to her animal friends.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep9.mp4",
      episodeNumber: 9,
    },
    {
      id: "ep10",
      title: "Treasure Under the Tree",
      description: "The journey ends with a sparkling surprise.",
      thumbnail: "/images/kids/thumb_nails/ice_age.png",
      url: "/videos/nesha/ep10.mp4",
      episodeNumber: 10,
    },
  ],
};

// Common related videos that can be used for all videos
const commonRelatedVideos = [
  {
    id: "kiko",
    title: "Kiko's Day Out",
    description: "A sunny day becomes an epic chase.",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    url: "/images/kids/sample_videos/kiko.mp4",
    episodeNumber: 11,
    videoType: "series" as const,
  },
  {
    id: "maya",
    title: "Maya's Magic Show",
    description: "Maya dazzles her friends with tricks.",
    thumbnail: "/images/kids/thumb_nails/ice_age.png",
    url: "/images/kids/sample_videos/maya.mp4",
    episodeNumber: 12,
    videoType: "series" as const,
  },
];

export default function MoviePage() {
  const params = useParams();
  const id = params.id as string;

  // Decode the ID if it's URL-encoded
  const decodedId = decodeURIComponent(id);

  // Find the video in our consolidated database
  const video = allVideos[decodedId];

  if (!video) {
    return (
      <div className="text-white p-10">Video not found! ID: {decodedId}</div>
    );
  }

  // Get episodes for series, or use related videos for movies
  const episodes =
    video.videoType === "series"
      ? episodesDatabase[decodedId as keyof typeof episodesDatabase] || []
      : [];

  // Use the first episode for series, or the main video for movies
  const firstEpisode =
    episodes.length > 0
      ? episodes[0]
      : {
          id: "main",
          title: video.title,
          description: video.description || "",
          thumbnail: video.thumbnail,
          url: video.video,
          episodeNumber: 1,
        };

  return (
    <VideoScreen
      videoType={video.videoType}
      videoId={video.id}
      videoTitle={video.title}
      videoDescription={video.description || ""}
      videoQuality={video.quality || "HD"}
      ageLimit={video.ageLimit || 3}
      yearPublished={video.yearPublished || 2023}
      videoThumbnail={video.thumbnail}
      videoUrl={video.video}
      numberOfViews={video.views}
      videoDuration={video.duration || "120"}
      videoGenre={video.genre || "Kids"}
      videoRating={video.rating || "4.5"}
      numberOfEpisodes={video.numberOfEpisodes || 1}
      numberOfSeasons={video.numberOfSeasons || 1}
      relatedVideos={commonRelatedVideos}
      videoEpisode={firstEpisode.episodeNumber?.toString() || "1"}
      videoSeason="1"
      videoEpisodeTitle={firstEpisode.title}
      videoEpisodeDescription={firstEpisode.description}
      videoEpisodeThumbnail={firstEpisode.thumbnail}
      videoEpisodeUrl={firstEpisode.url}
      videoEpisodeDuration={video.duration || "120"}
      videoEpisodeGenre={video.genre || "Kids"}
      videoEpisodeRating={video.rating || "4.5"}
      videoEpisodeRelatedVideos={
        episodes.length > 0 ? episodes : [firstEpisode]
      }
    />
  );
}
