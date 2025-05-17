"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import VideoStream, { VideoStreamHandle } from "../../videoStream";

const episodes = [
  { title: "EP 01", time: "03:00", progress: "50%" },
  { title: "EP 02", time: "03:00", progress: "50%" },
  { title: "EP 03", time: "03:00", active: true },
  { title: "EP 04", time: "03:00" },
  { title: "EP 05", time: "03:00", progress: "50%" },
];

export default function ChefChannel() {
  const [showPlayer2, setShowPlayer2] = useState(false);
  const playerRef2 = useRef<VideoStreamHandle>(null);
  const episodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowPlayer2(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div
      className="relative pt-10 px-6 xl:px-12 min-h-screen text-white font-sans bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{ backgroundImage: "url('/images/adults/chef.png')" }}
    >
      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/75 to-transparent z-0 pointer-events-none" />

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex flex-col lg:flex-row gap-8 w-full mb-28">
        <section className="flex-1">
          <div className="flex items-start gap-6">
            <div>
              <h1 className="text-5xl mb-6 font-bold">The Smurfs</h1>
              <div className="flex gap-2 mt-3 mb-6 flex-wrap">
                {["🔔 159K", "12+", "Life Style"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 text-xl text-white bg-white/18 px-3 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-xl mb-6 font-bold">.2012.2hr 35min.</h1>
              {showPlayer2 && <VideoStream ref={playerRef2} />}
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-4 left-0 right-0 z-10 px-6 xl:px-12">
        {" "}
        {/* Added bottom-4 for small margin */}
        <div
          className="bg-black/80 backdrop-blur-sm rounded-xl p-4 w-full max-w-screen-2xl mx-auto"
          style={{ background: "#67657157" }}
        >
          {" "}
          {/* Changed back to rounded-xl */}
          {/* Season selector buttons - left aligned */}
          <div className="flex pl-2 gap-2 mb-3">
            <button className="px-3 py-1 text-sm rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
              Season 1
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
              Season 2
            </button>
          </div>
          {/* Episodes carousel - centered */}
          <div className="relative w-full">
            <div className="flex items-center justify-center gap-2">
              <button
                className="text-white text-2xl px-2 hover:bg-white/20 rounded-full h-10 w-10 flex items-center justify-center transition-colors shrink-0"
                aria-label="Previous episodes"
              >
                &#8249;
              </button>

              <div
                ref={episodesRef}
                className="flex overflow-x-auto scrollbar-hide gap-4 py-2 w-[calc(100%-80px)]"
              >
                {episodes.map((ep, i) => (
                  <div
                    onClick={() => {
                      setShowPlayer2(true);
                      setTimeout(() => {
                        playerRef2.current?.startVideo();
                      }, 0);
                    }}
                    key={i}
                    className={`relative rounded-xl overflow-hidden w-[220px] h-44 flex-shrink-0 group border-2 shadow-[0_12px_20px_rgba(0,0,0,0.5)] cursor-pointer
                ${
                  ep.active
                    ? "border-red-500 scale-105 h-48 z-10"
                    : "border-transparent hover:scale-105"
                }
                transition-all duration-300`}
                  >
                    <img
                      src="/images/adults/chef.png"
                      alt={ep.title}
                      className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {ep.title}
                    </div>

                    <div className="absolute bottom-10 w-full h-1 bg-gray-500/80">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: ep.progress || "33%" }}
                      />
                    </div>

                    <div className="absolute bottom-2 flex justify-between w-full px-2 text-white text-sm">
                      <span className="truncate pr-2">Video Title</span>
                      <span className="flex-shrink-0">{ep.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="text-white text-2xl px-2 hover:bg-white/20 rounded-full h-10 w-10 flex items-center justify-center transition-colors shrink-0"
                aria-label="Next episodes"
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
