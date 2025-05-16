import Navigation from "@/components/ui/navigation";

export default function AdultPage() {
  return (
    <>
      <div className="min-h-screen overflow-auto bg-[#0c0c0c] text-white pt-10 px-6 font-sans">
        <div className="flex gap-8 mx-auto">
          {/* Main Content */}
          <main className="flex-1">
            {/* ON AIR Section */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <div className=" w-full relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]">
                  {/* BACKGROUND IMAGE */}
                  <img
                    src={"/images/adults/podcast.jpg"}
                    alt="Chef"
                    className={
                      "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    }
                  />

                  {/* DARK GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/75 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* TOP-RIGHT CHANNEL INFO */}
                  <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                    <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                      Clip Name
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        Artist Name
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
                    <span className="bg-gray-800 text-xs mr-2 px-2 py-0.5 rounded-md">
                      nu ye
                    </span>
                    <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                      clip
                    </span>
                  </div>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]">
                  {/* BACKGROUND IMAGE */}
                  <img
                    src={"/images/adults/podcast.jpg"}
                    alt="Chef"
                    className={
                      "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    }
                  />

                  {/* DARK GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/75 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* TOP-RIGHT CHANNEL INFO */}
                  <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                    <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                      Artist Name
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        Rojova
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
                    <span className="bg-gray-800 text-xs mr-2 px-2 py-0.5 rounded-md">
                      nu ye
                    </span>
                    <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                      clip
                    </span>
                  </div>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]">
                  {/* BACKGROUND IMAGE */}
                  <img
                    src={"/images/adults/chef.png"}
                    alt="Chef"
                    className={
                      "absolute inset-0 w-full h-full object-cover transition-transform duration-300 scale-x-[-1] hover:scale-[1.05] hover:scale-x-[-1]"
                    }
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
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]">
                  {/* BACKGROUND IMAGE */}
                  <img
                    src={"/images/adults/chef.png"}
                    alt="Chef"
                    className={
                      "absolute inset-0 w-full h-full object-cover transition-transform duration-300 scale-x-[-1] hover:scale-[1.05] hover:scale-x-[-1]"
                    }
                  />

                  {/* DARK GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/75 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* TOP-RIGHT CHANNEL INFO */}
                  <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                    <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                      TV Channel
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        Channel Name
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
                {[
                  "/images/adults/podcast.jpg",
                  "/images/adults/chef.png",
                  "/images/adults/live.jpg",
                  "/images/adults/podcast.jpg",
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
                        label === "/chef.png"
                          ? "scale-x-[-1] hover:scale-[1.05] hover:scale-x-[-1]"
                          : "hover:scale-105"
                      }`}
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-transparent" />

                    {/* TOP-RIGHT CHANNEL INFO */}
                    <div className="absolute top-3 left-3 flex flex-col items-end text-white space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                          📺 159K
                        </span>
                        <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-md">
                          Life Style
                        </span>
                      </div>
                    </div>

                    {/* TOP-LEFT WATCH BUTTON */}
                    <div className="absolute top-3 right-3">
                      <button className="flex items-center space-x-2 bg-white text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-white-700 transition">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10 8.64v6.72L15.27 12 10 8.64z" />
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </svg>
                      </button>
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
