import { Suspense } from "react";
import VideoPlayerSection from "./component";

export default function FilmePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoPlayerSection />
    </Suspense>
  );
}
