"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

export type VideoStreamPlayerHandle = {
  startVideo: () => void;
};

const VideoStreamPlayer = forwardRef<VideoStreamPlayerHandle>((_, ref) => {
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

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
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
              <div className="flex justify-center items-center gap-4 mb-3">
                <button onClick={() => skipTime(-15)}>
                  <svg
                    width="75"
                    height="75"
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M3.90625 15.625C3.90625 14.3306 4.95558 13.2812 6.25 13.2812C7.54442 13.2812 8.59375 14.3306 8.59375 15.625V59.375C8.59375 60.6694 7.54442 61.7188 6.25 61.7188C4.95558 61.7188 3.90625 60.6694 3.90625 59.375V15.625Z"
                      fill="white"
                    />
                    <path
                      d="M22.938 45.7732C17.354 42.1673 17.354 32.8327 22.938 29.2268L56.6536 7.45461C62.0807 3.95007 68.75 8.51151 68.75 15.7278V59.2722C68.75 66.4885 62.0806 71.0499 56.6536 67.5454L22.938 45.7732Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button onClick={togglePlayPause}>
                  <svg
                    width="75"
                    height="75"
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.0234 4.74177C32.43 4.19465 34.9327 3.90625 37.4999 3.90625C56.0533 3.90625 71.0937 18.9467 71.0937 37.5C71.0937 56.0533 56.0533 71.0938 37.4999 71.0938C34.9327 71.0938 32.43 70.8054 30.0234 70.2582C28.7612 69.9713 27.9706 68.7154 28.2576 67.4532C28.5445 66.191 29.8004 65.4004 31.0626 65.6874C33.1305 66.1575 35.2847 66.4062 37.4999 66.4062C53.4644 66.4062 66.4062 53.4645 66.4062 37.5C66.4062 21.5355 53.4644 8.59375 37.4999 8.59375C35.2847 8.59375 33.1305 8.8425 31.0626 9.31263C29.8004 9.59959 28.5445 8.80899 28.2576 7.54679C27.9706 6.28458 28.7612 5.02873 30.0234 4.74177Z"
                      fill="white"
                    />
                    <g opacity="0.5">
                      <path
                        d="M22.8556 9.78665C23.5453 10.882 23.2164 12.3291 22.121 13.0188C18.4486 15.3312 15.3321 18.4476 13.0198 22.1201C12.3301 23.2154 10.883 23.5443 9.78763 22.8546C8.69226 22.1649 8.3634 20.7178 9.0531 19.6224C11.7391 15.3566 15.3576 11.7381 19.6234 9.05212C20.7188 8.36242 22.1659 8.69128 22.8556 9.78665Z"
                        fill="white"
                      />
                      <path
                        d="M9.78763 52.1438C10.883 51.4541 12.3301 51.783 13.0198 52.8783C15.3321 56.5508 18.4486 59.6672 22.121 61.9796C23.2164 62.6693 23.5453 64.1164 22.8556 65.2118C22.1659 66.3071 20.7188 66.636 19.6234 65.9463C15.3576 63.2603 11.7391 59.6418 9.0531 55.376C8.3634 54.2806 8.69226 52.8335 9.78763 52.1438Z"
                        fill="white"
                      />
                    </g>
                    <path
                      opacity="0.3"
                      d="M9.31263 31.0621C9.59959 29.7999 8.80899 28.544 7.54679 28.2571C6.28458 27.9701 5.02873 28.7607 4.74177 30.0229C4.19465 32.4295 3.90625 34.9322 3.90625 37.4994C3.90625 40.0667 4.19465 42.5694 4.74177 44.976C5.02873 46.2382 6.28458 47.0288 7.54679 46.7418C8.80899 46.4549 9.59959 45.199 9.31263 43.9368C8.8425 41.8689 8.59375 39.7146 8.59375 37.4994C8.59375 35.2842 8.8425 33.13 9.31263 31.0621Z"
                      fill="white"
                    />
                    <path
                      d="M48.1678 34.1907C50.6107 35.6331 50.6108 39.3669 48.1678 40.8093L33.4172 49.5182C31.0428 50.92 28.125 49.0954 28.125 46.2089L28.125 28.7911C28.125 25.9046 31.0428 24.08 33.4172 25.4818L48.1678 34.1907Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button onClick={() => skipTime(15)}>
                  <svg
                    width="75"
                    height="75"
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M71.0938 15.625C71.0938 14.3306 70.0444 13.2812 68.75 13.2812C67.4556 13.2812 66.4062 14.3306 66.4062 15.625V59.375C66.4062 60.6694 67.4556 61.7188 68.75 61.7188C70.0444 61.7188 71.0938 60.6694 71.0938 59.375V15.625Z"
                      fill="white"
                    />
                    <path
                      d="M52.062 45.7732C57.646 42.1673 57.646 32.8327 52.062 29.2268L18.3464 7.45461C12.9193 3.95007 6.25 8.51151 6.25 15.7278V59.2722C6.25 66.4885 12.9194 71.0499 18.3464 67.5454L52.062 45.7732Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>

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
                <span className="text-white/70">Past Stream</span>
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

VideoStreamPlayer.displayName = "VideoStreamPlayer";
export default VideoStreamPlayer;
