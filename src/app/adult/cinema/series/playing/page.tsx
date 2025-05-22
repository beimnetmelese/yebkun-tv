"use client";

import { useEffect, useRef, useState } from "react";
import VideoStreamPlayer, { VideoStreamPlayerHandle } from "../../videoStream";
import Navigation from "@/components/ui/navigation";

const episodes = [
  { title: "EP 01", time: "03:00", progress: "50%" },
  { title: "EP 02", time: "03:00", progress: "50%" },
  { title: "EP 03", time: "03:00", active: true },
  { title: "EP 04", time: "03:00" },
  { title: "EP 05", time: "03:00", progress: "50%" },
  { title: "EP 06", time: "03:00", progress: "50%" },
  { title: "EP 07", time: "03:00", progress: "50%" },
];

export default function ChefChannel() {
  const scrollByAmount = 300; // change as needed

  const scrollLeft = () => {
    episodesRef.current?.scrollBy({
      left: -scrollByAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    episodesRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };
  const [showPlayer2, setShowPlayer2] = useState(false);
  const playerRef2 = useRef<VideoStreamPlayerHandle>(null);
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
    <>
      <Navigation active="cinema" />
      <div
        className="relative pt-[150px]  pt-10 px-6 xl:px-12 min-h-screen text-white font-sans bg-cover bg-center bg-no-repeat flex flex-col justify-between"
        style={{ backgroundImage: "url('/images/adults/chef.png')" }}
      >
        {/* BACKGROUND OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/75 to-transparent z-0 pointer-events-none" />

        {/* MAIN CONTENT */}
        <main className="relative z-10 flex flex-col lg:flex-row gap-8 w-full mb-28">
          <section className="flex-1">
            <div className="flex items-start gap-6">
              <div>
                <h1 className="text-5xl tv-md:text-[90px] mb-10 font-bold">
                  The Smurfs
                </h1>
                <div className="flex gap-2 mt-3 mb-6 flex-wrap">
                  <span className="flex items-center mr-3  h-[46px] text-[34px] gap-1 bg-white/25 text-xs px-2 py-0.5 rounded-md">
                    <svg
                      width="35"
                      height="35"
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
                  <span className="flex mr-3  h-[46px] text-[34px] items-center gap-1 bg-white/25 text-xs px-2 py-0.5 rounded-md">
                    12+
                  </span>
                  <span className="flex mr-3  h-[46px] text-[34px] items-center gap-1 bg-white/25 text-xs px-2 py-0.5 rounded-md">
                    4K
                  </span>
                </div>
                <h1 className="text-[32px] mt-6 mb-10 font-bold">
                  2012. 2hr. 35min
                </h1>

                {showPlayer2 && <VideoStreamPlayer ref={playerRef2} />}
              </div>
            </div>
          </section>
        </main>

        <div className="fixed w-full bottom-4 left-0 right-0 z-10 px-6 xl:px-12">
          {" "}
          {/* Added bottom-4 for small margin */}
          <div
            className="bg-black/80 backdrop-blur-sm p-4 w-full"
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
                <button onClick={scrollLeft} aria-label="Previous episodes">
                  <svg
                    width="20"
                    height="33"
                    viewBox="0 0 20 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3531 1.0736C18.6235 1.34344 18.838 1.66394 18.9844 2.01678C19.1307 2.36962 19.2061 2.74786 19.2061 3.12985C19.2061 3.51184 19.1307 3.89009 18.9844 4.24292C18.838 4.59576 18.6235 4.91627 18.3531 5.1861L7.03643 16.5028L18.3531 27.8194C18.8984 28.3648 19.2048 29.1044 19.2048 29.8757C19.2048 30.6469 18.8984 31.3866 18.3531 31.9319C17.8077 32.4773 17.0681 32.7837 16.2968 32.7837C15.5256 32.7837 14.7859 32.4773 14.2406 31.9319L0.853094 18.5444C0.582708 18.2746 0.368195 17.9541 0.221832 17.6013C0.07547 17.2484 0.000133514 16.8702 0.000133514 16.4882C0.000133514 16.1062 0.07547 15.728 0.221832 15.3751C0.368195 15.0223 0.582708 14.7018 0.853094 14.4319L14.2406 1.04444C15.3489 -0.0638971 17.2156 -0.0638964 18.3531 1.0736Z"
                      fill="white"
                    />
                  </svg>
                </button>

                <div
                  ref={episodesRef}
                  className="flex w-full overflow-x-auto scrollbar-hide gap-4 py-2"
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
                      className={`relative  tv-md:w-[330px] tv-md:h-[235px] rounded-xl overflow-hidden w-[220px] h-44 flex-shrink-0 group border-2 shadow-[0_12px_20px_rgba(0,0,0,0.5)] cursor-pointer
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

                <button onClick={scrollRight} aria-label="Next episodes">
                  <svg
                    width="20"
                    height="33"
                    viewBox="0 0 20 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.29437 1.0736C1.02398 1.34344 0.809469 1.66394 0.663107 2.01678C0.516744 2.36962 0.441406 2.74786 0.441406 3.12985C0.441406 3.51184 0.516744 3.89009 0.663107 4.24292C0.809469 4.59576 1.02398 4.91627 1.29437 5.1861L12.611 16.5028L1.29437 27.8194C0.749017 28.3648 0.442641 29.1044 0.442641 29.8757C0.442641 30.6469 0.749017 31.3866 1.29437 31.9319C1.83972 32.4773 2.57937 32.7837 3.35062 32.7837C4.12186 32.7837 4.86152 32.4773 5.40687 31.9319L18.7944 18.5444C19.0648 18.2746 19.2793 17.9541 19.4256 17.6013C19.572 17.2484 19.6473 16.8702 19.6473 16.4882C19.6473 16.1062 19.572 15.728 19.4256 15.3751C19.2793 15.0223 19.0648 14.7018 18.7944 14.4319L5.40687 1.04444C4.29853 -0.0638971 2.43187 -0.0638964 1.29437 1.0736Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
