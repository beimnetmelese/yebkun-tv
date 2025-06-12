import { Suspense } from "react";
import VideoFeed from "./component";

export default function FilmePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoFeed />
    </Suspense>
  );
}
