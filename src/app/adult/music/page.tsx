"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-[#0c0c0c] text-white pt-10 px-6 font-sans">
        <div className="flex gap-8 mx-auto">
          {/* Sidebar */}
          <aside className="w-64 flex flex-col gap-6">
            {[
              ["Stream Destpek", "/images/adults/streams.jpg"],
              ["TV Channels", "/images/adults/tv.jpg"],
              ["Live Streams", "/images/adults/mic.jpg"],
              ["Live Streams", "/images/adults/mic.jpg"],
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
                        <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                          🔔 159K
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/30 p-4 rounded-full backdrop-blur-md">
                        ▶️
                      </div>
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
