"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Play, SkipBack, SkipForward } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";

const playlists = [
  { name: "Diloke Nû", image: "/images/adults/streams.jpg" },
  { name: "Diloke Rojava", image: "/images/adults/tv.jpg" },
  { name: "Diloke Bakûr", image: "/images/adults/mic.jpg" },
  { name: "Diloke Rojhilat", image: "/images/adults/streams.jpg" },
  { name: "Diloke Basur", image: "/images/adults/tv.jpg" },
];

const songs = Array(11).fill({
  title: "Playlist Title",
  subtitle: "Songs 120",
  duration: "3:52",
  image: "/images/adults/streams.jpg",
});

export default function MusicPlayerUI() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const router = useRouter();

  const playSong = (index: number) => {
    setCurrentlyPlaying(index);
  };

  return (
    <>
      <Navigation active="stream" />
      <div className="min-h-screen pt-[150px] flex flex-col bg-black text-white bg-[url('/images/adults/music.jpg')] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>

        <div className="flex flex-1">
          {/* Left Sidebar */}
          <aside className="w-64 m-6 flex flex-col gap-6">
            {[
              ["Stream Destpek", "/images/adults/streams.jpg", "/adult/stream"],
              [
                "TV Channels",
                "/images/adults/tv.jpg",
                "/adult/stream/tvchannel",
              ],
              [
                "Live Streams",
                "/images/adults/mic.jpg",
                "/adult/stream/livestreams",
              ],
            ].map((label, i) => (
              <div
                onClick={() => router.push(label[2])}
                key={i}
                className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group"
              >
                <div className="absolute inset-0 scale-105 -translate-y-1 -translate-x-2 z-0 rounded-2xl overflow-hidden">
                  <img
                    src="/images/adults/music.jpg"
                    alt="background"
                    className="w-full h-full object-cover object-top blur-sm opacity-60"
                  />
                </div>
                <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
                  <img
                    src={`${label[1]}`}
                    alt={label[0]}
                    className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 z-20">
                    <span className="text-white text-lg font-semibold drop-shadow-lg">
                      {label[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </aside>

          {/* Middle Section */}
          <main
            className="flex-[1.6] flex gap-6 bg-white/25 rounded-xl m-6 mr-3 p-3"
            style={{ backgroundColor: "#67657157" }}
          >
            {/* Songs Column */}
            <div className="w-1/2 flex flex-col">
              {songs.map((song, i) => (
                <div
                  key={i}
                  onClick={() => playSong(i)}
                  className={`flex items-center justify-between p-2 bg-white/23 hover:bg-zinc-700 cursor-pointer
                  ${i !== songs.length - 1 ? "border-b border-gray-600" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={song.image}
                      className="w-10 h-10 rounded-md"
                      alt="cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{song.title}</p>
                      <p className="text-xs text-gray-400">{song.subtitle}</p>
                    </div>
                  </div>
                  {i === 0 ? (
                    <button className="p-2 bg-white text-black rounded-full">
                      <Play className="w-4 h-4" />
                    </button>
                  ) : (
                    <p className="text-xs text-gray-300">{song.duration}</p>
                  )}
                </div>
              ))}
            </div>
          </main>

          {/* Right Audio Player */}
          <aside className="flex-[2] relative m-6 ml-3 p-6 rounded-xl overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-white/25 backdrop-blur-sm"
                style={{ backgroundColor: "#67657157" }}
              />
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-between">
              <div className="flex-1" />
              <div className="flex items-center justify-center gap-6 py-6">
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                  <SkipBack className="w-6 h-6" />
                </button>
                <button className="p-3 rounded-full bg-white text-black hover:bg-gray-300">
                  <Play className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>
              <div className="w-full px-4 mb-6">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>02:37</span>
                  <span>--:--</span>
                </div>
                <div className="w-full h-1 bg-gray-400 rounded-full mt-1">
                  <div className="h-full w-1/3 bg-red-500 rounded-full" />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Video Section */}
        <div className="px-6 pb-10">
          <h2
            className="text-xl font-semibold mt-4 mb-2 p-2 rounded-md inline-block"
            style={{ backgroundColor: "#FFFFFF40" }}
          >
            My Video
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
      </div>
    </>
  );
}
