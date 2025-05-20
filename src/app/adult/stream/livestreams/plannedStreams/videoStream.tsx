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
  const [isPlaying, setIsPlaying] = useState(false);
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
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
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
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3520_3680)">
                <path
                  d="M7.93403 7.02063C7.43528 7.02063 6.95112 6.76542 6.67841 6.30604L5.81362 4.84771C5.40382 4.155 5.63132 3.26104 6.32549 2.84979C7.01674 2.44 7.91216 2.6675 8.32341 3.36167L9.1882 4.82C9.59799 5.51271 9.37049 6.40667 8.67632 6.81792C8.44299 6.95646 8.18778 7.02063 7.93403 7.02063ZM17.4992 14.9583C15.8907 14.9583 14.5826 16.2665 14.5826 17.875C14.5826 19.4835 15.8907 20.7917 17.4992 20.7917C19.1078 20.7917 20.4159 19.4835 20.4159 17.875C20.4159 16.2665 19.1078 14.9583 17.4992 14.9583ZM30.9013 21.1913C29.6676 22.8071 25.0534 28.0833 17.4992 28.0833C9.94507 28.0833 5.60653 23.3306 4.07528 21.286C2.58487 19.2969 2.58778 16.5377 4.08257 14.5763C5.31778 12.956 9.93778 7.66667 17.4992 7.66667C24.9601 7.66667 29.3613 12.4296 30.9072 14.4771C32.4063 16.4633 32.4034 19.224 30.9013 21.1913ZM23.3326 17.875C23.3326 14.6579 20.7163 12.0417 17.4992 12.0417C14.2822 12.0417 11.6659 14.6579 11.6659 17.875C11.6659 21.0921 14.2822 23.7083 17.4992 23.7083C20.7163 23.7083 23.3326 21.0921 23.3326 17.875ZM18.9576 3.29167V1.83333C18.9576 1.02833 18.3042 0.375 17.4992 0.375C16.6942 0.375 16.0409 1.02833 16.0409 1.83333V3.29167C16.0409 4.09667 16.6942 4.75 17.4992 4.75C18.3042 4.75 18.9576 4.09667 18.9576 3.29167ZM28.3201 6.30458L29.1849 4.84625C29.5947 4.15354 29.3672 3.25958 28.673 2.84833C27.9817 2.43854 27.0863 2.66604 26.6751 3.36021L25.8103 4.81854C25.4005 5.51125 25.628 6.40521 26.3222 6.81646C27.0032 7.22333 27.9074 7.00458 28.3201 6.30458ZM28.673 32.9002C29.3657 32.489 29.5947 31.595 29.1849 30.9023L28.3201 29.444C27.9088 28.7498 27.0149 28.5223 26.3222 28.9321C25.6294 29.3419 25.4005 30.2373 25.8103 30.93L26.6751 32.3883C27.0878 33.0869 27.9919 33.3056 28.673 32.9002ZM18.9576 33.9152V32.4569C18.9576 31.6519 18.3042 30.9985 17.4992 30.9985C16.6942 30.9985 16.0409 31.6519 16.0409 32.4569V33.9152C16.0409 34.7202 16.6942 35.3735 17.4992 35.3735C18.3042 35.3735 18.9576 34.7202 18.9576 33.9152ZM8.32341 32.3883L9.1882 30.93C9.59799 30.2373 9.37049 29.3433 8.67632 28.9321C7.98216 28.5208 7.08966 28.7498 6.67841 29.444L5.81362 30.9023C5.40382 31.595 5.63132 32.489 6.32549 32.9002C7.00653 33.3071 7.9107 33.0883 8.32341 32.3883Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3520_3680">
                  <rect width="35" height="35" fill="white" />
                </clipPath>
              </defs>
            </svg>{" "}
            159K
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
