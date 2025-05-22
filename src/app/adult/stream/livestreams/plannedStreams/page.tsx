"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import VideoStreamPlayer, { VideoStreamPlayerHandle } from "./videoStream";
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
              ["Stream Destpek", "/images/adults/streams.jpg", "/adult/stream"],
            ].map((label, i) => (
              <div
                onClick={() => router.push(label[2])}
                key={i}
                className={`relative aspect-video tv-md:w-[250px] tv-md:h-[140px] rounded-2xl overflow-hidden shadow-2xl group ${
                  i === 2
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
                    <span className="text-white tv-md:text-[22px] text-lg font-semibold drop-shadow-lg">
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
                <h1 className="text-5xl mb-4 tv-md:text-[90px] font-bold">
                  Channel Name
                </h1>
                <p className="mt-3 text-3xl tv-md:text-[45px] ">Owner Name</p>
                <div className="flex  gap-2 mt-6 mb-8  flex-wrap">
                  <span className="flex items-center gap-1 mr-3  h-[46px] text-[34px] bg-white/25 text-xs px-2 py-0.5 rounded-md">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.5745 24.3021L30.6034 18.3524C30.8604 16.8664 29.7176 15.5072 28.2112 15.5072H20.6554C19.9065 15.5072 19.3363 14.8351 19.4575 14.0952L20.4239 8.19693C20.5809 7.2387 20.5361 6.25819 20.2923 5.31833C20.0903 4.53975 19.4896 3.91458 18.6996 3.66079L18.4882 3.59287C18.0107 3.43949 17.4896 3.47519 17.0395 3.6921C16.544 3.93085 16.1815 4.36634 16.0472 4.88428L15.3534 7.55865C15.1327 8.40957 14.8112 9.23093 14.3966 10.007C13.7909 11.1409 12.8544 12.0485 11.8809 12.8873L9.78273 14.6954C9.19114 15.2051 8.88046 15.9686 8.94778 16.7471L10.1322 30.4448C10.2408 31.7012 11.2913 32.6657 12.5509 32.6657H19.3302C24.4071 32.6657 28.7398 29.1283 29.5745 24.3021Z"
                        fill="white"
                      />
                      <path
                        opacity="0.5"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.34249 14.4141C4.92767 14.3889 5.42887 14.8291 5.47933 15.4126L6.89625 31.7992C6.98726 32.8518 6.15814 33.7591 5.09943 33.7591C4.1022 33.7591 3.2959 32.9501 3.2959 31.9547V15.5069C3.2959 14.9211 3.75732 14.4394 4.34249 14.4141Z"
                        fill="white"
                      />
                    </svg>
                    158K
                  </span>
                  <span className="flex items-center mr-3  h-[46px] text-[34px] gap-1 bg-white/25 text-xs px-2 py-0.5 rounded-md">
                    12+
                  </span>
                  <span className="flex items-center mr-3  h-[46px] text-[34px] gap-1 bg-white/25 text-xs px-2 py-0.5 rounded-md">
                    4K
                  </span>
                </div>
              </div>
            </div>
            {showPlayer && <VideoStreamPlayer ref={playerRef} />}
            {/* Next Streaming Info */}
            <div className="bg-white/25 text-center tv-md:w-[390px] tv-md:h-[267px] rounded-lg p-4 mt-6 max-w-xs text-white backdrop-blur-sm">
              <div className="flex justify-center">
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
              <h2 className="mt-1 text-lg font-semibold">
                Next Streaming Title
              </h2>
              <p className="mt-1 text-sm">Tomorrow</p>
              <p className="mt-1 text-sm">18:00</p>
              <div className="flex justify-center">
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
              <p className="mt-1 text-sm">Remind me</p>
            </div>
            <div className="flex mt-6 ml-8">
              <div className="flex items-center space-x-[-10px]">
                <img
                  src="/images/adults/streams.jpg"
                  alt="avatar"
                  className="w-[35px] h-[35px] rounded-full border-2 border-white"
                />
                <img
                  src="/images/adults/streams.jpg"
                  alt="avatar"
                  className="w-[35px] h-[35px] rounded-full border-2 border-white"
                />
                <img
                  src="/images/adults/streams.jpg"
                  alt="avatar"
                  className="w-[35px] h-[35px] rounded-full border-2 border-white"
                />
                <img
                  src="/images/adults/streams.jpg"
                  alt="avatar"
                  className="w-[35px] h-[35px] rounded-full border-2 border-white"
                />
                <img
                  src="/images/adults/streams.jpg"
                  alt="avatar"
                  className="w-[35px] h-[35px] rounded-full border-2 border-white"
                />
              </div>
              <span className="ml-3 text-white text-lg p-2">90+ Waiting</span>
            </div>
          </section>
        </main>
        <h2
          className="relative inline-block z-10 text-1xl font-semibold mt-4 mb-2 p-2 rounded-md"
          style={{ backgroundColor: "#FFFFFF40" }}
        >
          My Video
        </h2>
        {/* Video Thumbnails */}
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              onClick={() => {
                setShowPlayer(true);
                setTimeout(() => {
                  playerRef.current?.startVideo();
                }, 0);
              }}
              key={i}
              className="relative w-[440px] flex-shrink-0 tv-md:w-[440px] tv-md:h-[300px] h-[245px] rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <Image
                src="/images/adults/chef.png"
                fill
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
