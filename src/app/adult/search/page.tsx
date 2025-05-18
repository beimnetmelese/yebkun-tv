import React from "react";

const KeyboardKey = ({ label = " ", extraClasses = "" }) => (
  <div
    className={`bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-md m-1 font-medium text-sm shadow-sm hover:bg-gray-700 transition-colors ${extraClasses}`}
  >
    {label}
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Body */}
      <div className="p-6 flex flex-wrap justify-between gap-6">
        {/* Left - Recent Search */}
        <div className="bg-white p-4 rounded-xl w-full md:w-[300px] shadow-sm">
          <h2 className="font-semibold text-blue-900 mb-4 text-sm">
            Recent Search
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <div className="flex items-center gap-2 text-sm text-blue-900">
                🕒 <span>Recent Search</span>
              </div>
              <button className="hover:text-red-500">🗑️</button>
            </div>
            <div className="flex items-center gap-2 text-sm bg-gray-100 p-2 rounded-md text-blue-900">
              🕒 <span>Recent Search</span>
            </div>
          </div>
        </div>

        {/* Middle - Editable Recent */}
        <div className="bg-white p-4 rounded-xl w-full md:w-[300px] shadow-sm">
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm bg-gray-100 p-2 rounded-md text-blue-900"
              >
                ✏️ <span>Recent Search</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Keyboard & Suggestions */}
        <div className="bg-white p-4 rounded-xl w-full md:flex-1 shadow-sm">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-full max-w-md">
              {/* Email Suggestions */}
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {["@gmail.com", "@ymail.com", "@hotmail.com"].map((email) => (
                  <span
                    key={email}
                    className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    {email}
                  </span>
                ))}
              </div>

              {/* Keyboard */}
              <div className="flex flex-wrap justify-center">
                {/* First Row */}
                <div className="flex w-full justify-center mb-1">
                  {"qwertyuiop".split("").map((char) => (
                    <KeyboardKey key={char} label={char} />
                  ))}
                </div>

                {/* Second Row */}
                <div className="flex w-full justify-center mb-1">
                  {"asdfghjkl".split("").map((char) => (
                    <KeyboardKey key={char} label={char} />
                  ))}
                </div>

                {/* Third Row */}
                <div className="flex w-full justify-center mb-1">
                  <KeyboardKey label="123?" extraClasses="text-xs" />
                  {"zxcvbnm".split("").map((char) => (
                    <KeyboardKey key={char} label={char} />
                  ))}
                  <KeyboardKey label="⌫" extraClasses="text-lg" />
                </div>

                {/* Space Bar Row */}
                <div className="flex w-full justify-center">
                  <KeyboardKey label=" " extraClasses="w-[200px]" />
                  <KeyboardKey
                    label="➡️"
                    extraClasses="bg-blue-600 hover:bg-blue-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 pb-12">
        {/* Latest Songs */}
        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              "/images/adults/podcast.jpg",
              "/images/adults/chef.png",
              "/images/adults/live.jpg",
              "/images/adults/podcast.jpg",
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-xl overflow-hidden shadow-md group hover:scale-105 transition-transform bg-black"
              >
                <img
                  src={img}
                  alt="Media"
                  className={`absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-300 ${
                    img.includes("chef")
                      ? "scale-x-[-1] group-hover:scale-x-[-1]"
                      : ""
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute top-3 right-3 text-white text-xs bg-gray-800 px-2 py-0.5 rounded-md">
                  🔔 159K
                </div>
                <div className="absolute bottom-3 left-3 text-white text-lg font-medium">
                  Song Title
                </div>
                <div className="absolute bottom-3 right-3 text-white text-xs">
                  18:00
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/30 p-3 rounded-full backdrop-blur-sm">
                    ▶️
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Artists */}
        <section className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {Array(5)
              .fill("/images/adults/chef.png")
              .map((img, i) => (
                <div
                  key={i}
                  className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-md group bg-black hover:scale-[1.015] transition-transform"
                >
                  <img
                    src={img}
                    alt="Artist"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                      img.includes("chef")
                        ? "scale-x-[-1] group-hover:scale-x-[-1]"
                        : "group-hover:scale-105"
                    }`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white space-y-1">
                    <div className="text-sm font-semibold">Artist Name</div>
                    <div className="text-sm font-semibold">Rojova</div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
