"use client";

import Image from "next/image";
import Navigation from "@/components/ui/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function VideoPlayerSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Default Title";
  const artist = searchParams.get("artist") || "One Direction";
  const videoUrl = searchParams.get("videoUrl") || "/default.mp4";
  const photoUrl = searchParams.get("image") || "/images/adults/movie2.png";

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100 || 0
      );
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }

    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);
      timeout = setTimeout(() => setShowControls(false), 1000);
    };

    resetTimeout();

    window.addEventListener("mousemove", resetTimeout);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimeout);
    };
  }, []);

  return (
    <>
      <Navigation active="videos" />
      <div className="bg-[#1c1b1d] pt-[150px] min-h-screen text-white p-4 space-y-6">
        {/* Video Player */}
        <div className="rounded-xl aspect-video max-w-5xl overflow-hidden tv-md:w-[1200px] tv-md:max-w-[1200px] tv-md:h-[675px] bg-black shadow-lg mx-auto relative group">
          <div className="absolute top-4 left-4 text-white z-10">
            <div
              className={
                "flex items-center  justify-between p-2 bg-black/25 hover:bg-zinc-700 cursor-pointer rounded-3xl"
              }
            >
              <div className="flex  p-2 items-center gap-3">
                <img
                  src={photoUrl}
                  className="w-10 h-10  tv-md:w-[40px] tv-md:h-[40px] rounded-full"
                  alt="cover"
                />
                <div>
                  <p className="text-sm tv-md:text-[18px] font-medium">
                    {artist}
                  </p>
                  <p className="text-xs tv-md:text-[18px] text-gray-200">
                    {title}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <video
            ref={videoRef}
            className="w-full cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            poster={photoUrl}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Controls Overlay */}
          {showControls && (
            <>
              {/* Controls */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center space-x-4 p-3 rounded-full pointer-events-auto">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => skip(-10)} className="text-white">
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
                          fill-opacity="0.4"
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
                    <button onClick={togglePlay} className="text-white">
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
                            fill-opacity="0.4"
                          />
                          <path
                            d="M42.4872 23.6044C45.8376 25.5825 45.8376 30.7032 42.4872 32.6813L22.2578 44.6249C19.0016 46.5474 15 44.0451 15 40.0865L15 16.1992C15 12.2406 19.0016 9.73833 22.2578 11.6608L42.4872 23.6044Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </button>
                    <button onClick={() => skip(10)} className="text-white">
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
                          fill-opacity="0.4"
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
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100`}
              >
                {/* Progress Bar */}
                <div className="w-full px-4 pb-2">
                  <div
                    className="w-full h-2 bg-white/30 rounded-full cursor-pointer"
                    onClick={handleProgressBarClick}
                  >
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-2xl text-white">
                    <span className="tv-md:text-[16px]">
                      {formatTime(currentTime)}
                    </span>
                    <span className="tv-md:text-[16px]">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Scrollable Thumbnail List */}
        <section>
          <h2
            className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
            style={{ backgroundColor: "#FFFFFF40" }}
          >
            Music Clip
          </h2>
          <div className="flex gap-4 overflow-hidden">
            {[
              [
                "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                "Ciwan Haco",
                "Dîlok",
                "/adult/video/clip?videoUrl=/adults/Music section/Ciwan Haco/Yari serin.mp4&title=Dîlok&artist=Ciwan Haco&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
              ],
              [
                "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                "Şivan Perwer",
                "Ey Ferat",
                "/adult/video/clip?videoUrl=/adults/Music section/sivan Perwer/Dur Dur.mp4&title=Ey Ferat&artist=Şivan Perwer&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
              ],
              [
                "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                "Diyar Dersim",
                "Roj baş",
                "/adult/video/clip?videoUrl=/adults/Music section/Diyar dersim/Emrem Buri.mp4&title=Roj baş&artist=Diyar Dersim&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
              ],
              [
                "/adults/Music section/seyda Rojava/seyda.jpg",
                "Seyda Rojava",
                "Helebçe",
                "/adult/video/clip?videoUrl=/adults/Music section/seyda Rojava/Gula Male.mp4&title=Dîlok&artist=Seyda Rojava&image=/adults/Music section/seyda Rojava/seyda.jpg",
              ],
              [
                "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                "Ciwan Haco",
                "Dîlok",
                "/adult/video/clip?videoUrl=/adults/Music section/Ciwan Haco/Yari serin.mp4&title=Dîlok&artist=Ciwan Haco&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
              ],
              [
                "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                "Şivan Perwer",
                "Ey Ferat",
                "/adult/video/clip?videoUrl=/adults/Music section/sivan Perwer/Dur Dur.mp4&title=Ey Ferat&artist=Şivan Perwer&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
              ],
              [
                "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                "Diyar Dersim",
                "Roj baş",
                "/adult/video/clip?videoUrl=/adults/Music section/Diyar dersim/Emrem Buri.mp4&title=Roj baş&artist=Diyar Dersim&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
              ],
              [
                "/adults/Music section/seyda Rojava/seyda.jpg",
                "Seyda Rojava",
                "Helebçe",
                "/adult/video/clip?videoUrl=/adults/Music section/seyda Rojava/Gula Male.mp4&title=Dîlok&artist=Seyda Rojava&image=/adults/Music section/seyda Rojava/seyda.jpg",
              ],
              [
                "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                "Ciwan Haco",
                "Dîlok",
                "/adult/video/clip?videoUrl=/adults/Music section/Ciwan Haco/Yari serin.mp4&title=Dîlok&artist=Ciwan Haco&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
              ],
              [
                "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                "Şivan Perwer",
                "Ey Ferat",
                "/adult/video/clip?videoUrl=/adults/Music section/sivan Perwer/Dur Dur.mp4&title=Ey Ferat&artist=Şivan Perwer&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
              ],
              [
                "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                "Diyar Dersim",
                "Roj baş",
                "/adult/video/clip?videoUrl=/adults/Music section/Diyar dersim/Emrem Buri.mp4&title=Roj baş&artist=Diyar Dersim&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
              ],
            ].map((label, i) => (
              <div
                onClick={() => router.push(label[3])}
                key={i}
                className="w-[300px] relative tv-md:w-[340px] flex-shrink-0 tv-md:h-[210px] aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
              >
                {/* BACKGROUND IMAGE */}
                <img
                  src={label[0]}
                  alt="Chef"
                  className={
                    "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  }
                />

                {/* DARK GRADIENT OVERLAY */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* TOP-RIGHT CHANNEL INFO */}
                <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                  <span className="flex items-center gap-1 bg-black/25 text-xs px-2 py-0.5 rounded-md">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_3514_4222)">
                        <path
                          d="M2.88427 2.73163C2.71327 2.73163 2.54727 2.64413 2.45377 2.48663L2.15727 1.98663C2.01677 1.74913 2.09477 1.44263 2.33277 1.30163C2.56977 1.16113 2.87677 1.23913 3.01777 1.47713L3.31427 1.97713C3.45477 2.21463 3.37677 2.52113 3.13877 2.66213C3.05877 2.70963 2.97127 2.73163 2.88427 2.73163ZM6.16377 5.45313C5.61227 5.45313 5.16377 5.90163 5.16377 6.45313C5.16377 7.00463 5.61227 7.45313 6.16377 7.45313C6.71527 7.45313 7.16377 7.00463 7.16377 6.45313C7.16377 5.90163 6.71527 5.45313 6.16377 5.45313ZM10.7588 7.59013C10.3358 8.14413 8.75377 9.95313 6.16377 9.95313C3.57377 9.95313 2.08627 8.32363 1.56127 7.62263C1.05027 6.94063 1.05127 5.99463 1.56377 5.32213C1.98727 4.76663 3.57127 2.95313 6.16377 2.95313C8.72177 2.95313 10.2308 4.58613 10.7608 5.28813C11.2748 5.96913 11.2738 6.91563 10.7588 7.59013ZM8.16377 6.45313C8.16377 5.35013 7.26677 4.45313 6.16377 4.45313C5.06077 4.45313 4.16377 5.35013 4.16377 6.45313C4.16377 7.55613 5.06077 8.45313 6.16377 8.45313C7.26677 8.45313 8.16377 7.55613 8.16377 6.45313ZM6.66377 1.45313V0.953125C6.66377 0.677125 6.43977 0.453125 6.16377 0.453125C5.88777 0.453125 5.66377 0.677125 5.66377 0.953125V1.45313C5.66377 1.72913 5.88777 1.95313 6.16377 1.95313C6.43977 1.95313 6.66377 1.72913 6.66377 1.45313ZM9.87377 2.48613L10.1703 1.98613C10.3108 1.74863 10.2328 1.44213 9.99477 1.30113C9.75777 1.16063 9.45077 1.23863 9.30977 1.47663L9.01327 1.97663C8.87277 2.21413 8.95077 2.52063 9.18877 2.66163C9.42227 2.80113 9.73228 2.72613 9.87377 2.48613ZM9.99477 11.6046C10.2323 11.4636 10.3108 11.1571 10.1703 10.9196L9.87377 10.4196C9.73277 10.1816 9.42627 10.1036 9.18877 10.2441C8.95127 10.3846 8.87277 10.6916 9.01327 10.9291L9.30977 11.4291C9.45127 11.6686 9.76127 11.7436 9.99477 11.6046ZM6.66377 11.9526V11.4526C6.66377 11.1766 6.43977 10.9526 6.16377 10.9526C5.88777 10.9526 5.66377 11.1766 5.66377 11.4526V11.9526C5.66377 12.2286 5.88777 12.4526 6.16377 12.4526C6.43977 12.4526 6.66377 12.2286 6.66377 11.9526ZM3.01777 11.4291L3.31427 10.9291C3.45477 10.6916 3.37677 10.3851 3.13877 10.2441C2.90077 10.1031 2.59477 10.1816 2.45377 10.4196L2.15727 10.9196C2.01677 11.1571 2.09477 11.4636 2.33277 11.6046C2.56627 11.7441 2.87627 11.6691 3.01777 11.4291Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3514_4222">
                          <rect
                            width="12"
                            height="12"
                            fill="white"
                            transform="translate(0.163086 0.453125)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    158K
                  </span>
                </div>

                {/* BOTTOM-LEFT WATCH BUTTON */}
                <div className="absolute top-3 left-3">
                  <Image
                    src={"/images/navigation/user.png"}
                    alt={label[0]}
                    width={33}
                    height={33}
                    loading="eager"
                    quality={90}
                    unoptimized
                  />
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                    {label[1]}
                  </span>
                </div>

                {/* BOTTOM-RIGHT LOGO */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                    {label[2]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
