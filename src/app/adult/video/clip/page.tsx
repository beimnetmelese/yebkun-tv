"use client";

import Image from "next/image";
import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

const episodes = Array(10).fill({
  title: "Sample Clip",
  views: "159K",
  img: "/images/sample.jpg",
});

export default function VideoPlayerSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const router = useRouter();

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Toggle play/pause
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

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    resetTimeout();

    window.addEventListener("mousemove", resetTimeout);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimeout);
    };
  }, []);

  return (
    <>
      <Navigation active="videos" />
      <div className="bg-[#1c1b1d] pt-[150px] min-h-screen text-white p-4 space-y-6">
        {/* Video Player */}
        <div className="rounded-xl overflow-hidden bg-black shadow-lg max-w-4xl mx-auto relative group">
          <video
            ref={videoRef}
            className="w-full cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            poster="/images/adults/chef.jpg"
          >
            <source src="/images/adults/cooking.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Controls Overlay */}
          {showControls && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}

          {/* Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100`}
          >
            {/* Progress Bar */}
            <div className="mb-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ff0000 ${
                    (currentTime / (duration || 1)) * 100
                  }%, #4b5563 ${(currentTime / (duration || 1)) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={togglePlay} className="text-white">
                  {isPlaying ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <button onClick={() => skip(-10)} className="text-white">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                  </svg>
                </button>
                <button onClick={() => skip(10)} className="text-white">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                  </svg>
                </button>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              <button onClick={toggleFullscreen} className="text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Thumbnail List */}
        <section>
          <h2
            className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
            style={{ backgroundColor: "#FFFFFF40" }}
          >
            Music Clip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              "/images/adults/podcast.jpg",
              "/images/adults/chef.png",
              "/images/adults/live.jpg",
              "/images/adults/podcast.jpg",
            ].map((label, i) => (
              <div
                onClick={() => router.push("/adult/video/clip")}
                key={i}
                className=" w-full relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
              >
                {/* BACKGROUND IMAGE */}
                <img
                  src={label}
                  alt="Chef"
                  className={
                    "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  }
                />

                {/* DARK GRADIENT OVERLAY */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* TOP-RIGHT CHANNEL INFO */}
                <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                  <svg
                    width="58"
                    height="21"
                    viewBox="0 0 58 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.0498047"
                      y="0.798828"
                      width="57"
                      height="19.5438"
                      rx="4"
                      fill="black"
                      fillOpacity="0.3"
                    />
                    <g clipPath="url(#clip0_3958_26222)">
                      <path
                        d="M5.7583 6.8742C5.5873 6.8742 5.4213 6.7867 5.3278 6.6292L5.0313 6.1292C4.8908 5.8917 4.9688 5.5852 5.2068 5.4442C5.4438 5.3037 5.7508 5.3817 5.8918 5.6197L6.1883 6.1197C6.3288 6.3572 6.2508 6.6637 6.0128 6.8047C5.9328 6.8522 5.8453 6.8742 5.7583 6.8742ZM9.0378 9.5957C8.4863 9.5957 8.0378 10.0442 8.0378 10.5957C8.0378 11.1472 8.4863 11.5957 9.0378 11.5957C9.5893 11.5957 10.0378 11.1472 10.0378 10.5957C10.0378 10.0442 9.5893 9.5957 9.0378 9.5957ZM13.6328 11.7327C13.2098 12.2867 11.6278 14.0957 9.0378 14.0957C6.4478 14.0957 4.9603 12.4662 4.4353 11.7652C3.9243 11.0832 3.9253 10.1372 4.4378 9.4647C4.8613 8.9092 6.4453 7.0957 9.0378 7.0957C11.5958 7.0957 13.1048 8.7287 13.6348 9.4307C14.1488 10.1117 14.1478 11.0582 13.6328 11.7327ZM11.0378 10.5957C11.0378 9.4927 10.1408 8.5957 9.0378 8.5957C7.9348 8.5957 7.0378 9.4927 7.0378 10.5957C7.0378 11.6987 7.9348 12.5957 9.0378 12.5957C10.1408 12.5957 11.0378 11.6987 11.0378 10.5957ZM9.5378 5.5957V5.0957C9.5378 4.8197 9.3138 4.5957 9.0378 4.5957C8.7618 4.5957 8.5378 4.8197 8.5378 5.0957V5.5957C8.5378 5.8717 8.7618 6.0957 9.0378 6.0957C9.3138 6.0957 9.5378 5.8717 9.5378 5.5957ZM12.7478 6.6287L13.0443 6.1287C13.1848 5.8912 13.1068 5.5847 12.8688 5.4437C12.6318 5.3032 12.3248 5.3812 12.1838 5.6192L11.8873 6.1192C11.7468 6.3567 11.8248 6.6632 12.0628 6.8042C12.2963 6.9437 12.6063 6.8687 12.7478 6.6287ZM12.8688 15.7472C13.1063 15.6062 13.1848 15.2997 13.0443 15.0622L12.7478 14.5622C12.6068 14.3242 12.3003 14.2462 12.0628 14.3867C11.8253 14.5272 11.7468 14.8342 11.8873 15.0717L12.1838 15.5717C12.3253 15.8112 12.6353 15.8862 12.8688 15.7472ZM9.5378 16.0952V15.5952C9.5378 15.3192 9.3138 15.0952 9.0378 15.0952C8.7618 15.0952 8.5378 15.3192 8.5378 15.5952V16.0952C8.5378 16.3712 8.7618 16.5952 9.0378 16.5952C9.3138 16.5952 9.5378 16.3712 9.5378 16.0952ZM5.8918 15.5717L6.1883 15.0717C6.3288 14.8342 6.2508 14.5277 6.0128 14.3867C5.7748 14.2457 5.4688 14.3242 5.3278 14.5622L5.0313 15.0622C4.8908 15.2997 4.9688 15.6062 5.2068 15.7472C5.4403 15.8867 5.7503 15.8117 5.8918 15.5717Z"
                        fill="white"
                      />
                    </g>
                    <path
                      d="M22.6994 14.5957V9.0437C22.6994 8.7237 22.646 8.50504 22.5394 8.3877C22.4327 8.27037 22.2674 8.2117 22.0434 8.2117C21.862 8.2117 21.67 8.23304 21.4674 8.2757C21.2647 8.3077 21.046 8.3557 20.8114 8.4197V7.4437C21.1954 7.39037 21.5794 7.34237 21.9634 7.2997C22.358 7.25704 22.726 7.2357 23.0674 7.2357C23.526 7.2357 23.8834 7.2837 24.1394 7.3797C24.406 7.46504 24.5927 7.61437 24.6994 7.8277C24.8167 8.04104 24.8754 8.3237 24.8754 8.6757L24.8594 14.5957H22.6994ZM33.7399 12.2437C33.7399 12.745 33.6812 13.1557 33.5639 13.4757C33.4572 13.785 33.2652 14.0304 32.9879 14.2117C32.7212 14.3824 32.3585 14.505 31.8999 14.5797C31.4412 14.6437 30.8652 14.6757 30.1719 14.6757C29.3612 14.6757 28.6625 14.649 28.0759 14.5957C27.4999 14.553 27.0945 14.4944 26.8599 14.4197C26.6892 14.3664 26.5612 14.313 26.4759 14.2597C26.3905 14.1957 26.3372 14.105 26.3159 13.9877C26.2945 13.8597 26.2892 13.6784 26.2999 13.4437V13.0597C26.8225 13.1984 27.3879 13.305 27.9959 13.3797C28.6145 13.4544 29.2332 13.4917 29.8519 13.4917C30.2892 13.4917 30.6625 13.4597 30.9719 13.3957C31.2919 13.321 31.5372 13.1877 31.7079 12.9957C31.8785 12.8037 31.9639 12.5317 31.9639 12.1797C31.9639 11.881 31.9265 11.6517 31.8519 11.4917C31.7772 11.3317 31.6385 11.2197 31.4359 11.1557C31.2439 11.081 30.9665 11.0437 30.6039 11.0437C30.2732 11.0117 29.9105 10.9957 29.5159 10.9957C29.1212 10.9957 28.7319 11.0064 28.3479 11.0277C27.9745 11.049 27.6279 11.0757 27.3079 11.1077C26.9985 11.129 26.7479 11.1504 26.5559 11.1717V7.2357H33.5799V8.3717H28.2679V9.9397C28.5025 9.92904 28.7799 9.9237 29.0999 9.9237C29.4199 9.9237 29.7399 9.9237 30.0599 9.9237C30.3799 9.9237 30.6785 9.92904 30.9559 9.9397C31.2439 9.9397 31.4785 9.95037 31.6599 9.9717C32.2359 10.0144 32.6732 10.121 32.9719 10.2917C33.2705 10.4624 33.4732 10.7077 33.5799 11.0277C33.6865 11.3477 33.7399 11.753 33.7399 12.2437ZM35.0715 13.3637C35.3808 13.4064 35.7968 13.449 36.3195 13.4917C36.8528 13.5237 37.4235 13.5397 38.0315 13.5397C38.6715 13.5397 39.1515 13.5077 39.4715 13.4437C39.8022 13.3797 40.0262 13.2624 40.1435 13.0917C40.2715 12.921 40.3515 12.6864 40.3835 12.3877C40.3942 12.3024 40.3995 12.2064 40.3995 12.0997C40.4102 11.993 40.4155 11.8917 40.4155 11.7957C40.4155 11.6997 40.4155 11.6304 40.4155 11.5877C40.2982 11.5984 40.1648 11.6197 40.0155 11.6517C39.8768 11.673 39.7222 11.6944 39.5515 11.7157C39.2635 11.769 38.9435 11.817 38.5915 11.8597C38.2502 11.9024 37.8395 11.9237 37.3595 11.9237C36.4848 11.9237 35.8288 11.769 35.3915 11.4597C34.9648 11.1397 34.7515 10.5637 34.7515 9.7317C34.7515 9.0277 34.8635 8.49437 35.0875 8.1317C35.3115 7.76904 35.6955 7.51837 36.2395 7.3797C36.7835 7.24104 37.5302 7.1717 38.4795 7.1717C39.3115 7.1717 39.9675 7.21437 40.4475 7.2997C40.9275 7.38504 41.2848 7.55037 41.5195 7.7957C41.7542 8.04104 41.9035 8.4037 41.9675 8.8837C42.0422 9.3637 42.0795 9.99304 42.0795 10.7717C42.0795 11.4757 42.0475 12.0624 41.9835 12.5317C41.9302 13.001 41.8288 13.3744 41.6795 13.6517C41.5302 13.9184 41.3275 14.121 41.0715 14.2597C40.8155 14.3877 40.4848 14.4784 40.0795 14.5317C39.7168 14.5744 39.3488 14.601 38.9755 14.6117C38.6022 14.633 38.2395 14.6437 37.8875 14.6437C37.5035 14.6437 37.1408 14.633 36.7995 14.6117C36.4582 14.601 36.1542 14.5904 35.8875 14.5797C35.5995 14.537 35.3808 14.457 35.2315 14.3397C35.0822 14.2117 35.0182 14.0197 35.0395 13.7637L35.0715 13.3637ZM40.3835 10.6757C40.3835 10.4304 40.3835 10.201 40.3835 9.9877C40.3835 9.77437 40.3782 9.5717 40.3675 9.3797C40.3568 9.08104 40.2875 8.8517 40.1595 8.6917C40.0315 8.5317 39.8288 8.4197 39.5515 8.3557C39.2742 8.2917 38.9008 8.2597 38.4315 8.2597C37.9515 8.2597 37.5622 8.29704 37.2635 8.3717C36.9648 8.44637 36.7462 8.5797 36.6075 8.7717C36.4795 8.95304 36.4155 9.2197 36.4155 9.5717C36.4155 9.8917 36.4635 10.1424 36.5595 10.3237C36.6555 10.505 36.8155 10.633 37.0395 10.7077C37.2635 10.7717 37.5728 10.8037 37.9675 10.8037C38.3195 10.8037 38.6662 10.7984 39.0075 10.7877C39.3488 10.7664 39.6422 10.745 39.8875 10.7237C40.1435 10.7024 40.3088 10.6864 40.3835 10.6757ZM50.4552 14.7557C50.1992 14.7557 49.9592 14.7237 49.7352 14.6597C49.5112 14.6064 49.3032 14.5104 49.1112 14.3717C49.0472 14.3077 48.9459 14.2117 48.8072 14.0837C48.6792 13.9557 48.5352 13.8117 48.3752 13.6517C48.2152 13.481 48.0499 13.3104 47.8792 13.1397C47.7192 12.969 47.5699 12.8144 47.4312 12.6757C47.2926 12.5264 47.1806 12.4037 47.0952 12.3077C46.9672 12.1797 46.8552 12.0837 46.7592 12.0197C46.6739 11.945 46.5512 11.8757 46.3912 11.8117L45.8152 11.7157V14.5957H43.6872V7.9077C43.6872 7.75837 43.6979 7.6357 43.7192 7.5397C43.7512 7.4437 43.8099 7.36904 43.8952 7.3157C43.9912 7.26237 44.1512 7.2357 44.3752 7.2357C44.6206 7.2357 44.8606 7.2357 45.0952 7.2357C45.3406 7.2357 45.5806 7.2357 45.8152 7.2357C45.8152 7.3957 45.8152 7.59837 45.8152 7.8437C45.8152 8.08904 45.8152 8.35037 45.8152 8.6277C45.8152 8.90504 45.8152 9.16637 45.8152 9.4117C45.8152 9.65704 45.8152 9.85437 45.8152 10.0037L46.4072 9.9237C46.5139 9.8917 46.6046 9.84904 46.6792 9.7957C46.7539 9.74237 46.8392 9.66237 46.9352 9.5557C47.1059 9.37437 47.3086 9.1717 47.5432 8.9477C47.7779 8.71304 48.0232 8.47304 48.2792 8.2277C48.5352 7.98237 48.7646 7.7637 48.9672 7.5717C49.1699 7.4117 49.3886 7.30504 49.6232 7.2517C49.8579 7.19837 50.1406 7.1717 50.4712 7.1717C50.7166 7.1717 50.9246 7.18237 51.0952 7.2037C51.2659 7.22504 51.4419 7.25704 51.6232 7.2997C51.6019 7.31037 51.5326 7.37437 51.4152 7.4917C51.2979 7.60904 51.1646 7.73704 51.0152 7.8757C50.8766 8.01437 50.7646 8.12637 50.6792 8.2117C50.3272 8.48904 49.9592 8.78237 49.5752 9.0917C49.1912 9.39037 48.8179 9.69437 48.4552 10.0037C48.0926 10.3024 47.7672 10.5904 47.4792 10.8677L47.5112 10.3077C47.7459 10.489 48.0232 10.7237 48.3432 11.0117C48.6632 11.2997 49.0152 11.625 49.3992 11.9877C49.7939 12.3397 50.1992 12.7024 50.6152 13.0757C51.0312 13.449 51.4419 13.8117 51.8472 14.1637C51.8046 14.217 51.7192 14.2917 51.5912 14.3877C51.4739 14.4837 51.3192 14.569 51.1272 14.6437C50.9352 14.7184 50.7112 14.7557 50.4552 14.7557Z"
                      fill="white"
                    />
                    <defs>
                      <clipPath id="clip0_3958_26222">
                        <rect
                          width="12"
                          height="12"
                          fill="white"
                          transform="translate(3.03711 4.5957)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                {/* BOTTOM-LEFT WATCH BUTTON */}
                <div className="absolute top-3 left-3">
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
                  <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                    Clip Name
                  </span>
                </div>

                {/* BOTTOM-RIGHT LOGO */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                    Clip Name
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
