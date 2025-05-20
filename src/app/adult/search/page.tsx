"use client";

import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const KeyboardKey = ({ label = " ", extraClasses = "" }) => (
  <div
    className={`bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-md m-1 font-medium text-sm shadow-sm hover:bg-gray-700 transition-colors ${extraClasses}`}
  >
    {label}
  </div>
);

const App = () => {
  const router = useRouter();
  return (
    <>
      <Navigation active="gerandin" />
      <div className="min-h-screen pt-[150px]   bg-white">
        {/* Body */}
        <div className="p-6 flex flex-wrap justify-between gap-6">
          {/* Left - Recent Search */}
          <div className="bg-gray-100 p-4 rounded-xl w-full md:w-[300px] shadow-sm">
            <h2 className="font-semibold text-blue-900 mb-4 text-sm">
              Recent Search
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-2 rounded-md">
                <div className="flex items-center gap-2 text-sm text-blue-900">
                  🕒 <span>Recent Search</span>
                </div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M15.2842 6.66536C15.9706 4.72338 17.8226 3.33203 19.9997 3.33203C22.1767 3.33203 24.0288 4.72338 24.7152 6.66536"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M34.1665 10H5.83301"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M31.3891 14.168L30.6225 25.6665C30.3275 30.0913 30.1801 32.3038 28.7384 33.6525C27.2967 35.0013 25.0794 35.0013 20.6447 35.0013H19.3557C14.9211 35.0013 12.7037 35.0013 11.2621 33.6525C9.82038 32.3038 9.67289 30.0913 9.3779 25.6665L8.61133 14.168"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M15.833 18.332L16.6663 26.6654"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M24.1663 18.332L23.333 26.6654"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2 text-sm bg-gray-100 p-2 rounded-md text-blue-900">
                🕒 <span>Recent Search</span>
              </div>
            </div>
          </div>

          {/* Middle - Editable Recent */}
          <div className="bg-gray-100  p-4 rounded-xl w-full md:w-[300px] shadow-sm">
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white gap-2 text-sm bg-gray-100 p-2 rounded-md text-blue-900"
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M5.83301 32.082H29.1663"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M21.3344 4.26171L20.2531 5.34307L10.3116 15.2845C9.63828 15.9579 9.3016 16.2946 9.01206 16.6658C8.6705 17.1037 8.37767 17.5775 8.13874 18.0788C7.9362 18.5038 7.78563 18.9555 7.4845 19.8589L6.20845 23.6871L5.89653 24.6228C5.74834 25.0674 5.86405 25.5575 6.19541 25.8889C6.52678 26.2203 7.01692 26.336 7.46149 26.1878L8.39725 25.8759L12.2254 24.5998C13.1288 24.2987 13.5805 24.1481 14.0055 23.9456C14.5068 23.7066 14.9806 23.4138 15.4185 23.0723C15.7898 22.7827 16.1264 22.446 16.7998 21.7727L26.7412 11.8312L27.8226 10.7499C29.6143 8.95821 29.6143 6.05336 27.8226 4.26171C26.0309 2.47006 23.1261 2.47006 21.3344 4.26171Z"
                      stroke="#1C274C"
                      stroke-width="1.5"
                    />
                    <path
                      opacity="0.5"
                      d="M20.2536 5.34375C20.2536 5.34375 20.3888 7.64164 22.4163 9.66919C24.4439 11.6967 26.7418 11.8319 26.7418 11.8319M8.39778 25.8765L6.20898 23.6877"
                      stroke="#1C274C"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span>Recent Search</span>
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
                  onClick={() => router.push("/adult/music/diloke")}
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
                  <div className="absolute top-3 right-3 text-white text-xs px-2 py-0.5">
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
                  <div className="absolute bottom-3 left-3 text-white text-lg font-medium">
                    Song Title
                  </div>
                  <div className="absolute bottom-3 right-3 text-white text-xs">
                    18:00
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
                    onClick={() => router.push("/adult/music/hunermend")}
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
    </>
  );
};

export default App;
