"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

export type VideoStreamHandle = {
  startVideo: () => void;
};

const VideoStream = forwardRef<VideoStreamHandle>((_, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const router = useRouter();
  useImperativeHandle(ref, () => ({
    startVideo: handleStart,
  }));

  const handleStart = async () => {
    setHasStarted(true);
    const container = containerRef.current;
    if (container && container.requestFullscreen) {
      try {
        await container.requestFullscreen();
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    }
    videoRef.current?.play();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-black text-white"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/adults/cooking.mp4"
        controls={false}
        muted
      />
      <div className="absolute bottom-4 right-4 px-6 pb-10">
        <h2
          className="text-xl font-semibold mt-4 mb-2 p-2 rounded-md inline-block"
          style={{ backgroundColor: "#FFFFFF40" }}
        >
          My Video
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              onClick={() => router.push("/adult/stream/tvchannel")}
              key={i}
              className="relative rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <Image
                src="/images/adults/chef.png"
                width={400}
                height={250}
                alt="Video Thumbnail"
                className="w-full h-auto object-cover scale-x-[-1] transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/75 to-transparent" />
              <div className="absolute top-2 right-2 text-right">
                <p className="bg-opacity-60 px-2 py-1 text-sm font-semibold rounded">
                  Video Title
                </p>
                <p className="bg-opacity-60 px-2 py-1 text-xs text-gray-300 rounded mt-1">
                  12.12.2023
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

VideoStream.displayName = "VideoStreamPlayer";
export default VideoStream;
