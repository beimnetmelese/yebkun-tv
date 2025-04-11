import LatestMovies from "../components/latest_movies/latest_movies";
import LatestMoviesSeries from "../components/movies_and_stories/latest_movies_series";
import NewStories from "../components/new_stories/new_stories";

export default function Home() {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="">
        <LatestMovies />
      </div>

      {/* New Stories Section */}
      <div className="">
        <NewStories />
      </div>

      <div className="">
        <LatestMoviesSeries />
      </div>
    </div>
  );
}
