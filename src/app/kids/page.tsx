"use client";

import CircularTimer from "@/app/components/CircularTimer";
import ResponsiveHelper from "@/app/components/ResponsiveHelper";
import Image from "next/image";
import { FC } from "react";


const KidsPage: FC = () => {

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden top-[0px] left-[0px] right-[0px] bottom-[0px]"
      style={{
        backgroundImage: "url('/images/kids/kidsbg.png')" ,
        
        marginTop: "0px",
        marginLeft: "0px",
        marginRight: "0px",
        marginBottom: "0px",
      }}
    >


      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full p-tv-4 flex items-center justify-between bg-transparent z-10">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/kids/littleLogo.png"
            alt="Logo"
            width={130}
            height={130}
            className="h-[clamp(60px,10vh,130px)] w-auto object-contain"
            priority
          />
        </div>

        {/* Navbar Icons - using responsive gap */}
        <div className="flex items-center gap-tv-6 tv-sm:gap-tv-8 tv-md:gap-tv-10">
          <a
            href="#home"
            className="tv-focus-animation flex flex-col items-center p-tv-2 hover:scale-110 transition-transform"
          >
            <Image
              src="/images/kids/home.png"
              alt="Home"
              width={150}
              height={100}
              className="h-[clamp(40px,8vh,100px)] w-auto object-contain"
            />
            <span className="text-tv-base text-white mt-tv-2">Home</span>
          </a>
          <a
            href="#stories"
            className="tv-focus-animation flex flex-col items-center p-tv-2 hover:scale-110 transition-transform"
          >
            <Image
              src="/images/kids/stories.png"
              alt="Stories"
              width={150}
              height={100}
              className="h-[clamp(40px,8vh,100px)] w-auto object-contain"
            />
            <span className="text-tv-base text-white mt-tv-2">Stories</span>
          </a>
          <a
            href="#videos"
            className="tv-focus-animation flex flex-col items-center p-tv-2 hover:scale-110 transition-transform"
          >
            <Image
              src="/images/kids/videos.png"
              alt="Videos"
              width={150}
              height={100}
              className="h-[clamp(40px,8vh,100px)] w-auto object-contain"
            />
            <span className="text-tv-base text-white mt-tv-2">Videos</span>
          </a>
          <a
            href="#movies"
            className="tv-focus-animation flex flex-col items-center p-tv-2 hover:scale-110 transition-transform"
          >
            <Image
              src="/images/kids/movies.png"
              alt="Movies"
              width={150}
              height={100}
              className="h-[clamp(40px,8vh,100px)] w-auto object-contain"
            />
            <span className="text-tv-base text-white mt-tv-2">Movies</span>
          </a>
        </div>

        {/* Circular Timer */}
        <div className="flex items-center mr-[2.5vw]">
          <CircularTimer totalMinutes={60} currentMinutes={35} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="mt-[15vh] max-w-[90vw] mx-auto p-tv-4">
        {/* Add your main content here */}
      </main>

      {/* Responsive helper during development */}
      <ResponsiveHelper />
    </div>
  );
};

export default KidsPage;
