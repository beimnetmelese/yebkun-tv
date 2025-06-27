import { Suspense } from "react";
import MusicPlayerUI from "./component";

export default function FilmePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MusicPlayerUI />
    </Suspense>
  );
}
