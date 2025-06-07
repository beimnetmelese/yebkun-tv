"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

interface NavigationItemProps {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}

interface Props {
  active: string;
}

const NavigationItem = ({
  href,
  label,
  icon,
  active = false,
  onClick,
}: NavigationItemProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-[1px] px-[10px] py-[10px] transition-colors no-underline text-[#FFFFFF]/90"
      onClick={onClick}
    >
      <div
        className={`w-55 h-55 rounded-full flex items-center justify-center text-black p-[10px] ${
          active ? "ring-2 ring-[#1BC469]" : ""
        }`}
        style={{
          background: active ? "#1BC469" : "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <Image
          src={icon}
          alt={label}
          width={33}
          height={33}
          style={{
            filter: active ? "brightness(0) invert(1)" : "none",
          }}
          loading="eager"
          quality={90}
          unoptimized
        />
      </div>
      <span className="text-[22px] text-white font-bold-500">{label}</span>
    </Link>
  );
};

export default function Navigation({ active }: Props) {
  const pathname = usePathname();
  const clickSoundRef = useRef<HTMLAudioElement>(null);

  const handleNavClick = () => {
    // Play click sound
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current
        .play()
        .catch((err) => console.error("Error playing click sound:", err));
    }
  };

  return (
    <header className="fixed top-[0px] left-[0px] right-[0px] w-full h-[150px] z-50">
      <audio
        ref={clickSoundRef}
        src="/audio/click.mp3"
        preload="auto"
        className="hidden"
      />
      <div
        className="w-full h-full bg-[#000000]"
        style={{
          background:
            "linear-gradient(to bottom, #000000, rgba(59, 59, 59, 0))",
        }}
      >
        <div className="flex items-center justify-between w-full h-full px-4">
          <div className="flex items-center space-x-6">
            <NavigationItem
              href="/adult"
              label="Dashpak"
              icon="/images/navigation/destpek.svg"
              active={active === "dashpak" || pathname === "/adult"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/adult/music"
              label="music"
              icon="/images/navigation/muzik.svg"
              active={active === "music" || pathname === "/adult/music"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/adult/cinema?title=The Passion of The Christ&videoUrl=/adults/Movies section/The Passion of The Christ.mp4"
              label="Cinema"
              icon="/images/navigation/sinema.svg"
              active={active === "cinema" || pathname === "/cinema"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/adult/video"
              label="Videos"
              icon="/images/navigation/videos.svg"
              active={active === "videos" || pathname === "/videos"}
              onClick={handleNavClick}
            />

            <NavigationItem
              href="/adult/search"
              label="Stream"
              icon="/images/navigation/stream.svg"
              active={active === "stream" || pathname === "/stream"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/adult/search"
              label="Gerandin"
              icon="images/navigation/gerandin.svg"
              active={active === "gerandin" || pathname === "/gerandin"}
              onClick={handleNavClick}
            />
          </div>

          {/* Search Bar with Mic Icon */}
          <div className="flex items-center space-x-3 bg-white bg-opacity-95 rounded-full px-[10px] py-[10px] w-[30vw] gap-[20px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-[30px] bg-[#FFFFFF] rounded-[52px] font-[genos] font-normal text-[36px] focus:outline-none text-[#000000]/90 px-[25px] py-[10px] border-none"
            />
            <div
              className={`w-55 h-55 rounded-full flex items-center justify-center text-black p-[7px] `}
              style={{
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              <Image
                src="/images/navigation/mic.svg"
                alt="Mic"
                width={33}
                height={33}
                className="cursor-pointer"
                loading="eager"
                quality={90}
                unoptimized
              />
            </div>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-3">
            <NavigationItem
              href="/kulturtv"
              label="KulturTV"
              icon="/images/navigation/malbat.svg"
              active={active === "kulturtv" || pathname === "/kulturtv"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/zaroktv"
              label="ZarokTV"
              icon="/images/navigation/zarok_tv.svg"
              active={active === "zaroktv" || pathname === "/zaroktv"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/settings"
              label="Evin"
              icon="/images/navigation/eyar.svg"
              active={active === "settings" || pathname === "/settings"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/adult/archive"
              label="Archive"
              icon="/images/navigation/archive.svg"
              active={active === "archive" || pathname === "/archive"}
              onClick={handleNavClick}
            />
            <NavigationItem
              href="/user"
              label="User"
              icon="/images/navigation/user.png"
              active={active === "user" || pathname === "/user"}
              onClick={handleNavClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
