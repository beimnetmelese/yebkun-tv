// Import the functions needed from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6HKHyeDMMs0ozbUSvCTRxvcwTTxO-E0k",
  authDomain: "tiktok-clone-eb38a.firebaseapp.com",
  projectId: "tiktok-clone-eb38a",
  storageBucket: "tiktok-clone-eb38a.appspot.com",
  messagingSenderId: "999841772055",
  appId: "1:999841772055:web:73a436add93128dfd92252",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Storage paths
const STORAGE_PATHS = {
  FUNNY_VIDEOS: "Funny videos",
  MOVIES: "movies",
  SERIES: {
    OSCAR_OASIS: "series/oscar oasis",
    TOM_AND_JERRY: "series/tom&jerry",
  },
  STORIES: "stories",
};

// Interfaces
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  views: number;
  duration: string;
  type: "Videos" | "Movies" | "Stories" | "Series";
  videoType?: "series" | "movie" | "story";
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  episodeNumber: number;
}

// Get videos from a specific storage path
export async function getVideosFromStorage(
  path: string,
  type: "Videos" | "Movies" | "Stories" | "Series" = "Videos",
  videoType?: "series" | "movie" | "story"
): Promise<Video[]> {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);

    const videos = await Promise.all(
      result.items.map(async (item, index) => {
        const url = await getDownloadURL(item);
        const name = item.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        const thumbnailPath = `/images/kids/thumb_nails/${name}.png`;
        let thumbnail;

        try {
          const thumbnailRef = ref(storage, thumbnailPath);
          thumbnail = await getDownloadURL(thumbnailRef);
        } catch (error) {
          // If thumbnail doesn't exist, use a default image
          thumbnail = "/images/kids/thumb_nails/dummy.png";
        }

        return {
          id: `${path}-${index}`,
          title: name.split("_").join(" "),
          description: `Watch ${name.split("_").join(" ")}`,
          thumbnail,
          url,
          views: Math.floor(Math.random() * 10000) + 100,
          duration: "3:25", // Default duration
          type,
          videoType,
        };
      })
    );

    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

// Get series episodes
export async function getSeriesEpisodes(
  seriesPath: string
): Promise<Episode[]> {
  try {
    const storageRef = ref(storage, seriesPath);
    const result = await listAll(storageRef);

    const episodes = await Promise.all(
      result.items.map(async (item, index) => {
        const url = await getDownloadURL(item);
        const name = item.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        const thumbnailPath = `/images/kids/thumb_nails/${name}.png`;
        let thumbnail;

        try {
          const thumbnailRef = ref(storage, thumbnailPath);
          thumbnail = await getDownloadURL(thumbnailRef);
        } catch (error) {
          // If thumbnail doesn't exist, use a default image
          thumbnail = "/images/kids/thumb_nails/dummy.png";
        }

        // Try to extract episode number from the filename
        const episodeMatch = name.match(/ep(\d+)/i);
        const episodeNumber = episodeMatch
          ? parseInt(episodeMatch[1])
          : index + 1;

        return {
          id: `${seriesPath}-${index}`,
          title: `Episode ${episodeNumber}: ${name.split("_").join(" ")}`,
          description: `Watch episode ${episodeNumber} of the series`,
          thumbnail,
          url,
          episodeNumber,
        };
      })
    );

    return episodes.sort((a, b) => a.episodeNumber - b.episodeNumber);
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
}

// Get all series
export async function getAllSeries() {
  const series = [];

  // Get Oscar Oasis series
  try {
    const oscarEpisodes = await getSeriesEpisodes(
      STORAGE_PATHS.SERIES.OSCAR_OASIS
    );
    if (oscarEpisodes.length > 0) {
      series.push({
        id: "oscar_oasis",
        title: "Oscar's Oasis",
        description: "Follow Oscar the lizard as he survives in the desert",
        thumbnail: oscarEpisodes[0].thumbnail,
        url: oscarEpisodes[0].url,
        views: Math.floor(Math.random() * 10000) + 100,
        duration: "1:25",
        type: "Series",
        videoType: "series",
        episodes: oscarEpisodes,
        seasons: 1,
        numberOfEpisodes: oscarEpisodes.length,
      });
    }
  } catch (error) {
    console.error("Error fetching Oscar Oasis:", error);
  }

  // Get Tom & Jerry series
  try {
    const tomAndJerryEpisodes = await getSeriesEpisodes(
      STORAGE_PATHS.SERIES.TOM_AND_JERRY
    );
    if (tomAndJerryEpisodes.length > 0) {
      series.push({
        id: "tom_and_jerry",
        title: "Tom & Jerry",
        description:
          "Classic cartoon featuring Tom the cat and Jerry the mouse",
        thumbnail: tomAndJerryEpisodes[0].thumbnail,
        url: tomAndJerryEpisodes[0].url,
        views: Math.floor(Math.random() * 10000) + 100,
        duration: "1:30",
        type: "Series",
        videoType: "series",
        episodes: tomAndJerryEpisodes,
        seasons: 1,
        numberOfEpisodes: tomAndJerryEpisodes.length,
      });
    }
  } catch (error) {
    console.error("Error fetching Tom & Jerry:", error);
  }

  return series;
}

// Get funny videos
export async function getFunnyVideos() {
  return getVideosFromStorage(STORAGE_PATHS.FUNNY_VIDEOS, "Videos", "video");
}

// Get movies
export async function getMovies() {
  return getVideosFromStorage(STORAGE_PATHS.MOVIES, "Movies", "movie");
}

// Get stories
export async function getStories() {
  return getVideosFromStorage(STORAGE_PATHS.STORIES, "Stories", "story");
}

// Get all content for home page
export async function getAllContent() {
  const [movies, stories, funnyVideos, series] = await Promise.all([
    getMovies(),
    getStories(),
    getFunnyVideos(),
    getAllSeries(),
  ]);

  return {
    movies,
    stories,
    funnyVideos,
    series,
  };
}

export default app;
