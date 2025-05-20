"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import VideoStreamPlayer, { VideoStreamPlayerHandle } from "./videoStream";
import { FaBell, FaRegCalendarAlt } from "react-icons/fa";
import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";

export default function ChefChannel() {
  const [showPlayer, setShowPlayer] = useState(false);
  const playerRef = useRef<VideoStreamPlayerHandle>(null);
  const router = useRouter();
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
    <>
      <Navigation active="stream" />
      <div
        className="relative pt-[150px] px-6 xl:px-12 min-h-screen text-white font-sans bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/images/adults/chef.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/75 to-transparent z-0 pointer-events-none" />
        <main className="relative z-10 flex flex-col lg:flex-row gap-8 w-full">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex flex-col gap-6">
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
                  <span className="flex items-center gap-1 bg-white/25 text-xs px-2 py-0.5 rounded-md">
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
                  <span className="flex items-center gap-1 bg-white/25 text-xs px-2 py-0.5 rounded-md">
                    12+
                  </span>
                  <span className="flex items-center gap-1 bg-white/25 text-xs px-2 py-0.5 rounded-md">
                    4K
                  </span>
                </div>
              </div>
            </div>
            {showPlayer && <VideoStreamPlayer ref={playerRef} />}
            {/* Next Streaming Info */}
            <div className="bg-white/25 text-center rounded-lg p-4 mt-6 max-w-xs text-white backdrop-blur-sm">
              <div>
                <svg
                  width="56"
                  height="55"
                  viewBox="0 0 56 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4498 4.58398C17.4066 4.58398 18.1823 5.2943 18.1823 6.17052V9.37089C19.719 9.3436 21.4416 9.3436 23.3797 9.3436H32.6196C34.5578 9.3436 36.2803 9.3436 37.8171 9.37089V6.17052C37.8171 5.2943 38.5927 4.58398 39.5496 4.58398C40.5064 4.58398 41.282 5.2943 41.282 6.17052V9.51126C44.6069 9.75507 46.7895 10.3534 48.3931 11.8219C49.9967 13.2904 50.6501 15.2892 50.9163 18.334V20.6257H5.08301V18.334C5.34925 15.2892 6.00265 13.2904 7.60623 11.8219C9.20981 10.3534 11.3925 9.75507 14.7173 9.51126V6.17052C14.7173 5.2943 15.493 4.58398 16.4498 4.58398Z"
                    fill="white"
                    fill-opacity="0.6"
                  />
                  <path
                    opacity="0.5"
                    d="M50.9163 32.0833V27.5C50.9163 25.5772 50.8873 22.1496 50.8577 20.625H5.09643C5.06687 22.1496 5.09593 25.5772 5.09593 27.5V32.0833C5.09593 40.7257 5.09593 45.047 7.78003 47.7318C10.4641 50.4167 14.7841 50.4167 23.4241 50.4167H32.5882C41.2282 50.4167 45.5481 50.4167 48.2322 47.7318C50.9163 45.047 50.9163 40.7257 50.9163 32.0833Z"
                    fill="white"
                    fill-opacity="0.6"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M37.1663 30.3652C38.1156 30.3652 38.8851 31.1347 38.8851 32.084V34.9486L41.7497 34.9486C42.6989 34.9486 43.4684 35.7181 43.4684 36.6674C43.4684 37.6166 42.6989 38.3861 41.7497 38.3861H38.8851V41.2507C38.8851 42.1999 38.1156 42.9694 37.1663 42.9694C36.2171 42.9694 35.4476 42.1999 35.4476 41.2507V38.3861L32.583 38.3861C31.6338 38.3861 30.8643 37.6166 30.8643 36.6674C30.8643 35.7181 31.6338 34.9486 32.583 34.9486H35.4476L35.4476 32.084C35.4476 31.1347 36.2171 30.3652 37.1663 30.3652Z"
                    fill="#EB2D2E"
                  />
                </svg>
              </div>
              <h2 className="mt-2 text-lg font-semibold">
                Next Streaming Title
              </h2>
              <p className="mt-2">Tomorrow</p>
              <p className="mt-2">18:00</p>
              <div>
                <svg
                  width="46"
                  height="45"
                  viewBox="0 0 46 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M35.6546 16.875V18.1952C35.6546 19.7795 36.1068 21.3285 36.9541 22.6467L39.0306 25.8772C40.9272 28.8279 39.4793 32.8386 36.1806 33.7717C27.5511 36.2126 18.4489 36.2126 9.81943 33.7717C6.52071 32.8386 5.07279 28.8279 6.96942 25.8772L9.04587 22.6467C9.89322 21.3285 10.3454 19.7795 10.3454 18.1952V16.875C10.3454 9.62626 16.011 3.75 23 3.75C29.989 3.75 35.6546 9.62626 35.6546 16.875Z"
                    fill="white"
                  />
                  <path
                    d="M14.0813 34.7725C15.3018 38.5321 18.8335 41.2501 23 41.2501C27.1665 41.2501 30.6982 38.5321 31.9187 34.7725C26.021 35.8792 19.979 35.8792 14.0813 34.7725Z"
                    fill="white"
                  />
                </svg>
              </div>
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
    </>
  );
}
