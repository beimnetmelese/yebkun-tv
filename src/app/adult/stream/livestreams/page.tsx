"use client";

import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navigation active="stream" />
      <div className="min-h-screen pt-[150px] bg-[#0c0c0c] text-white pt-10 px-6 font-sans">
        <div className="flex gap-8 mx-auto">
          {/* Sidebar */}
          <aside className="w-64 flex flex-col gap-6">
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
          <main className="flex-1">
            {/* Planned Streams */}
            <section className="mb-12">
              <h2
                className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Planned Streams
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                  "/images/adults/podcast.jpg",
                  "/images/adults/chef.png",
                  "/images/adults/live.jpg",
                ].map((label, i) => (
                  <div
                    onClick={() => router.push("/plannedStream")}
                    key={i}
                    className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black cursor-pointer group transform transition duration-300 hover:scale-105 hover:brightness-110"
                  >
                    <img
                      src={label}
                      alt="Podcast"
                      className={`absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-300 ${
                        label === "/chef.png"
                          ? "scale-x-[-1] hover:scale-x-[-1]"
                          : ""
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/75 to-transparent">
                      <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                        <span className="text-sm font-semibold">
                          Channel Name
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                            🔔 159K
                          </span>
                          <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                            Politics
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="bg-gray-300/80 text-xs text-black px-3 py-1 rounded-full font-medium">
                          Today 18:00
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ON AIR Section */}
            <section>
              <h2
                className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#ED1C24" }}
              >
                ON AIR
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
                    onClick={() => router.push("/liveStream")}
                    key={i}
                    className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label}
                      alt="Chef"
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
                        label === "/chef.png"
                          ? "scale-x-[-1] hover:scale-[1.05] hover:scale-x-[-1]"
                          : "hover:scale-105"
                      }`}
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/75 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                    {/* TOP-RIGHT CHANNEL INFO */}
                    <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        Channel Name
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                          📺 159K
                        </span>
                        <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                          Life Style
                        </span>
                      </div>
                    </div>

                    {/* BOTTOM-LEFT WATCH BUTTON */}
                    <div className="absolute bottom-3 left-3">
                      <button className="flex items-center space-x-2 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-red-700 transition">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10 8.64v6.72L15.27 12 10 8.64z" />
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </svg>
                        <span>Watch Now</span>
                      </button>
                    </div>

                    {/* BOTTOM-RIGHT LOGO */}
                    <div className="absolute bottom-3 right-3">
                      <img
                        src="/images/adults/logo.jpg"
                        alt="YouTube"
                        className="w-6 h-6 rounded-md"
                      />
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
