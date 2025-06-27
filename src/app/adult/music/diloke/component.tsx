"use client";

import React, { useState, useRef, useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AudioVisualizer from "../component/visualizer";

const playlists = [
  {
    name: "Ciwan Haco",
    image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
    songs: Array(8)
      .fill([
        {
          title: "Ciwan Haco - Dîlok",
          subtitle: "Dîlok Album",
          duration: "3:52",
          image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
          audioUrl: "/adults/Music section/Ciwan Haco/Giwan Haco 1.mp3",
          videoUrl: "/adults/Music section/Ciwan Haco/Yari serin.mp4",
        },
        {
          title: "Ciwan Haco - Hewal",
          subtitle: "Live",
          duration: "4:21",
          image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
          audioUrl: "/adults/Music section/Ciwan Haco/Giwan Haco 2.mp3",
          videoUrl: "/adults/Music section/Ciwan Haco/Macek.mp4",
        },
      ])
      .flat(),
  },
  {
    name: "Şivan Perwer",
    image: "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
    songs: Array(8)
      .fill([
        {
          title: "Şivan Perwer - Ey Ferat",
          subtitle: "Best of Şivan",
          duration: "5:00",
          image: "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
          videoUrl: "/adults/Music section/sivan Perwer/Dur Dur.mp4",
          audioUrl: "/adults/Music section/sivan Perwer/Bero Bass.wav",
        },
        {
          title: "Şivan Perwer - Daye",
          subtitle: "Classic",
          duration: "4:35",
          image: "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
          videoUrl: "/adults/Music section/sivan Perwer/Nemire Lawik.mp4",
          audioUrl: "/adults/Music section/sivan Perwer/Bero Bass.wav",
        },
      ])
      .flat(),
  },
  {
    name: "Diyar Dersim",
    image: "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
    songs: Array(8)
      .fill([
        {
          title: "Diyar Dersim - Roj baş",
          subtitle: "Live in Amed",
          duration: "3:40",
          image: "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
          videoUrl: "/adults/Music section/Diyar dersim/Emrem Buri.mp4",
          audioUrl: "/adults/Music section/Diyar dersim/Song 1.mp3",
        },
        {
          title: "Diyar Dersim - Roj baş",
          subtitle: "Live in Amed",
          duration: "3:40",
          image: "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
          videoUrl: "/adults/Music section/Diyar dersim/TE DIGO NA.mp4",
          audioUrl: "/adults/Music section/Diyar dersim/Song 2.mp3",
        },
      ])
      .flat(),
  },
  {
    name: "Seyda Rojava",
    image: "/adults/Music section/seyda Rojava/seyda.jpg",
    songs: Array(8)
      .fill([
        {
          title: "Seyda Rojava - Helebçe",
          subtitle: "Memories",
          duration: "4:11",
          image: "/adults/Music section/seyda Rojava/seyda.jpg",
          videoUrl: "/adults/Music section/seyda Rojava/Gula Male.mp4",
          audioUrl: "/adults/Music section/seyda Rojava/seyda Mirovati.mp3",
        },
        {
          title: "Seyda Rojava - Helebçe",
          subtitle: "Memories",
          duration: "4:11",
          image: "/adults/Music section/seyda Rojava/seyda.jpg",
          videoUrl: "/adults/Music section/seyda Rojava/Tene Dilem.mp4",
          audioUrl: "/adults/Music section/seyda Rojava/seyda Tu Nizani.mp3",
        },
      ])
      .flat(),
  },
  {
    name: "Ciwan Haco",
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
  const searchParams = useSearchParams();
  const playlist = searchParams.get("playlist") || 0;

  const playlistIndex = parseInt((playlist as string) || "0");
  const reorderedPlaylists = [
    playlists[playlistIndex],
    ...playlists.filter((_, i) => i !== playlistIndex),
  ];
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const router = useRouter();

  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(0);
  const selectedPlaylist = reorderedPlaylists[selectedPlaylistIndex];
  const songs = selectedPlaylist.songs;
  const videos = songs.map((s) => s.videoUrl);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);

  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    return () => {
      // Clean up when route changes
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      sourceRef.current = null;
    };
  }, [pathname]);

  useEffect(() => {
    const audio = new Audio(songs[currentIndex].audioUrl);
    audio.crossOrigin = "anonymous";

    setAudioEl(audio);

    const ctx = new (window.AudioContext ??
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 256;

    const source = ctx.createMediaElementSource(audio);
    source.connect(analyserNode);
    analyserNode.connect(ctx.destination);

    audioContextRef.current = ctx;
    analyserRef.current = analyserNode;
    sourceRef.current = source;

    setAnalyser(analyserNode);
    setDataArray(new Uint8Array(analyserNode.frequencyBinCount));

    // Play if needed
    if (isPlaying) {
      audio.play().catch(console.warn);
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(Math.min((audio.currentTime / audio.duration) * 100, 100));
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.pause();
      audio.src = "";
      audio.load();
      audio.remove();

      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);

      if (audioContextRef.current) audioContextRef.current.close();

      sourceRef.current = null;
      analyserRef.current = null;
      audioContextRef.current = null;
    };
  }, [currentIndex]);

  useEffect(() => {
    const updateVisualizer = () => {
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        setAudioData(new Uint8Array(dataArray));
      }
    };

    let animationId: number;

    const animate = () => {
      updateVisualizer();
      animationId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationId = requestAnimationFrame(animate);
    } else {
      // When paused, keep the last audio data
      updateVisualizer();
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, analyser, dataArray]);

  const togglePlayPause = () => {
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
    } else {
      audioEl.play().catch(console.warn);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioEl) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioEl.currentTime = newTime;
  };

  const playSong = (index: number) => {
    const audio = audioEl;
    if (!audio) return;

    audio.pause();
    audio.src = songs[index].audioUrl; // or videoUrl if that's your audio
    audio.load();
    audio.play().catch(console.warn);
    setIsPlaying(true);
    setCurrentIndex(index);
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
            ["Dilko Raqse", "/images/adults/music7.jpg", "/adult/music/diloke"],
            [
              "Hunermend",
              "/images/adults/music4.png",
              "/adult/music/hunermend",
            ],
            ["Dilokemin", "/images/adults/music8.png", "/adult/music/dilkomin"],
          ].map((label, i) => (
            <div
              onClick={() => {
                togglePlayPause();
                router.push(label[2]);
              }}
              key={i}
              className={`relative aspect-video tv-md:w-[250px] tv-md:h-[151px] rounded-2xl overflow-hidden shadow-2xl group ${
                i === 1
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
                  setSelectedPlaylistIndex(index);
                  setCurrentIndex(0);
                  setIsPlaying(true);
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
                <div className="absolute bottom-3 left-4 z-20">
                  <span className="text-white tv-md:text-[26px] text-lg font-semibold drop-shadow-lg">
                    {playlist.name}
                  </span>
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
                  setIsPlaying(true);
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
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
            <AudioVisualizer audioData={audioData} isPlaying={isPlaying} />
          </div>

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
                {isPlaying ? (
                  <div className="w-16 h-16 rounded-full bg-black/30  shadow-lg flex items-center justify-center">
                    <svg
                      width="29"
                      height="50"
                      viewBox="0 0 29 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_4089_2522)">
                        <path
                          d="M5.3125 6.41935C5.3125 5.08318 6.65565 4 8.3125 4C9.96935 4 11.3125 5.08318 11.3125 6.41935V51.5806C11.3125 52.9168 9.96935 54 8.3125 54C6.65565 54 5.3125 52.9168 5.3125 51.5806V6.41935Z"
                          fill="white"
                        />
                      </g>
                      <g filter="url(#filter1_d_4089_2522)">
                        <path
                          d="M17.3125 6.41935C17.3125 5.08318 18.6556 4 20.3125 4C21.9694 4 23.3125 5.08318 23.3125 6.41935V51.5806C23.3125 52.9168 21.9694 54 20.3125 54C18.6556 54 17.3125 52.9168 17.3125 51.5806V6.41935Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_4089_2522"
                          x="0.3125"
                          y="0"
                          width="16"
                          height="60"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_4089_2522"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_4089_2522"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_4089_2522"
                          x="12.3125"
                          y="0"
                          width="16"
                          height="60"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_4089_2522"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_4089_2522"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                ) : (
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
                )}
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
