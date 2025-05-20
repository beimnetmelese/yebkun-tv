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
                      d="M32.2654 24.4501C33.0774 24.8404 33.5938 25.6616 33.5938 26.5625V48.4375C33.5938 49.7319 32.5445 50.7813 31.2501 50.7813C29.9557 50.7813 28.9063 49.7319 28.9063 48.4375V31.439L24.9017 34.6427C23.8909 35.4513 22.416 35.2874 21.6074 34.2767C20.7988 33.2659 20.9627 31.791 21.9735 30.9824L29.786 24.7324C30.4895 24.1695 31.4533 24.0598 32.2654 24.4501Z"
                      fill="white"
                    />
                    <path
                      d="M39.608 26.8898C40.1397 25.2947 41.6324 24.2188 43.3138 24.2188H51.5626C52.857 24.2188 53.9063 25.2681 53.9063 26.5625C53.9063 27.8569 52.857 28.9063 51.5626 28.9063H43.8769L42.3144 33.5938H45.3126C50.0588 33.5938 53.9063 37.4413 53.9063 42.1875C53.9063 46.9337 50.0588 50.7813 45.3126 50.7813H39.0626C37.7682 50.7813 36.7188 49.7319 36.7188 48.4375C36.7188 47.1431 37.7682 46.0938 39.0626 46.0938H45.3126C47.47 46.0938 49.2188 44.3449 49.2188 42.1875C49.2188 40.0302 47.47 38.2813 45.3126 38.2813H41.2304C38.5642 38.2813 36.6815 35.6692 37.5246 33.1398L39.608 26.8898Z"
                      fill="white"
                    />
                    <path
                      opacity="0.5"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M35.3876 5.23471C35.7779 4.42269 36.599 3.90625 37.5 3.90625C39.7979 3.90625 42.0442 4.13731 44.2162 4.57821C59.551 7.691 71.0938 21.2449 71.0938 37.5C71.0938 56.0533 56.0533 71.0938 37.5 71.0938C18.9467 71.0938 3.90625 56.0533 3.90625 37.5C3.90625 23.7208 12.2019 11.8843 24.0616 6.70257C25.2478 6.18432 26.6295 6.72576 27.1477 7.9119C27.666 9.09805 27.1245 10.4797 25.9384 10.998C15.7243 15.4607 8.59375 25.6502 8.59375 37.5C8.59375 53.4645 21.5355 66.4062 37.5 66.4062C53.4645 66.4062 66.4062 53.4645 66.4062 37.5C66.4062 24.5298 57.8619 13.5507 46.0938 9.892V14.0625C46.0938 15.0579 45.465 15.9447 44.5258 16.2741C43.5865 16.6036 42.5416 16.3039 41.9198 15.5266L35.6698 7.71413C35.107 7.01061 34.9973 6.04674 35.3876 5.23471Z"
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
                      d="M30.0239 4.74177C32.4304 4.19465 34.9332 3.90625 37.5004 3.90625C56.0537 3.90625 71.0942 18.9467 71.0942 37.5C71.0942 56.0533 56.0537 71.0938 37.5004 71.0938C34.9332 71.0938 32.4304 70.8054 30.0239 70.2582C28.7617 69.9713 27.9711 68.7154 28.258 67.4532C28.545 66.191 29.8009 65.4004 31.0631 65.6874C33.131 66.1575 35.2852 66.4062 37.5004 66.4062C53.4649 66.4062 66.4067 53.4645 66.4067 37.5C66.4067 21.5355 53.4649 8.59375 37.5004 8.59375C35.2852 8.59375 33.131 8.8425 31.0631 9.31263C29.8009 9.59959 28.545 8.80899 28.258 7.54679C27.9711 6.28458 28.7617 5.02873 30.0239 4.74177Z"
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
                      d="M9.31263 31.0631C9.59959 29.8009 8.80899 28.545 7.54679 28.258C6.28458 27.9711 5.02873 28.7617 4.74177 30.0239C4.19465 32.4304 3.90625 34.9332 3.90625 37.5004C3.90625 40.0677 4.19465 42.5704 4.74177 44.9769C5.02873 46.2392 6.28458 47.0298 7.54679 46.7428C8.80899 46.4558 9.59959 45.2 9.31263 43.9378C8.8425 41.8699 8.59375 39.7156 8.59375 37.5004C8.59375 35.2852 8.8425 33.131 9.31263 31.0631Z"
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
                      d="M32.2654 24.4501C33.0774 24.8404 33.5938 25.6616 33.5938 26.5625V48.4375C33.5938 49.7319 32.5445 50.7813 31.2501 50.7813C29.9557 50.7813 28.9063 49.7319 28.9063 48.4375V31.439L24.9017 34.6427C23.8909 35.4513 22.416 35.2874 21.6074 34.2767C20.7988 33.2659 20.9627 31.791 21.9735 30.9824L29.786 24.7324C30.4895 24.1695 31.4533 24.0598 32.2654 24.4501Z"
                      fill="white"
                    />
                    <path
                      d="M39.608 26.8898C40.1397 25.2947 41.6324 24.2188 43.3138 24.2188H51.5626C52.857 24.2188 53.9063 25.2681 53.9063 26.5625C53.9063 27.8569 52.857 28.9063 51.5626 28.9063H43.8769L42.3144 33.5938H45.3126C50.0588 33.5938 53.9063 37.4413 53.9063 42.1875C53.9063 46.9337 50.0588 50.7813 45.3126 50.7813H39.0626C37.7682 50.7813 36.7188 49.7319 36.7188 48.4375C36.7188 47.1431 37.7682 46.0938 39.0626 46.0938H45.3126C47.47 46.0938 49.2188 44.3449 49.2188 42.1875C49.2188 40.0302 47.47 38.2813 45.3126 38.2813H41.2304C38.5642 38.2813 36.6815 35.6692 37.5247 33.1398L39.608 26.8898Z"
                      fill="white"
                    />
                    <path
                      opacity="0.5"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M39.6124 5.23471C39.2221 4.42269 38.4009 3.90625 37.5 3.90625C35.2021 3.90625 32.9558 4.13731 30.7837 4.57821C15.449 7.691 3.90625 21.2449 3.90625 37.5C3.90625 56.0533 18.9467 71.0937 37.5 71.0937C56.0533 71.0937 71.0937 56.0533 71.0937 37.5C71.0937 23.7208 62.7981 11.8843 50.9384 6.70257C49.7522 6.18432 48.3705 6.72576 47.8523 7.9119C47.334 9.09804 47.8755 10.4797 49.0616 10.998C59.2757 15.4607 66.4062 25.6502 66.4062 37.5C66.4062 53.4645 53.4645 66.4062 37.5 66.4062C21.5355 66.4062 8.59375 53.4645 8.59375 37.5C8.59375 24.5298 17.1381 13.5507 28.9062 9.892V14.0625C28.9062 15.0579 29.5349 15.9447 30.4742 16.2741C31.4135 16.6036 32.4584 16.3039 33.0802 15.5266L39.3302 7.71413C39.893 7.01061 40.0027 6.04674 39.6124 5.23471Z"
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
            </div>
          )}
        </>
      )}
    </div>
  );
});

VideoStreamPlayer.displayName = "VideoStreamPlayer";
export default VideoStreamPlayer;
