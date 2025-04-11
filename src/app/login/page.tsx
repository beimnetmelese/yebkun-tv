"use client";
import { useEffect, useState } from "react";
import LoginModal from "./_components/LoginModal";
import MovieList from "./_components/MovieList";
import RightSection from "./_components/RightSection";

export default function Login() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoginModalOpen(true);
    }, 5000);
  }, []); // Add empty dependency array to run effect only once

  return (
    <section className="w-full h-screen flex bg-[#F2F2F2] overflow-hidden relative">
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
        <div className="fixed inset-0 w-full h-full bg-[#00000099] flex items-center justify-center z-50">
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </div>
      )}
    </section>
  );
}
