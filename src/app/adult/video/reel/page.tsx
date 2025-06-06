"use client";

import Image from "next/image";
import Navigation from "@/components/ui/navigation";
import { useEffect, useRef, useState } from "react";

export default function VideoFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Auto-play failed:", error);
        });
    }
  }, []);

  const videos = [
    "/adults/Reels/Clip 1.mp4",
    "/adults/Reels/Clip 2.mp4",
    "/adults/Reels/Clip 3.mp4",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Navigation active="videos" />
      <div className="bg-[#1c1b1d] pt-[150px] min-h-screen text-white p-4 space-y-6">
        {/* Top Thumbnails */}
        <div className="flex gap-4 p-6  overflow-hidden">
          {[
            "/images/adults/podcast.jpg",
            "/images/adults/chef.png",
            "/images/adults/live.jpg",
            "/images/adults/podcast.jpg",
            "/images/adults/podcast.jpg",
            "/images/adults/chef.png",
            "/images/adults/live.jpg",
            "/images/adults/podcast.jpg",
            "/images/adults/podcast.jpg",
            "/images/adults/chef.png",
            "/images/adults/live.jpg",
            "/images/adults/podcast.jpg",
          ].map((label, i) => (
            <div
              onClick={() => setCurrentIndex(i % 3)}
              key={i}
              className="relative w-full aspect-[2/3] tv-md:w-[150px] tv-md:h-[250px] rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
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
              <div className="absolute bottom-3 right-3 flex flex-col items-end text-white space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center gap-1 bg-white bg-opacity-60 text-xs px-2 py-0.5 rounded-md">
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_3491_4353)">
                        <path
                          d="M2.72021 2.7785C2.54921 2.7785 2.38321 2.691 2.28971 2.5335L1.99321 2.0335C1.85271 1.796 1.93071 1.4895 2.16871 1.3485C2.40571 1.208 2.71271 1.286 2.85371 1.524L3.15021 2.024C3.29071 2.2615 3.21271 2.568 2.97471 2.709C2.89471 2.7565 2.80721 2.7785 2.72021 2.7785ZM5.99971 5.5C5.44821 5.5 4.99971 5.9485 4.99971 6.5C4.99971 7.0515 5.44821 7.5 5.99971 7.5C6.55121 7.5 6.99971 7.0515 6.99971 6.5C6.99971 5.9485 6.55121 5.5 5.99971 5.5ZM10.5947 7.637C10.1717 8.191 8.58971 10 5.99971 10C3.40971 10 1.92221 8.3705 1.39721 7.6695C0.886212 6.9875 0.887212 6.0415 1.39971 5.369C1.82321 4.8135 3.40721 3 5.99971 3C8.55771 3 10.0667 4.633 10.5967 5.335C11.1107 6.016 11.1097 6.9625 10.5947 7.637ZM7.99971 6.5C7.99971 5.397 7.10271 4.5 5.99971 4.5C4.89671 4.5 3.99971 5.397 3.99971 6.5C3.99971 7.603 4.89671 8.5 5.99971 8.5C7.10271 8.5 7.99971 7.603 7.99971 6.5ZM6.49971 1.5V1C6.49971 0.724 6.27571 0.5 5.99971 0.5C5.72371 0.5 5.49971 0.724 5.49971 1V1.5C5.49971 1.776 5.72371 2 5.99971 2C6.27571 2 6.49971 1.776 6.49971 1.5ZM9.70971 2.533L10.0062 2.033C10.1467 1.7955 10.0687 1.489 9.83071 1.348C9.59371 1.2075 9.28671 1.2855 9.14571 1.5235L8.84921 2.0235C8.70871 2.261 8.78671 2.5675 9.02471 2.7085C9.25821 2.848 9.56821 2.773 9.70971 2.533ZM9.83071 11.6515C10.0682 11.5105 10.1467 11.204 10.0062 10.9665L9.70971 10.4665C9.56871 10.2285 9.26221 10.1505 9.02471 10.291C8.78721 10.4315 8.70871 10.7385 8.84921 10.976L9.14571 11.476C9.28721 11.7155 9.59721 11.7905 9.83071 11.6515ZM6.49971 11.9995V11.4995C6.49971 11.2235 6.27571 10.9995 5.99971 10.9995C5.72371 10.9995 5.49971 11.2235 5.49971 11.4995V11.9995C5.49971 12.2755 5.72371 12.4995 5.99971 12.4995C6.27571 12.4995 6.49971 12.2755 6.49971 11.9995ZM2.85371 11.476L3.15021 10.976C3.29071 10.7385 3.21271 10.432 2.97471 10.291C2.73671 10.15 2.43071 10.2285 2.28971 10.4665L1.99321 10.9665C1.85271 11.204 1.93071 11.5105 2.16871 11.6515C2.40221 11.791 2.71221 11.716 2.85371 11.476Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3491_4353">
                          <rect
                            width="12"
                            height="12"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    159k
                  </span>
                </div>
              </div>

              {/* TOP-LEFT WATCH BUTTON */}
              <div className="absolute top-3 right-3">
                <Image
                  src={"/images/navigation/user.png"}
                  alt={label}
                  width={33}
                  height={33}
                  loading="eager"
                  quality={90}
                  unoptimized
                />
              </div>
              <div className="absolute bottom-3 left-3">
                <Image
                  src={"/images/navigation/user.png"}
                  alt={label}
                  width={33}
                  height={33}
                  loading="eager"
                  quality={90}
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>

        {/* Center Reel Area */}
        <div className="relative w-full max-w-4xl flex items-center justify-center gap-6 mt-8  mx-auto">
          {/* Left Icon Strip */}
          <div className="flex flex-col justify-end items-center h-[480px]">
            <div className="flex flex-col gap-3">
              <Image
                src={"/images/navigation/user.png"}
                alt={"user"}
                width={33}
                height={33}
                loading="eager"
                quality={90}
                unoptimized
              />
              <div className="flex flex-col items-center justify-center">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M10.5645 22C6.79322 22 4.9076 22 3.73603 20.8284C2.56445 19.6569 2.56445 18.7712 2.56445 15"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M22.5645 15C22.5645 18.7712 22.5645 19.6569 21.3929 20.8284C20.2213 22 18.3357 22 14.5645 22"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M14.5645 2C18.3357 2 20.2213 2 21.3929 3.17157C22.5645 4.34315 22.5645 5.22876 22.5645 9"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M10.5645 2C6.79322 2 4.9076 2 3.73603 3.17157C2.56445 4.34315 2.56445 5.22876 2.56445 9"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6.45688 14.0598C5.86193 13.3697 5.56445 13.0246 5.56445 12C5.56445 10.9754 5.86193 10.6303 6.45688 9.94021C7.64483 8.56222 9.63713 7 12.5645 7C15.4918 7 17.4841 8.56222 18.672 9.94021C19.267 10.6303 19.5645 10.9754 19.5645 12C19.5645 13.0246 19.267 13.3697 18.672 14.0598C17.4841 15.4378 15.4918 17 12.5645 17C9.63713 17 7.64483 15.4378 6.45688 14.0598Z"
                    stroke="white"
                    stroke-width="1.5"
                  />
                  <circle
                    cx="12.5645"
                    cy="12"
                    r="2"
                    stroke="white"
                    stroke-width="1.5"
                  />
                </svg>
                <p className="tv-md:text-[12px]">122T</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M20.9245 12.878C20.5545 12.878 20.2445 12.598 20.2045 12.228C19.9645 10.028 18.7845 8.04802 16.9645 6.78802C16.6345 6.55802 16.5545 6.10802 16.7845 5.77802C17.0145 5.44802 17.4645 5.36802 17.7945 5.59802C19.9645 7.10802 21.3645 9.46802 21.6545 12.078C21.6945 12.478 21.4045 12.838 21.0045 12.878C20.9745 12.878 20.9545 12.878 20.9245 12.878Z"
                    fill="white"
                  />
                  <path
                    opacity="0.4"
                    d="M4.30572 12.9277C4.28572 12.9277 4.25572 12.9277 4.23572 12.9277C3.83572 12.8877 3.54572 12.5277 3.58572 12.1277C3.85572 9.51766 5.23572 7.15766 7.38572 5.63766C7.70572 5.40766 8.16572 5.48766 8.39572 5.80766C8.62572 6.13766 8.54572 6.58766 8.22572 6.81766C6.42572 8.09766 5.25572 10.0777 5.03572 12.2677C4.99572 12.6477 4.67572 12.9277 4.30572 12.9277Z"
                    fill="white"
                  />
                  <path
                    opacity="0.4"
                    d="M16.555 21.2488C15.325 21.8388 14.005 22.1388 12.625 22.1388C11.185 22.1388 9.81504 21.8188 8.53504 21.1688C8.17504 20.9988 8.03504 20.5588 8.21504 20.1988C8.38504 19.8388 8.82504 19.6988 9.18504 19.8688C9.81504 20.1888 10.485 20.4088 11.165 20.5388C12.085 20.7188 13.025 20.7288 13.945 20.5688C14.625 20.4488 15.295 20.2388 15.915 19.9388C16.285 19.7688 16.725 19.9088 16.885 20.2788C17.065 20.6388 16.925 21.0788 16.555 21.2488Z"
                    fill="white"
                  />
                  <path
                    d="M12.6139 2.1582C11.0639 2.1582 9.79395 3.4182 9.79395 4.9782C9.79395 6.5382 11.0539 7.7982 12.6139 7.7982C14.1739 7.7982 15.4339 6.5382 15.4339 4.9782C15.4339 3.4182 14.1739 2.1582 12.6139 2.1582Z"
                    fill="white"
                  />
                  <path
                    d="M5.6159 14.0195C4.0659 14.0195 2.7959 15.2795 2.7959 16.8395C2.7959 18.3995 4.0559 19.6595 5.6159 19.6595C7.1759 19.6595 8.4359 18.3995 8.4359 16.8395C8.4359 15.2795 7.1659 14.0195 5.6159 14.0195Z"
                    fill="white"
                  />
                  <path
                    d="M19.5153 14.0195C17.9653 14.0195 16.6953 15.2795 16.6953 16.8395C16.6953 18.3995 17.9553 19.6595 19.5153 19.6595C21.0753 19.6595 22.3353 18.3995 22.3353 16.8395C22.3353 15.2795 21.0753 14.0195 19.5153 14.0195Z"
                    fill="white"
                  />
                </svg>

                <p className="tv-md:text-[12px]">122T</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <svg
                  width="27"
                  height="25"
                  viewBox="0 0 27 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.95801 22.2969C3.95801 21.8827 4.32662 21.5469 4.78132 21.5469H22.3453C22.8 21.5469 23.1686 21.8827 23.1686 22.2969C23.1686 22.7111 22.8 23.0469 22.3453 23.0469H4.78132C4.32662 23.0469 3.95801 22.7111 3.95801 22.2969Z"
                    fill="white"
                  />
                  <path
                    opacity="0.5"
                    d="M21.336 7.6685C22.685 6.43967 22.685 4.44733 21.336 3.2185C19.9871 1.98967 17.8 1.98967 16.451 3.2185L15.6719 3.92829C15.6825 3.95764 15.6936 3.98739 15.7051 4.01754C15.9907 4.76741 16.5295 5.75044 17.5432 6.67385C18.5569 7.59727 19.636 8.08814 20.4592 8.3483C20.4921 8.35871 20.5246 8.36874 20.5567 8.37842L21.336 7.6685Z"
                    fill="white"
                  />
                  <path
                    d="M15.7052 3.89648L15.6717 3.92705C15.6824 3.9564 15.6934 3.98615 15.7049 4.0163C15.9905 4.76617 16.5294 5.7492 17.543 6.67261C18.5567 7.59603 19.6358 8.08689 20.459 8.34706C20.4916 8.35738 20.5239 8.36733 20.5557 8.37693L13.0363 15.2268C12.5293 15.6886 12.2758 15.9195 11.9963 16.1181C11.6666 16.3524 11.3099 16.5532 10.9324 16.7171C10.6124 16.856 10.2723 16.9593 9.59216 17.1658L6.00539 18.255C5.67067 18.3566 5.30164 18.2772 5.05215 18.05C4.80267 17.8227 4.71555 17.4865 4.82712 17.1816L6.02271 13.9142C6.24944 13.2946 6.3628 12.9848 6.5153 12.6933C6.69519 12.3495 6.91566 12.0245 7.17282 11.7242C7.39081 11.4696 7.6443 11.2386 8.15121 10.7769L15.7052 3.89648Z"
                    fill="white"
                  />
                </svg>

                <p className="tv-md:text-[12px]">122T</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M19.2916 9.56469C18.9016 9.56469 18.5916 9.87469 18.5916 10.2647V11.8447C18.5916 15.3847 15.7116 18.2647 12.1716 18.2647C8.63156 18.2647 5.75156 15.3847 5.75156 11.8447V10.2547C5.75156 9.86469 5.44156 9.55469 5.05156 9.55469C4.66156 9.55469 4.35156 9.86469 4.35156 10.2547V11.8347C4.35156 15.9047 7.48156 19.2547 11.4716 19.6147V21.7447C11.4716 22.1347 11.7816 22.4447 12.1716 22.4447C12.5616 22.4447 12.8716 22.1347 12.8716 21.7447V19.6147C16.8516 19.2647 19.9916 15.9047 19.9916 11.8347V10.2547C19.9816 9.87469 19.6716 9.56469 19.2916 9.56469Z"
                    fill="white"
                  />
                  <path
                    d="M12.172 2.44531C9.73195 2.44531 7.75195 4.42531 7.75195 6.86531V11.9853C7.75195 14.4253 9.73195 16.4053 12.172 16.4053C14.612 16.4053 16.592 14.4253 16.592 11.9853V6.86531C16.592 4.42531 14.612 2.44531 12.172 2.44531ZM13.482 9.39531C13.412 9.65531 13.182 9.82531 12.922 9.82531C12.872 9.82531 12.822 9.81531 12.772 9.80531C12.382 9.69531 11.972 9.69531 11.582 9.80531C11.262 9.89531 10.952 9.70531 10.872 9.39531C10.782 9.08531 10.972 8.76531 11.282 8.68531C11.872 8.52531 12.492 8.52531 13.082 8.68531C13.382 8.76531 13.562 9.08531 13.482 9.39531ZM14.012 7.45531C13.922 7.69531 13.702 7.83531 13.462 7.83531C13.392 7.83531 13.332 7.82531 13.262 7.80531C12.562 7.54531 11.782 7.54531 11.082 7.80531C10.782 7.91531 10.442 7.75531 10.332 7.45531C10.222 7.15531 10.382 6.81531 10.682 6.71531C11.642 6.36531 12.702 6.36531 13.662 6.71531C13.962 6.82531 14.122 7.15531 14.012 7.45531Z"
                    fill="white"
                  />
                </svg>

                <p className="tv-md:text-[12px]">122T</p>
              </div>
            </div>
          </div>

          {/* Left Arrow */}
          <button className="absolute left-2 z-10" onClick={handlePrev}>
            <svg
              width="74"
              height="74"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_98_4164)">
                <rect
                  x="12"
                  y="4"
                  width="50"
                  height="50"
                  rx="25"
                  fill="white"
                />
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M34.2096 21.1647C33.7947 20.7498 33.122 20.7498 32.707 21.1647L25.6237 28.248C25.2088 28.663 25.2088 29.3357 25.6237 29.7506L32.707 36.834C33.122 37.2489 33.7947 37.2489 34.2096 36.834C34.6246 36.4191 34.6246 35.7463 34.2096 35.3314L27.8776 28.9993L34.2096 22.6673C34.6246 22.2524 34.6246 21.5796 34.2096 21.1647Z"
                fill="#1C274C"
              />
              <g opacity="0.5">
                <path
                  d="M28.9401 27.9375H40.5417C41.8922 27.9375 43.8945 28.3339 45.5896 29.5544C47.3389 30.8139 48.6875 32.9037 48.6875 36.0833C48.6875 36.6701 48.2118 37.1458 47.625 37.1458C47.0382 37.1458 46.5625 36.6701 46.5625 36.0833C46.5625 33.5963 45.55 32.1444 44.3479 31.2789C43.0916 30.3744 41.5522 30.0625 40.5417 30.0625L28.9401 30.0625L27.8776 29L28.9401 27.9375Z"
                  fill="#1C274C"
                />
                <path
                  d="M25.3931 28.5933C25.3412 28.7186 25.3125 28.8559 25.3125 29C25.3125 28.8616 25.3394 28.7232 25.3931 28.5933Z"
                  fill="#1C274C"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_98_4164"
                  x="0"
                  y="0"
                  width="74"
                  height="74"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="8" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_98_4164"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_98_4164"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>

          {/* Video Reel */}
          <div
            className="relative w-[270px] h-[480px] tv-md:w-[325px] tv-md:h-[580px] bg-black rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={togglePlay}
          >
            <video
              key={videos[currentIndex]}
              ref={videoRef}
              className="w-full h-full object-cover"
              src={videos[currentIndex]}
              autoPlay
              loop
            />
          </div>

          <div className="flex items-center gap-2 bg-[#222] px-4 py-2 rounded-xl text-sm self-end mt-6 mr-6">
            <div className={"flex items-center"}>
              <div className="flex  p-2 items-center gap-3">
                <img
                  src={"/images/adults/chef.png"}
                  className="w-10 h-10  tv-md:w-[40px] tv-md:h-[40px] rounded-full"
                  alt="cover"
                />
                <div>
                  <p className="text-sm tv-md:text-[18px] font-medium">
                    One Direction
                  </p>
                  <p className="text-xs tv-md:text-[18px] text-gray-200">
                    Last First Kiss
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button className="absolute right-2 z-10" onClick={handleNext}>
            <svg
              width="74"
              height="74"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_98_4169)">
                <rect
                  x="12"
                  y="4"
                  width="50"
                  height="50"
                  rx="25"
                  fill="white"
                />
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M39.7904 21.1647C40.2053 20.7498 40.878 20.7498 41.293 21.1647L48.3763 28.248C48.7912 28.663 48.7912 29.3357 48.3763 29.7506L41.293 36.834C40.878 37.2489 40.2053 37.2489 39.7904 36.834C39.3754 36.4191 39.3754 35.7463 39.7904 35.3314L46.1224 28.9993L39.7904 22.6673C39.3754 22.2524 39.3754 21.5796 39.7904 21.1647Z"
                fill="#1C274C"
              />
              <g opacity="0.5">
                <path
                  d="M45.0599 27.9375H33.4583C32.1078 27.9375 30.1055 28.3339 28.4104 29.5544C26.6611 30.8139 25.3125 32.9037 25.3125 36.0833C25.3125 36.6701 25.7882 37.1458 26.375 37.1458C26.9618 37.1458 27.4375 36.6701 27.4375 36.0833C27.4375 33.5963 28.45 32.1444 29.6521 31.2789C30.9084 30.3744 32.4478 30.0625 33.4583 30.0625L45.0599 30.0625L46.1224 29L45.0599 27.9375Z"
                  fill="#1C274C"
                />
                <path
                  d="M48.6069 28.5933C48.6588 28.7186 48.6875 28.8559 48.6875 29C48.6875 28.8616 48.6606 28.7232 48.6069 28.5933Z"
                  fill="#1C274C"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_98_4169"
                  x="0"
                  y="0"
                  width="74"
                  height="74"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="8" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_98_4169"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_98_4169"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>
        </div>

        {/* Bottom Info - right side */}
      </div>
    </>
  );
}
