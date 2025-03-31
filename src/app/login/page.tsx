"use client";
import LoginModal from "./_components/LoginModal";
import MovieList from "./_components/MovieList";
import RightSection from "./_components/RightSection";
import { useEffect, useState } from "react";

export default function Login() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoginModalOpen(true)
    },5000)
  })
  return (
    <section className="w-full h-[95vh] flex gap-[5px] bg-[#F2F2F2] py-[18px] top-[0px] left-[0px] right-[0px] mx-auto">
      {/* movie list bento grid */}
      <div className="w-full h-full">
        <MovieList />
      </div>
      {/* add space */}
      <div
        className="w-[15vw] h-full rounded-[15px] bg-[#F2F2F2] flex items-center justify-center right-[0px]"
        onClick={() => setIsLoginModalOpen(true)}
      >
        <RightSection />
      </div>
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </section>
  );
}
