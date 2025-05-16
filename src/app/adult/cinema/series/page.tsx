"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import VideoStream, { VideoStreamHandle } from "../videoStream";

export default function ChefChannel() {
  const [showPlayer2, setShowPlayer2] = useState(false);
  const playerRef2 = useRef<VideoStreamHandle>(null);
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowPlayer2(false); // Hide player when exiting fullscreen
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  return (
    <div
      className="relative pt-10 px-6 xl:px-12 min-h-screen text-white font-sans bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url('/images/adults/chef.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/75 to-transparent z-0 pointer-events-none" />
      <main className=" relative z-10 flex flex-col lg:flex-row gap-8 w-full z-1">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex flex-col gap-6">
          {[
            ["Stream Destpek", "/images/adults/streams.jpg"],
            ["TV Channels", "/images/adults/tv.jpg"],
            ["Live Streams", "/images/adults/mic.jpg"],
            ["Video Reels", "/images/adults/click.jpg"],
          ].map((label, i) => (
            <div
              key={i}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group"
            >
              {/* BACKGROUND IMAGE: Scaled & Blurred */}
              <div className="absolute inset-0 scale-105 -translate-y-1 -translate-x-2 z-0 rounded-2xl overflow-hidden">
                <img
                  src="/images/adults/music.jpg"
                  alt="background"
                  className="w-full h-full object-cover object-top blur-sm opacity-60"
                />
              </div>

              {/* FOREGROUND IMAGE */}
              <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
                <img
                  src={`${label[1]}`}
                  alt={label[0]}
                  className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-105"
                />

                {/* BOTTOM SHADOW GRADIENT */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* TEXT LABEL */}
                <div className="absolute bottom-3 left-4 z-20">
                  <span className="text-white text-lg font-semibold drop-shadow-lg">
                    {label[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          {/* Channel Info */}
          <div className="flex items-start gap-6">
            <div>
              <h1 className="text-5xl mb-3 font-bold">The Smurfs</h1>

              <div className="flex gap-2 mt-3 mb-3 flex-wrap">
                {["🔔 159K", "12+", "Life Style"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 text-xl text-white bg-white/18 px-3 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-xl mb-3 font-bold">.2012.2hr 35min.</h1>

              <div className="text-center mb-3 flex gap-2 mt-3 flex-wrap">
                <div className="w-60 h-1 bg-gray-400 rounded-full mt-3">
                  <div className="h-full w-1/3 bg-red-500 rounded-full" />
                </div>
                <h1 className="text-xl font-bold">1hr 35 min left</h1>
              </div>

              <div className="text-center flex gap-2 mt-3 flex-wrap">
                <button
                  onClick={() => {
                    setShowPlayer2(true);
                    setTimeout(() => {
                      playerRef2.current?.startVideo(); // Then trigger fullscreen
                    }, 0);
                  }}
                  className="text-center mt-15 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-2xl shadow-md transition"
                >
                  Continue
                </button>
                <button
                  onClick={() => {
                    setShowPlayer2(true);
                    setTimeout(() => {
                      playerRef2.current?.startVideo(); // Then trigger fullscreen
                    }, 0);
                  }}
                  className="text-center mt-15 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-2xl shadow-md transition"
                >
                  Restart
                </button>
                {showPlayer2 && <VideoStream ref={playerRef2} />}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Video Thumbnails */}
      <h2
        className="relative inline-block z-10 text-1xl font-semibold mt-4 mb-2 p-2 rounded-md"
        style={{ backgroundColor: "#FFFFFF40" }}
      >
        Latest Series
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <Image
              src="/images/adults/chef.png"
              width={400}
              height={250}
              alt="Video Thumbnail"
              className="w-full h-auto object-cover scale-x-[-1] transition duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute top-2 left-2 text-right">
              {["🔔 159K", "Action", "12+"].map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-sm text-white bg-white/18 px-3 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="absolute bottom-2 left-2 text-right">
              <p className="bg-opacity-60 px-2 py-1 text-sm font-semibold rounded">
                Video Title
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
