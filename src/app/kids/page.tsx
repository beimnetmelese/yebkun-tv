"use client";

import CircularTimer from "@/app/components/CircularTimer";
import ResponsiveHelper from "@/app/components/ResponsiveHelper";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

// Generate consistent positions and animations
const useClientSideRendering = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

const KidsPage: FC = () => {

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 p-tv-4">
      {/* Animated Background Elements */}
      <AnimatedClouds />
      <AnimatedButterflies />
      <AnimatedSun />

      {/* Bottom grass */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <AnimatedGrass />
      </div>

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
      <main className="mt-[15vh] max-w-[90vw] mx-auto p-tv-4 relative z-10">
        {/* Add your main content here */}
      </main>

      {/* Responsive helper during development */}
      <ResponsiveHelper />
    </div>
  );
};

// Animated Clouds Component
const AnimatedClouds: FC = () => {
  const isClient = useClientSideRendering();
  const [cloudElements, setCloudElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!isClient) return;

    const largeCloudCount = 15;
    const smallCloudCount = 20;
    const newCloudElements: React.ReactNode[] = [];

    // Large clouds
    for (let i = 0; i < largeCloudCount; i++) {
      const cloudNum = (i % 10) + 1;
      const top = Math.random() * 25;
      const left = Math.random() * 95;
      const duration = 15 + Math.random() * 30;
      const delay = Math.random() * 10;

      newCloudElements.push(
        <div
          key={`cloud-${i}`}
          className="absolute"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animation: `float-horizontal ${duration}s linear infinite ${delay}s`,
            zIndex: Math.floor(Math.random() * 3),
          }}
        >
          <Image
            src={`/images/kids/animation/cloud${cloudNum}.svg`}
            alt="Cloud"
            width={100}
            height={50}
            className="w-auto h-[clamp(30px,10vh,80px)]"
          />
        </div>
      );
    }

    // Small clouds
    for (let i = 0; i < smallCloudCount; i++) {
      const cloudNum = (i % 6) + 1;
      const top = Math.random() * 30 + 5;
      const left = Math.random() * 95;
      const duration = 20 + Math.random() * 20;
      const delay = Math.random() * 15;

      newCloudElements.push(
        <div
          key={`small-cloud-${i}`}
          className="absolute"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animation: `float-horizontal ${duration}s linear infinite ${delay}s`,
            zIndex: Math.floor(Math.random() * 3),
          }}
        >
          <Image
            src={`/images/kids/animation/cloud_small${cloudNum}.svg`}
            alt="Small Cloud"
            width={60}
            height={30}
            className="w-auto h-[clamp(20px,5vh,40px)]"
          />
        </div>
      );
    }

    setCloudElements(newCloudElements);
  }, [isClient]);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
      {cloudElements}
    </div>
  );
};

// Animated Butterflies Component
const AnimatedButterflies: FC = () => {
  const isClient = useClientSideRendering();
  const [butterflyElements, setButterflyElements] = useState<React.ReactNode[]>(
    []
  );

  useEffect(() => {
    if (!isClient) return;

    const butterflyCount = 12;
    const newButterflyElements: React.ReactNode[] = [];

    for (let i = 0; i < butterflyCount; i++) {
      const butterflyNum = (i % 6) + 1;
      const top = 30 + Math.random() * 40;
      const left = Math.random() * 85;
      const duration = 30 + Math.random() * 20;
      const delay = Math.random() * 10;
      const scale = 0.5 + Math.random() * 0.5;

      newButterflyElements.push(
        <div
          key={`butterfly-${i}`}
          className="absolute"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animation: `butterfly-fly ${duration}s ease-in-out infinite ${delay}s`,
            transform: `scale(${scale})`,
            zIndex: 2,
          }}
        >
          <Image
            src={`/images/kids/animation/butterfly${butterflyNum}.svg`}
            alt="Butterfly"
            width={40}
            height={40}
            className="w-auto h-[clamp(20px,6vh,50px)] butterfly-wing"
          />
        </div>
      );
    }

    setButterflyElements(newButterflyElements);
  }, [isClient]);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-1 overflow-hidden pointer-events-none">
      {butterflyElements}
    </div>
  );
};

// Animated Grass Component
const AnimatedGrass: FC = () => {
  const isClient = useClientSideRendering();
  const [grassElements, setGrassElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!isClient) return;

    const longGrassCount = 20;
    const smallGrassCount = 100;
    const newGrassElements: React.ReactNode[] = [];

    // Long grass
    for (let i = 0; i < longGrassCount; i++) {
      const grassNum = (i % 5) + 1;
      const left = (i / longGrassCount) * 100 + (Math.random() * 5 - 2.5);
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 2;

      newGrassElements.push(
        <div
          key={`grass-long-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${left}%`,
            animation: `sway ${duration}s ease-in-out infinite ${delay}s`,
            zIndex: 3,
          }}
        >
          <Image
            src={`/images/kids/animation/grass_long${grassNum}.svg`}
            alt="Grass"
            width={120}
            height={80}
            className="w-auto h-[clamp(40px,15vh,100px)]"
          />
        </div>
      );
    }

    // Add more variety with regular grass types
    for (let i = 0; i < 10; i++) {
      const grassNum = (i % 12) + 1;
      const left = (i / 10) * 100 + (Math.random() * 5 - 2.5);
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 2;

      newGrassElements.push(
        <div
          key={`grass-variety-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${left}%`,
            animation: `sway ${duration}s ease-in-out infinite ${delay}s`,
            zIndex: 2,
          }}
        >
          <Image
            src={`/images/kids/animation/grass${grassNum}.svg`}
            alt="Grass Variety"
            width={100}
            height={70}
            className="w-auto h-[clamp(30px,12vh,80px)]"
          />
        </div>
      );
    }

    // Small grass elements spread throughout
    for (let i = 0; i < smallGrassCount; i++) {
      const grassNum = (i % 11) + 1;
      const left = Math.random() * 98;
      const duration = 1 + Math.random() * 2;
      const delay = Math.random() * 1;

      newGrassElements.push(
        <div
          key={`grass-small-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${left}%`,
            animation: `sway ${duration}s ease-in-out infinite ${delay}s`,
            zIndex: 1,
          }}
        >
          <Image
            src={`/images/kids/animation/grass_small${grassNum}.svg`}
            alt="Small Grass"
            width={60}
            height={40}
            className="w-auto h-[clamp(20px,8vh,60px)]"
          />
        </div>
      );
    }

    setGrassElements(newGrassElements);
  }, [isClient]);

  return (
    <div className="relative w-full h-[20vh] overflow-hidden">
      {/* Base grass layer */}
      <div className="absolute bottom-0 left-0 w-full">
        <Image
          src="/images/kids/animation/grass_base.svg"
          alt="Grass Base"
          width={1920}
          height={100}
          className="w-full h-auto"
        />
      </div>
      {grassElements}
    </div>
  );
};

// Animated Sun Component
const AnimatedSun: FC = () => {
  return (
    <div
      className="absolute z-0"
      style={{
        top: "5%",
        right: "5%",
        animation: "rotate 60s linear infinite",
      }}
    >
      <Image
        src="/images/kids/animation/sun.svg"
        alt="Sun"
        width={200}
        height={200}
        className="w-auto h-[clamp(100px,20vh,200px)]"
      />
    </div>
  );
};

export default KidsPage;
