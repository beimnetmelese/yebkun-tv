"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import VideoStreamPlayer, { VideoStreamPlayerHandle } from "./videoStream";
import { FaBell, FaRegCalendarAlt } from "react-icons/fa";

export default function ChefChannel() {
  const [showPlayer, setShowPlayer] = useState(false);
  const playerRef = useRef<VideoStreamPlayerHandle>(null);
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowPlayer(false); // Hide player when exiting fullscreen
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
      <main className="relative z-10 flex flex-col lg:flex-row gap-8 w-full">
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
              <h1 className="text-5xl font-bold">Channel Name</h1>
              <p className="mt-3 text-3xl ">Owner Name</p>
              <div className="flex  gap-2 mt-3 flex-wrap">
                {["🔔 159K", "12+", "Life Style"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 text-xl text-white bg-white/18 px-3 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {showPlayer && <VideoStreamPlayer ref={playerRef} />}
          {/* Next Streaming Info */}
          <div className="bg-white/25 text-center rounded-lg p-4 mt-6 max-w-xs text-white backdrop-blur-sm">
            <FaRegCalendarAlt
              size={"40px"}
              className="text-xl text-center w-70 text-gray-400"
            />
            <h2 className="mt-2 text-lg font-semibold">Next Streaming Title</h2>
            <p className="mt-2">Tomorrow</p>
            <p className="mt-2">18:00</p>
            <FaBell size={"40px"} className="mt-2 text-xl w-70 text-gray-400" />
            <p className="mt-2">Remind me</p>
          </div>
          <p className="max-w-xs text-center mt-4 text-sm">👥 30+ Waiting</p>
        </section>
      </main>
      <h2
        className="relative inline-block z-10 text-1xl font-semibold mt-4 mb-2 p-2 rounded-md"
        style={{ backgroundColor: "#FFFFFF40" }}
      >
        My Video
      </h2>
      {/* Video Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            onClick={() => {
              setShowPlayer(true);
              setTimeout(() => {
                playerRef.current?.startVideo();
              }, 0);
            }}
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
            <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/75 to-transparent" />
            <div className="absolute top-2 right-2 text-right">
              <p className="bg-opacity-60 px-2 py-1 text-sm font-semibold rounded">
                Video Title
              </p>
              <p className="bg-opacity-60 px-2 py-1 text-xs text-gray-300 rounded mt-1">
                12.12.2023
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
