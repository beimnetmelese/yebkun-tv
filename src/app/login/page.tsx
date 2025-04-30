"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LoginModal from "./_components/LoginModal";
import MovieList from "./_components/MovieList";
import RightSection from "./_components/RightSection";

function LoginContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [initialPopup, setInitialPopup] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const modal = searchParams.get("modal");
    const popup = searchParams.get("popup");

    if (modal === "open") {
      setIsLoginModalOpen(true);
    }
    if (popup === "thirPopup") {
      setInitialPopup("thirPopup");
    }

    // Only set timeout if modal wasn't triggered by query params
    if (modal !== "open") {
      const timeout = setTimeout(() => {
        setIsLoginModalOpen(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

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
            initialPopup={initialPopup}
          />
        </div>
      )}
    </section>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
