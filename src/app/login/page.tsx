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
    <section className="w-[100%] h-[100%] flex bg-[#F2F2F2] overflow-hidden relative">
      {/* movie list bento grid */}
      <div className="w-screen h-screen">
        <MovieList />
      </div>
      {/* add space */}
      <div
        className="w-[15vw] h-screen rounded-[15px] bg-[#F2F2F2] flex items-center justify-center right-[0px]"
        onClick={() => setIsLoginModalOpen(true)}
      >
        <RightSection />
      </div>
      {isLoginModalOpen && (
        <div className="w-full h-full bg-[#00000099] flex items-center justify-center fixed inset-0 top-[0px] left-[0px] right-[0px] bottom-[0px]">
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </div>
      )}
    </section>
  );
}
