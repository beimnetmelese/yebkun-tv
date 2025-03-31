"use client";

import CircularTimer from "@/app/components/CircularTimer";
import Image from "next/image";
import { FC } from "react";

const KidsPage: FC = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/kids/kidsbg.png')" }}
    >
      {/* Navbar */}
      <nav className="absolute top-[0px] left-[0px] w-full p-[4px] flex items-center justify-between bg-transparent z-10">
        {/* Logo */}
        <div className="flex items-center p-[10px] m-[10px] ">
          <Image
            src="/images/kids/littleLogo.png"
            alt="Logo"
            width={130}
            height={130}
            className="object-cover"
          />
        </div>

        {/* Navbar Icons */}
        <div className="flex space-x-8 gap-[100px]">
          <a
            href="#home"
            className="text-white text-2xl hover:text-gray-300 p-[4px]"
          >
            <Image
              src="/images/kids/home.png"
              alt="Home"
              width={150}
              height={100}
            />
          </a>
          <a
            href="#about"
            className="text-white text-2xl hover:text-gray-300 p-[4px]"
          >
            <Image
              src="/images/kids/stories.png"
              alt="stories"
              width={150}
              height={100}
            />
          </a>
          <a
            href="#contact"
            className="text-white text-2xl hover:text-gray-300 p-[4px]"
          >
            <Image
              src="/images/kids/videos.png"
              alt="videos"
              width={150}
              height={100}
            />
          </a>
          <a
            href="#friends"
            className="text-white text-2xl hover:text-gray-300 p-[4px]"
          >
            <Image
              src="/images/kids/movies.png"
              alt="movies"
              width={150}
              height={100}
            />
          </a>
        </div>

        {/* Circular Timer */}
        <div className="flex items-center pr-[8px]">
          <CircularTimer totalMinutes={60} currentMinutes={35} />
        </div>
      </nav>
    </div>
  );
};

export default KidsPage;
