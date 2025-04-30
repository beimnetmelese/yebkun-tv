import { Video } from "@/lib/firebase";
import { useEffect, useState } from "react";
import LatestMovies from "../components/latest_movies/latest_movies";
import LatestMoviesSeries from "../components/movies_and_stories/latest_movies_series";
import NewStories from "../components/new_stories/new_stories";
import { Series } from "../page";

export default function Home({
  stories,
  videos,
  series,
  movies,
}: {
  stories: Video[];
  videos: Video[];
  series: Series[];
  movies: Video[];
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      stories &&
      videos &&
      series &&
      movies &&
      (stories.length === 0 ||
        videos.length === 0 ||
        series.length === 0 ||
        movies.length === 0)
    ) {
      setError("No content found");
      setLoading(false);
    } else if (stories && videos && series && movies) {
      setLoading(false);
    }
  }, [stories, videos, series, movies]);

  console.log(`stories: ${stories}`);
  console.log(`videos: ${videos}`);
  console.log(`series: ${series}`);
  console.log(`movies: ${movies}`);
  console.log(`error: ${error}`);
  return (
    loading ? (
      <div className="text-black p-10 text-2xl font-bold flex justify-center items-center h-screen">Loading...</div>
    ) : (
    <div className="flex flex-col h-full gap-4">
   
        
          <div className="">
            <LatestMovies videos={videos} />
          </div>

          {/* New Stories Section */}
          <div className="">
            <NewStories stories={stories} />
          </div>

          <div className="">
            <LatestMoviesSeries movies={movies} series={series} />
          </div>
    </div>
  )
  );
}
