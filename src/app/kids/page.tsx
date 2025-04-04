"use client";

import CircularTimer from "@/app/components/CircularTimer";
import Image from "next/image";
import { FC } from "react";
import { useState } from 'react';
import ParentCode from "./components/parent_code";

const KidsPage: FC = () => {
  const [isParentCodeOpen, setIsParentCodeOpen] = useState(true);
  const handleParentCodeClose = () => {
    setIsParentCodeOpen(false);
  }
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
      {/* Parent Code before kids section */}
      {isParentCodeOpen && (
        <div className="h-screen bg-[#00000099] top-[0px] left-[0px] inset-0 flex items-center justify-center">
          <ParentCode
            isOpen={isParentCodeOpen}
            onClose={handleParentCodeClose}
          />
        </div>
      )}

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
        <div className="flex items-center mr-[2.5vw]">
          <CircularTimer totalMinutes={60} currentMinutes={35} />
        </div>
      </nav>
    </div>
  );
};

export default KidsPage;
