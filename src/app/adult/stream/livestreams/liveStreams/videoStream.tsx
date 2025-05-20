"use client";

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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 1);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      setControlsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setControlsVisible(false), 3000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("click", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(timeout);
    };
  }, [hasStarted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
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
      {hasStarted && (
        <>
          <div className="absolute bottom-20 right-4 z-30">
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

          {controlsVisible && (
            <div className="absolute bottom-0 w-full px-6 pb-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-20">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-12 text-left">
                  {formatTime(currentTime)}
                </span>
                <div className="flex-1 h-1 bg-white/30 rounded-full relative">
                  <div
                    className="h-1 bg-red-600 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right">{formatTime(duration)}</span>
              </div>

              <div className="mt-3 flex justify-between items-center text-sm">
                <span className="text-white/70">Live</span>
                <span className="font-semibold text-center w-full -ml-16">
                  Streaming Title
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

VideoStream.displayName = "VideoStreamPlayer";
export default VideoStream;
