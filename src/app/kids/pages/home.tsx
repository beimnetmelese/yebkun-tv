import LatestMovies from "../components/latest_movies/latest_movies";
import LatestMoviesSeries from "../components/movies_and_stories/latest_movies_series";
import NewStories from "../components/new_stories/new_stories";


export default function Home() {
    return (
      <div className="flex flex-col r-gap-md py-4 h-full">
        <div className="flex-1">
          <LatestMovies />
        </div>

        {/* New Stories Section */}
        <div className="flex-1">
          <NewStories />
        </div>

        <div className="flex-1">
          <LatestMoviesSeries />
        </div>
      </div>
    );
}