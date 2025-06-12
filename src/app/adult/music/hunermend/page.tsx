"use client";

import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navigation active="music" />
      <div className="min-h-screen pt-[150px] w-full h-full bg-[#0c0c0c] text-white pt-10 px-6 font-sans">
        <div className="flex gap-8 mx-auto">
          {/* Sidebar */}
          <aside className="w-64 flex flex-col gap-6">
            {[
              ["Stream Destpek", "/images/adults/streams.jpg", "/adult/music"],
              [
                "Dilko Raqse",
                "/images/adults/music7.jpg",
                "/adult/music/diloke",
              ],
              [
                "Hunermend",
                "/images/adults/music4.png",
                "/adult/music/hunermend",
              ],
              [
                "Dilokemin",
                "/images/adults/music8.png",
                "/adult/music/dilkomin",
              ],
            ].map((label, i) => (
              <div
                onClick={() => router.push(label[2])}
                key={i}
                className={`relative aspect-video tv-md:w-[250px] tv-md:h-[151px] rounded-2xl overflow-hidden shadow-2xl group ${
                  i === 2
                    ? "brightness-100"
                    : "brightness-50 hover:brightness-100"
                } transition-all duration-300`}
              >
                {/* BACKGROUND IMAGE: Scaled & Blurred */}
                <div className="absolute inset-0  scale-105 -translate-y-1 -translate-x-2 z-0 rounded-2xl overflow-hidden">
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

          {/* Main Content */}
          <main className="flex-1">
            {/* Planned Streams */}
            <section>
              <h2
                className="inline-block text-2xl tv-md:w-[219px] tv-md:h-[51px] tv-md:text-[34px] font-semibold mb-3 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Latest Artist
              </h2>
              <div className="flex gap-4 overflow-hidden">
                {[
                  [
                    "/adult/music/hunermend/playing?playlist=0&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "Ciwan Haco",
                    "Dîlok",
                  ],
                  [
                    "/adult/music/hunermend/playing?playlist=1&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                    "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                    "Şivan Perwer",
                    "Ey Ferat",
                  ],
                  [
                    "/adult/music/hunermend/playing?playlist=2&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                    "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                    "Diyar Dersim",
                    "Roj baş",
                  ],
                  [
                    "/adult/music/hunermend/playing?playlist=3&image=/adults/Music section/seyda Rojava/seyda.jpg",
                    "/adults/Music section/seyda Rojava/seyda.jpg",
                    "Seyda Rojava",
                    "Helebçe",
                  ],
                  [
                    "/adult/music/hunermend/playing?playlist=4&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "Ciwan Haco",
                    "Dîlok",
                  ],
                ].map((label, i) => (
                  <div
                    onClick={() => router.push(label[0])}
                    key={i}
                    className="relative w-full h-[400px] tv-md:w-[350px] tv-md:h-[400px] rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label[1]}
                      alt="Chef"
                      className={
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      }
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    {/* BOTTOM-LEFT WATCH BUTTON */}
                    <div className="p-3 absolute bottom-3 left-3 flex flex-col items-start text-white space-y-1">
                      <span className="text-sm mb-3 tv-md:text-[34px] font-semibold">
                        {label[2]}
                      </span>
                      <span className="text-sm font-semibold tv-md:text-[34px]">
                        {label[3]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ON AIR Section */}
            <section>
              <h2
                className="inline-block text-2xl tv-md:w-[219px] tv-md:h-[51px] tv-md:text-[34px] font-semibold mt-3 mb-3 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Latest Artist
              </h2>
              <div className="flex gap-4 overflow-hidden">
                {[
                  [
                    "/adult/music/hunermend/playing?playlist=0&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "Ciwan Haco",
                    "Dîlok",
                  ],
                  [
                    "/adult/music/hunermend/playing?playlist=1&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                    "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                    "Şivan Perwer",
                    "Ey Ferat",
                  ],
                  [
                    "/adult/music/hunermend/playing?playlist=2&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                    "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                    "Diyar Dersim",
                    "Roj baş",
                  ],
                  [
                    "/adult/music/hunermend/playing?playlist=3&image=/adults/Music section/seyda Rojava/seyda.jpg",
                    "/adults/Music section/seyda Rojava/seyda.jpg",
                    "Seyda Rojava",
                    "Helebçe",
                  ],
                  [
                    "/adult/music/hunermend/playing?playlist=4&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "Ciwan Haco",
                    "Dîlok",
                  ],
                ].map((label, i) => (
                  <div
                    onClick={() => router.push(label[0])}
                    key={i}
                    className="relative w-full h-[400px] tv-md:w-[350px] tv-md:h-[400px] rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label[1]}
                      alt="Chef"
                      className={
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      }
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    {/* BOTTOM-LEFT WATCH BUTTON */}
                    <div className="p-3 absolute bottom-3 left-3 flex flex-col items-start text-white space-y-1">
                      <span className="text-sm mb-3 tv-md:text-[34px] font-semibold">
                        {label[2]}
                      </span>
                      <span className="text-sm tv-md:text-[34px] font-semibold">
                        {label[3]}
                      </span>
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
