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
          <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm z-30">
            👁️ 159K
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
