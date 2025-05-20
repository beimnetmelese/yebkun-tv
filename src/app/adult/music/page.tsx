"use client";

import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navigation active="music" />
      <div className="min-h-screen pt-[150px] bg-[#0c0c0c] text-white pt-10 px-6 font-sans">
        <div className="flex gap-8 mx-auto">
          {/* Sidebar */}
          <aside className="w-64 flex flex-col gap-6">
            {[
              ["Stream Destpek", "/images/adults/streams.jpg", "/adult/music"],
              ["Dilko Raqse", "/images/adults/tv.jpg", "/adult/music/diloke"],
              ["Hunermend", "/images/adults/mic.jpg", "/adult/music/hunermend"],
              ["Dilokemin", "/images/adults/mic.jpg", "/adult/music/dilkomin"],
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
          <main className="flex-1">
            {/* Planned Streams */}
            <section className="mb-12">
              <h2
                className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Latest Songs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                  "/images/adults/podcast.jpg",
                  "/images/adults/chef.png",
                  "/images/adults/live.jpg",
                ].map((label, i) => (
                  <div
                    onClick={() => router.push("/adult/music/diloke")}
                    key={i}
                    className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black cursor-pointer group transform transition duration-300 hover:scale-105 hover:brightness-110"
                  >
                    <img
                      src={label}
                      alt="Podcast"
                      className={`absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-300 ${
                        label === "/images/adults/chef.png"
                          ? "scale-x-[-1] hover:scale-x-[-1]"
                          : ""
                      }`}
                    />

                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                      <div className="flex items-center space-x-2">
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
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        width="55"
                        height="55"
                        viewBox="0 0 55 55"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="55"
                          height="55"
                          rx="27.5"
                          fill="black"
                          fill-opacity="0.4"
                        />
                        <path
                          d="M42.7161 23.1879C46.0067 25.1307 46.0067 30.1599 42.7161 32.1027L22.8479 43.833C19.6499 45.7212 15.7197 43.2636 15.7197 39.3757L15.7197 15.915C15.7197 12.027 19.6499 9.56945 22.8479 11.4576L42.7161 23.1879Z"
                          fill="white"
                        />
                      </svg>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="text-xs text-white px-3 py-1 rounded-full font-medium">
                        18:00
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xl text-white px-3 py-1 rounded-full font-medium">
                        Song Title
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ON AIR Section */}
            <section>
              <h2
                className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Latest Artist
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                  "/images/adults/podcast.jpg",
                  "/images/adults/chef.png",
                  "/images/adults/live.jpg",
                  "/images/adults/podcast.jpg",
                  "/images/adults/chef.png",
                  "/images/adults/live.jpg",
                ].map((label, i) => (
                  <div
                    onClick={() =>
                      router.push("/adult/music/hunermend/playing")
                    }
                    key={i}
                    className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label}
                      alt="Chef"
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
                        label === "/images/adults/chef.png"
                          ? "scale-x-[-1] hover:scale-[1.05] hover:scale-x-[-1]"
                          : "hover:scale-105"
                      }`}
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    {/* BOTTOM-LEFT WATCH BUTTON */}
                    <div className="absolute bottom-3 left-3 flex flex-col items-start text-white space-y-1">
                      <span className="text-sm font-semibold">Artist Name</span>
                      <span className="text-sm font-semibold">Rojova</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
