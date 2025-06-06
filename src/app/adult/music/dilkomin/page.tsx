"use client";

import React, { useState, useRef, useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";

const playlists = [
  {
    name: "Diloke Nû",
    image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
    songs: Array(8)
      .fill([
        {
          title: "Ciwan Haco - Dîlok",
          subtitle: "Dîlok Album",
          duration: "3:52",
          image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
          videoUrl: "/adults/Music section/Ciwan Haco/Yari serin.mp4",
        },
        {
          title: "Ciwan Haco - Hewal",
          subtitle: "Live",
          duration: "4:21",
          image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
          videoUrl: "/adults/Music section/Ciwan Haco/Macek.mp4",
        },
      ])
      .flat(),
  },
  {
    name: "Diloke Rojava",
    image: "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
    songs: Array(8)
      .fill([
        {
          title: "Şivan Perwer - Ey Ferat",
          subtitle: "Best of Şivan",
          duration: "5:00",
          image: "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
          videoUrl: "/adults/Music section/sivan Perwer/Dur Dur.mp4",
        },
        {
          title: "Şivan Perwer - Daye",
          subtitle: "Classic",
          duration: "4:35",
          image: "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
          videoUrl: "/adults/Music section/sivan Perwer/Nemire Lawik.mp4",
        },
      ])
      .flat(),
  },
  {
    name: "Diloke Bakûr",
    image: "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
    songs: Array(8)
      .fill([
        {
          title: "Diyar Dersim - Roj baş",
          subtitle: "Live in Amed",
          duration: "3:40",
          image: "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
          videoUrl: "/adults/Music section/Diyar dersim/Emrem Buri.mp4",
        },
        {
          title: "Diyar Dersim - Roj baş",
          subtitle: "Live in Amed",
          duration: "3:40",
          image: "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
          videoUrl: "/adults/Music section/Diyar dersim/TE DIGO NA.mp4",
        },
      ])
      .flat(),
  },
  {
    name: "Diloke Rojhilat",
    image: "/adults/Music section/seyda Rojava/seyda.jpg",
    songs: Array(8)
      .fill([
        {
          title: "Seyda Rojava - Helebçe",
          subtitle: "Memories",
          duration: "4:11",
          image: "/adults/Music section/seyda Rojava/seyda.jpg",
          videoUrl: "/adults/Music section/seyda Rojava/Gula Male.mp4",
        },
        {
          title: "Seyda Rojava - Helebçe",
          subtitle: "Memories",
          duration: "4:11",
          image: "/adults/Music section/seyda Rojava/seyda.jpg",
          videoUrl: "/adults/Music section/seyda Rojava/Tene Dilem.mp4",
        },
      ])
      .flat(),
  },
  {
    name: "Diloke Nû",
    image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
    songs: Array(8)
      .fill([
        {
          title: "Ciwan Haco - Dîlok",
          subtitle: "Dîlok Album",
          duration: "3:52",
          image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
          videoUrl: "/adults/Music section/Ciwan Haco/Yari serin.mp4",
        },
        {
          title: "Ciwan Haco - Hewal",
          subtitle: "Live",
          duration: "4:21",
          image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
          videoUrl: "/adults/Music section/Ciwan Haco/Macek.mp4",
        },
      ])
      .flat(),
  },
];

export default function MusicPlayerUI() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [selectedPlaylistIndex] = useState(0);
  const selectedPlaylist = playlists[selectedPlaylistIndex];
  const songs = selectedPlaylist.songs;
  const videos = songs.map((s) => s.videoUrl);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = videos[currentIndex];
    video.load();
    if (isPlaying) video.play();

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };

    const setDur = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", setDur);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", setDur);
    };
  }, [currentIndex]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const playSong = (index: number) => {
    if (audioRef.current) {
      audioRef.current.src = songs[index].videoUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Navigation active="music" />
      <div className="h-screen pt-[150px] w-full h-full flex bg-black text-white bg-gradient-to-b from-[#0c0c0c] via-[#1a1a1a] to-[#2f2f2f] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>

        {/* Left Sidebar */}
        <aside className="w-64 ml-6 mr-6 flex flex-col gap-6">
          {[
            ["Stream Destpek", "/images/adults/streams.jpg", "/adult/music"],
            ["Dilko Raqse", "/images/adults/tv.jpg", "/adult/music/diloke"],
            ["Hunermend", "/images/adults/mic.jpg", "/adult/music/hunermend"],
            ["Dilokemin", "/images/adults/mic.jpg", "/adult/music/dilkomin"],
          ].map((label, i) => (
            <div
              onClick={() => router.push(label[2])}
              key={i}
              className={`relative aspect-video tv-md:w-[250px] tv-md:h-[151px] rounded-2xl overflow-hidden shadow-2xl group ${
                i === 3
                  ? "brightness-100"
                  : "brightness-50 hover:brightness-100"
              } transition-all duration-300`}
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
                  <span className="text-white tv-md:text-[26px] text-lg font-semibold drop-shadow-lg">
                    {label[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* Middle Section */}
        <main
          className="flex-[1.6] tv-md:w-[629px] tv-md:h-[908px] max-h-[908px]  tv-md:flex-[1] flex gap-1 bg-white/25 rounded-xl mr-3 p-3"
          style={{ backgroundColor: "#67657157" }}
        >
          {/* Playlist Column */}
          <div className="w-1/2 w-1/2 tv-md:w-[250px] flex flex-col gap-4">
            {playlists.map((playlist, index) => (
              <div
                onClick={() => {
                  setCurrentIndex(0);
                  setIndex(0);
                  playSong(0); // optional
                }}
                key={index}
                className={`relative tv-md:w-[250px] tv-md:h-[170px] rounded-md overflow-hidden shadow bg-zinc-900 h-32 ${
                  index === selectedPlaylistIndex
                    ? "brightness-100"
                    : "brightness-50 hover:brightness-100"
                } transition-all duration-300`}
              >
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

                {/* Text Label */}
                <div className="absolute bottom-3 right-4 z-20">
                  {index === 0 ? (
                    <span className="text-white text-lg font-semibold drop-shadow-lg">
                      {playlist.name}
                    </span>
                  ) : (
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.00195312"
                        width="50"
                        height="50"
                        rx="10"
                        fill="white"
                      />
                      <g clip-path="url(#clip0_3514_6497)">
                        <path
                          d="M36.6668 19.042V16.6686C36.6668 13.5744 35.4377 10.607 33.2497 8.41904C31.0618 6.23112 28.0944 5.00195 25.0002 5.00195C21.906 5.00195 18.9385 6.23112 16.7506 8.41904C14.5627 10.607 13.3335 13.5744 13.3335 16.6686V19.042C11.8491 19.6898 10.5857 20.7562 9.69766 22.1106C8.80967 23.4651 8.33563 25.049 8.3335 26.6686V36.6686C8.33614 38.8779 9.21497 40.996 10.7772 42.5583C12.3394 44.1205 14.4575 44.9993 16.6668 45.002H33.3335C35.5428 44.9993 37.6609 44.1205 39.2231 42.5583C40.7854 40.996 41.6642 38.8779 41.6668 36.6686V26.6686C41.6647 25.049 41.1907 23.4651 40.3027 22.1106C39.4147 20.7562 38.1512 19.6898 36.6668 19.042ZM16.6668 16.6686C16.6668 14.4585 17.5448 12.3389 19.1076 10.7761C20.6704 9.21326 22.79 8.33529 25.0002 8.33529C27.2103 8.33529 29.3299 9.21326 30.8927 10.7761C32.4555 12.3389 33.3335 14.4585 33.3335 16.6686V18.3353H16.6668V16.6686ZM38.3335 36.6686C38.3335 37.9947 37.8067 39.2665 36.869 40.2042C35.9314 41.1418 34.6596 41.6686 33.3335 41.6686H16.6668C15.3407 41.6686 14.069 41.1418 13.1313 40.2042C12.1936 39.2665 11.6668 37.9947 11.6668 36.6686V26.6686C11.6668 25.3425 12.1936 24.0708 13.1313 23.1331C14.069 22.1954 15.3407 21.6686 16.6668 21.6686H33.3335C34.6596 21.6686 35.9314 22.1954 36.869 23.1331C37.8067 24.0708 38.3335 25.3425 38.3335 26.6686V36.6686Z"
                          fill="black"
                        />
                        <path
                          d="M24.9997 28.3359C24.5576 28.3359 24.1337 28.5115 23.8212 28.8241C23.5086 29.1367 23.333 29.5606 23.333 30.0026V33.3359C23.333 33.778 23.5086 34.2019 23.8212 34.5145C24.1337 34.827 24.5576 35.0026 24.9997 35.0026C25.4417 35.0026 25.8656 34.827 26.1782 34.5145C26.4907 34.2019 26.6663 33.778 26.6663 33.3359V30.0026C26.6663 29.5606 26.4907 29.1367 26.1782 28.8241C25.8656 28.5115 25.4417 28.3359 24.9997 28.3359Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3514_6497">
                          <rect
                            width="40"
                            height="40"
                            fill="white"
                            transform="translate(5 5.00195)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Songs Column */}
          <div className="w-1/2 flex flex-col">
            {songs.map((song, i) => (
              <div
                key={i}
                onClick={() => {
                  playSong(i);
                  setCurrentIndex(i % videos.length);
                  setIndex(i);
                }}
                className={`flex items-center tv-md:w-[350px] tv-md:h-[60px] justify-between p-2 bg-white/23 hover:bg-zinc-700 z-50 cursor-pointer
                  ${i !== songs.length - 1 ? "border-b border-gray-600" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={song.image}
                    className="w-10 h-10  tv-md:w-[60px] tv-md:h-[40px] rounded-md"
                    alt="cover"
                  />
                  <div>
                    <p className="text-sm tv-md:text-[16px] font-medium">
                      {song.title}
                    </p>
                    <p className="text-xs tv-md:text-[16px] text-gray-400">
                      {song.subtitle}
                    </p>
                  </div>
                </div>
                {i === index ? (
                  <svg
                    width="44"
                    height="22"
                    viewBox="0 0 44 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.5"
                      y="3.16016"
                      width="44"
                      height="15.7143"
                      rx="7.85714"
                      fill="#F2F2F2"
                    />
                    <rect
                      x="22"
                      width="22"
                      height="22"
                      rx="11"
                      fill="#F2F2F2"
                    />
                    <path
                      d="M37.5519 9.92209C38.6049 10.4947 38.6049 11.977 37.5519 12.5496L31.1941 16.007C30.1707 16.5635 28.9131 15.8391 28.9131 14.6932L28.9131 7.77848C28.9131 6.63256 30.1707 5.90822 31.1941 6.46473L37.5519 9.92209Z"
                      fill="#1C274C"
                    />
                  </svg>
                ) : (
                  <p className="text-xs tv-md:text-[16px] text-gray-300">
                    {song.duration}
                  </p>
                )}
              </div>
            ))}
          </div>
        </main>
        <aside className="flex-[2] tv-md:w-[951px] tv-md:h-[908px] max-h-[908px] relative mr-3 ml-3 p-6 rounded-xl overflow-hidden flex flex-col justify-between shadow-[inset_0_-40px_40px_-10px_rgba(0,0,0,0.4)]">
          {/* Background overlay */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-white/25 backdrop-blur-sm"
              style={{ backgroundColor: "#67657157" }}
            />
          </div>

          {/* Video Element */}
          <video
            ref={videoRef}
            autoPlay
            loop
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Controls */}
          <div className="relative z-10 flex flex-col flex-1 items-center justify-between">
            <div className="flex-1" />

            {/* Buttons */}
            <div className="flex items-center justify-center gap-6 py-6">
              <button onClick={handlePrevious} className="z-20">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="50"
                    height="50"
                    rx="25"
                    transform="matrix(-1 0 0 1 50 0)"
                    fill="black"
                    fillOpacity="0.4"
                  />
                  <path
                    d="M21.1635 27.7798C19.3551 26.5682 19.3551 23.4318 21.1635 22.2202L32.0825 14.9047C33.8401 13.7272 36 15.2599 36 17.6845V32.3155C36 34.7401 33.8401 36.2728 32.0825 35.0953L21.1635 27.7798Z"
                    fill="white"
                  />
                  <path
                    d="M15 17.65C15 17.2151 15.3398 16.8625 15.759 16.8625C16.1782 16.8625 16.5181 17.2151 16.5181 17.65V32.35C16.5181 32.7849 16.1782 33.1375 15.759 33.1375C15.3398 33.1375 15 32.7849 15 32.35V17.65Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button onClick={togglePlayPause} className="z-20">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="56"
                    height="56"
                    rx="28"
                    fill="black"
                    fillOpacity="0.4"
                  />
                  <path
                    d="M42.4872 23.6044C45.8376 25.5825 45.8376 30.7032 42.4872 32.6813L22.2578 44.6249C19.0016 46.5474 15 44.0451 15 40.0865L15 16.1992C15 12.2406 19.0016 9.73833 22.2578 11.6608L42.4872 23.6044Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button onClick={handleNext} className="z-20">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="50"
                    height="50"
                    rx="25"
                    transform="matrix(-1 0 0 1 50 0)"
                    fill="black"
                    fillOpacity="0.4"
                  />
                  <path
                    d="M31.8365 27.7798C33.6449 26.5682 33.6449 23.4318 31.8365 22.2202L20.9175 14.9047C19.1599 13.7272 17 15.2599 17 17.6845V32.3155C17 34.7401 19.1599 36.2728 20.9175 35.0953L31.8365 27.7798Z"
                    fill="white"
                  />
                  <path
                    d="M38 17.65C38 17.2151 37.6602 16.8625 37.241 16.8625C36.8218 16.8625 36.4819 17.2151 36.4819 17.65V32.35C36.4819 32.7849 36.8218 33.1375 37.241 33.1375C37.6602 33.1375 38 32.7849 38 32.35V17.65Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>

            {/* Progress */}
            <div className="w-full px-4 pb-8">
              <div className="flex justify-between text-sm text-white/70 mb-1">
                <span className="tv-md:text-[16px]">
                  {formatTime(currentTime)}
                </span>
                <span className="tv-md:text-[16px]">
                  {formatTime(duration)}
                </span>
              </div>
              <div
                className="w-full h-2 bg-white/30 rounded-full cursor-pointer"
                onClick={handleProgressBarClick}
              >
                <div
                  className="h-full bg-red-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
