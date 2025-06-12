"use client";

import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import SearchList, { SearchItem } from "../searchList";

const App = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [keyboardMode, setKeyboardMode] = useState<
    "uppercase" | "lowercase" | "numbers" | "symbols"
  >("uppercase");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showDelete, setShowDelete] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Filter the search list based on search value
  const filteredItems = searchValue
    ? SearchList.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          (item.subtitle &&
            item.subtitle.toLowerCase().includes(searchValue.toLowerCase()))
      )
    : [];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "⌫") {
      setSearchValue((prev) => prev.slice(0, -1));
    } else if (key === "␣") {
      setSearchValue((prev) => prev + " ");
    } else if (key === "⇧") {
      setKeyboardMode((prev) =>
        prev === "uppercase" ? "lowercase" : "uppercase"
      );
    } else if (key === "123") {
      setKeyboardMode("numbers");
    } else if (key === "#+=") {
      setKeyboardMode("symbols");
    } else if (key === "ABC") {
      setKeyboardMode("uppercase");
    } else {
      setSearchValue((prev) => prev + key);
    }
  };
  const handleSearch2 = (value: string) => {
    setRecentSearches((prev) => {
      const trimmed = value.trim();
      if (!trimmed || prev.includes(trimmed)) return prev;
      return [trimmed, ...prev];
    });
  };

  const handleSearch = (searchTerm: string) => {
    setSearchValue(searchTerm);
    // Add to recent searches if not already there
    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches((prev) => [searchTerm, ...prev].slice(0, 10)); // Keep only last 10 searches
    }
  };

  const handleDeleteSearch = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
    setShowDelete(null);
  };

  // Keyboard layouts
  const keyboardLayout = {
    uppercase: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["Q", "W", "E", "Ê", "R", "T", "Y", "U", "Û", "I", "Î", "O", "P"],
      ["A", "S", "Ş", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "Ç", "V", "B", "N", "M", , "!", "?", ".", ",", ":"],
    ],
    lowercase: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["q", "w", "e", "ê", "r", "t", "y", "u", "û", "i", "î", "o", "p"],
      ["a", "s", "ş", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "ç", "v", "b", "n", "m", "!", "?", ".", ",", ":"],
    ],
  };

  return (
    <>
      <Navigation
        handleSearch={handleSearch2}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        active="gerandin"
      />
      <div className="min-h-screen w-full h-full pt-[150px]">
        {/* Main Grid Layout (always shown) */}
        <div className="grid grid-cols-3 p-8 gap-4 w-full">
          {/* Column 1 - Search History */}
          <div className="flex flex-col bg-gray-100 p-4 rounded-md w-full h-full">
            <h2 className="text-xl font-semibold mb-2">Recent Search</h2>
            <div className="flex flex-col space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="flex items-center justify-between bg-white p-2 rounded-md cursor-pointer hover:bg-gray-100"
                  onMouseEnter={() => setShowDelete(index)}
                  onMouseLeave={() => setShowDelete(null)}
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      width="36"
                      height="35"
                      viewBox="0 0 36 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.77034 17.5013C3.77034 25.5555 10.2995 32.0846 18.3537 32.0846C26.4078 32.0846 32.937 25.5555 32.937 17.5013C32.937 9.44715 26.4078 2.91797 18.3537 2.91797"
                        stroke="#1C274C"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        opacity="0.5"
                        d="M18.3535 13.125V18.9583H24.1868"
                        stroke="#1C274C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle
                        opacity="0.5"
                        cx="18.3534"
                        cy="17.5013"
                        r="14.5833"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-dasharray="0.5 3.5"
                      />
                    </svg>
                    <span className="text-xl">{search}</span>
                  </div>
                  {showDelete === index && (
                    <button
                      onClick={(e) => handleDeleteSearch(index, e)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {recentSearches.length === 0 && (
                <div className="flex items-center rounded-md bg-white p-2 space-x-2">
                  <svg
                    width="36"
                    height="35"
                    viewBox="0 0 36 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.77034 17.5013C3.77034 25.5555 10.2995 32.0846 18.3537 32.0846C26.4078 32.0846 32.937 25.5555 32.937 17.5013C32.937 9.44715 26.4078 2.91797 18.3537 2.91797"
                      stroke="#1C274C"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      opacity="0.5"
                      d="M18.3535 13.125V18.9583H24.1868"
                      stroke="#1C274C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      opacity="0.5"
                      cx="18.3534"
                      cy="17.5013"
                      r="14.5833"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-dasharray="0.5 3.5"
                    />
                  </svg>
                  <span className="text-xl">No recent searches</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2 - Recent Searches */}
          <div className="flex flex-col bg-gray-100 p-4 rounded-md w-full h-full space-y-3">
            {recentSearches.slice(0, 4).map((search, index) => (
              <div
                key={index}
                onClick={() => handleSearch(search)}
                className="flex items-center bg-white p-2 rounded-md space-x-2 cursor-pointer hover:bg-gray-100"
              >
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M5.83301 32.082H29.1663"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M21.3344 4.26171L20.2531 5.34307L10.3116 15.2845C9.63828 15.9579 9.3016 16.2946 9.01206 16.6658C8.6705 17.1037 8.37767 17.5775 8.13874 18.0788C7.9362 18.5038 7.78563 18.9555 7.4845 19.8589L6.20845 23.6871L5.89653 24.6228C5.74834 25.0674 5.86405 25.5575 6.19541 25.8889C6.52678 26.2203 7.01692 26.336 7.46149 26.1878L8.39725 25.8759L12.2254 24.5998C13.1288 24.2987 13.5805 24.1481 14.0055 23.9456C14.5068 23.7066 14.9806 23.4138 15.4185 23.0723C15.7898 22.7827 16.1264 22.446 16.7998 21.7727L26.7412 11.8312L27.8226 10.7499C29.6143 8.95821 29.6143 6.05336 27.8226 4.26171C26.0309 2.47006 23.1261 2.47006 21.3344 4.26171Z"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  />
                  <path
                    opacity="0.5"
                    d="M20.2536 5.34375C20.2536 5.34375 20.3888 7.64164 22.4163 9.66919C24.4439 11.6967 26.7418 11.8319 26.7418 11.8319M8.39778 25.8765L6.20898 23.6877"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  />
                </svg>
                <span className="text-xl">{search}</span>
              </div>
            ))}
            {recentSearches.length === 0 && (
              <div className="flex items-center bg-white p-2 rounded-md space-x-2">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M5.83301 32.082H29.1663"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M21.3344 4.26171L20.2531 5.34307L10.3116 15.2845C9.63828 15.9579 9.3016 16.2946 9.01206 16.6658C8.6705 17.1037 8.37767 17.5775 8.13874 18.0788C7.9362 18.5038 7.78563 18.9555 7.4845 19.8589L6.20845 23.6871L5.89653 24.6228C5.74834 25.0674 5.86405 25.5575 6.19541 25.8889C6.52678 26.2203 7.01692 26.336 7.46149 26.1878L8.39725 25.8759L12.2254 24.5998C13.1288 24.2987 13.5805 24.1481 14.0055 23.9456C14.5068 23.7066 14.9806 23.4138 15.4185 23.0723C15.7898 22.7827 16.1264 22.446 16.7998 21.7727L26.7412 11.8312L27.8226 10.7499C29.6143 8.95821 29.6143 6.05336 27.8226 4.26171C26.0309 2.47006 23.1261 2.47006 21.3344 4.26171Z"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  />
                  <path
                    opacity="0.5"
                    d="M20.2536 5.34375C20.2536 5.34375 20.3888 7.64164 22.4163 9.66919C24.4439 11.6967 26.7418 11.8319 26.7418 11.8319M8.39778 25.8765L6.20898 23.6877"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  />
                </svg>
                <span className="text-xl">No recent searches</span>
              </div>
            )}
          </div>

          {/* Column 3 - Keyboard */}
          <div className="flex flex-col bg-gray-100 p-4 rounded-md w-full h-full">
            <div className="flex justify-center">
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-full max-w-md">
                {/* Keyboard Keys */}
                <div className="flex flex-wrap justify-center gap-1 mb-1">
                  {(keyboardMode === "uppercase" ||
                    keyboardMode === "lowercase") && (
                    <>
                      {keyboardLayout[keyboardMode].map((row, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex justify-center w-full gap-1 mb-1"
                        >
                          {row.map((key, keyIndex) =>
                            typeof key === "string" ? (
                              <button
                                key={`${key}-${rowIndex}-${keyIndex}`}
                                onClick={() => handleKeyPress?.(key)}
                                className="bg-gray-800 text-2xl text-white w-10 h-10 flex items-center justify-center rounded-md font-medium text-sm shadow-sm hover:bg-gray-700 transition-colors"
                              >
                                {key}
                              </button>
                            ) : null
                          )}
                        </div>
                      ))}

                      {/* Special keys row for letters */}
                      <div className="flex justify-center w-full gap-1 mb-1"></div>
                    </>
                  )}
                </div>

                {/* Bottom control keys */}
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => handleKeyPress("⇧")}
                    className="bg-gray-700 text-white w-16 h-10 flex items-center justify-center rounded-md font-medium text-sm shadow-sm hover:bg-gray-600 transition-colors"
                  >
                    ⇧
                  </button>

                  <button
                    onClick={() => handleKeyPress("␣")}
                    className="bg-gray-800 text-white flex-1 h-10 flex items-center justify-center rounded-md font-medium text-sm shadow-sm hover:bg-gray-700 transition-colors"
                  >
                    Space
                  </button>
                  <button
                    onClick={() => handleKeyPress("⌫")}
                    className="bg-gray-800 text-white w-20 h-10 flex items-center justify-center rounded-md font-medium text-sm shadow-sm hover:bg-gray-700 transition-colors"
                  >
                    ⌫
                  </button>
                  <button
                    onClick={() => handleSearch(searchValue)}
                    className="bg-blue-600 text-white w-20 h-10 flex items-center justify-center rounded-md font-medium text-sm shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    ➡
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <main className="px-6 pb-12">
          {searchValue ? (
            /* Search Results Carousel */
            <section className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  Search Results for &quot;{searchValue}&quot;
                </h2>
                {filteredItems.length > 4 && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => scroll("left")}
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button
                      onClick={() => scroll("right")}
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <div
                  ref={scrollRef}
                  className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollbarWidth: "none" }}
                >
                  {filteredItems.map((item, index) => (
                    <SearchResultCard
                      key={index}
                      item={item}
                      onClick={() => {
                        router.push(item.link);
                        handleSearch(item.title);
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            /* Default Content (when no search) */
            <>
              {/* Latest Songs */}
              <section className="mt-1">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {[
                    "/images/adults/musics.jpg",
                    "/images/adults/musics.jpg",
                    "/images/adults/musics.jpg",
                    "/images/adults/musics.jpg",
                  ].map((label, i) => (
                    <div
                      onClick={() => router.push("/adult/music/diloke")}
                      key={i}
                      className="relative w-full aspect-video tv-md:w-[450px] tv-md:h-[230px] rounded-xl overflow-hidden shadow-lg bg-black cursor-pointer group transform transition duration-300 hover:scale-105 hover:brightness-110"
                    >
                      <img
                        src={label}
                        alt="Podcast"
                        className={`absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-300 ${
                          label === "/images/adults/chef.png"
                            ? "scale-x-[-1] hover:scale-x-[-1]"
                            : ""
                        }`}
                      />

                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center tv-md:w-[75px] tv-md:h-[25px] gap-1 bg-black/25 text-xs px-2 py-0.5 rounded-md">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_3514_4222)">
                                <path
                                  d="M2.88427 2.73163C2.71327 2.73163 2.54727 2.64413 2.45377 2.48663L2.15727 1.98663C2.01677 1.74913 2.09477 1.44263 2.33277 1.30163C2.56977 1.16113 2.87677 1.23913 3.01777 1.47713L3.31427 1.97713C3.45477 2.21463 3.37677 2.52113 3.13877 2.66213C3.05877 2.70963 2.97127 2.73163 2.88427 2.73163ZM6.16377 5.45313C5.61227 5.45313 5.16377 5.90163 5.16377 6.45313C5.16377 7.00463 5.61227 7.45313 6.16377 7.45313C6.71527 7.45313 7.16377 7.00463 7.16377 6.45313C7.16377 5.90163 6.71527 5.45313 6.16377 5.45313ZM10.7588 7.59013C10.3358 8.14413 8.75377 9.95313 6.16377 9.95313C3.57377 9.95313 2.08627 8.32363 1.56127 7.62263C1.05027 6.94063 1.05127 5.99463 1.56377 5.32213C1.98727 4.76663 3.57127 2.95313 6.16377 2.95313C8.72177 2.95313 10.2308 4.58613 10.7608 5.28813C11.2748 5.96913 11.2738 6.91563 10.7588 7.59013ZM8.16377 6.45313C8.16377 5.35013 7.26677 4.45313 6.16377 4.45313C5.06077 4.45313 4.16377 5.35013 4.16377 6.45313C4.16377 7.55613 5.06077 8.45313 6.16377 8.45313C7.26677 8.45313 8.16377 7.55613 8.16377 6.45313ZM6.66377 1.45313V0.953125C6.66377 0.677125 6.43977 0.453125 6.16377 0.453125C5.88777 0.453125 5.66377 0.677125 5.66377 0.953125V1.45313C5.66377 1.72913 5.88777 1.95313 6.16377 1.95313C6.43977 1.95313 6.66377 1.72913 6.66377 1.45313ZM9.87377 2.48613L10.1703 1.98613C10.3108 1.74863 10.2328 1.44213 9.99477 1.30113C9.75777 1.16063 9.45077 1.23863 9.30977 1.47663L9.01327 1.97663C8.87277 2.21413 8.95077 2.52063 9.18877 2.66163C9.42227 2.80113 9.73228 2.72613 9.87377 2.48613ZM9.99477 11.6046C10.2323 11.4636 10.3108 11.1571 10.1703 10.9196L9.87377 10.4196C9.73277 10.1816 9.42627 10.1036 9.18877 10.2441C8.95127 10.3846 8.87277 10.6916 9.01327 10.9291L9.30977 11.4291C9.45127 11.6686 9.76127 11.7436 9.99477 11.6046ZM6.66377 11.9526V11.4526C6.66377 11.1766 6.43977 10.9526 6.16377 10.9526C5.88777 10.9526 5.66377 11.1766 5.66377 11.4526V11.9526C5.66377 12.2286 5.88777 12.4526 6.16377 12.4526C6.43977 12.4526 6.66377 12.2286 6.66377 11.9526ZM3.01777 11.4291L3.31427 10.9291C3.45477 10.6916 3.37677 10.3851 3.13877 10.2441C2.90077 10.1031 2.59477 10.1816 2.45377 10.4196L2.15727 10.9196C2.01677 11.1571 2.09477 11.4636 2.33277 11.6046C2.56627 11.7441 2.87627 11.6691 3.01777 11.4291Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_3514_4222">
                                  <rect
                                    width="12"
                                    height="12"
                                    fill="white"
                                    transform="translate(0.163086 0.453125)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            158K
                          </span>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="55"
                          height="55"
                          viewBox="0 0 55 55"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="55"
                            height="55"
                            rx="27.5"
                            fill="black"
                            fill-opacity="0.4"
                          />
                          <path
                            d="M42.7161 23.1879C46.0067 25.1307 46.0067 30.1599 42.7161 32.1027L22.8479 43.833C19.6499 45.7212 15.7197 43.2636 15.7197 39.3757L15.7197 15.915C15.7197 12.027 19.6499 9.56945 22.8479 11.4576L42.7161 23.1879Z"
                            fill="white"
                          />
                        </svg>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="text-xs tv-md:text-[16px] text-white px-3 py-1 rounded-full font-medium">
                          18:00
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xl tv-md:text-[24px] text-white px-3 py-1 rounded-full font-medium">
                          Song Title
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Latest Artists */}
              <section className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                  {[
                    [
                      "/adult/music/hunermend/playing?playlist=0&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                      "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                      "Ciwan Haco",
                      "Dîlok",
                    ],
                    [
                      "/adult/music/hunermend/playing?playlist=1&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                      "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                      "Şivan Perwer",
                      "Ey Ferat",
                    ],
                    [
                      "/adult/music/hunermend/playing?playlist=2&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                      "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                      "Diyar Dersim",
                      "Roj baş",
                    ],
                    [
                      "/adult/music/hunermend/playing?playlist=3&image=/adults/Music section/seyda Rojava/seyda.jpg",
                      "/adults/Music section/seyda Rojava/seyda.jpg",
                      "Seyda Rojava",
                      "Helebçe",
                    ],
                    [
                      "/adult/music/hunermend/playing?playlist=4&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                      "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                      "Ciwan Haco",
                      "Dîlok",
                    ],
                  ].map((img, i) => (
                    <div
                      onClick={() => router.push(img[0])}
                      key={i}
                      className="relative h-[300px] w-full rounded-xl overflow-hidden shadow-md group bg-black hover:scale-[1.015] transition-transform"
                    >
                      <img
                        src={img[1]}
                        alt="Artist"
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                          img.includes("chef")
                            ? "scale-x-[-1] group-hover:scale-x-[-1]"
                            : "group-hover:scale-105"
                        }`}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white space-y-1">
                        <div className="text-lg font-semibold">{img[2]}</div>
                        <div className="text-lg font-semibold">{img[3]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
};

// Component to render search result cards based on type
const SearchResultCard = ({
  item,
  onClick,
}: {
  item: SearchItem;
  onClick: () => void;
}) => {
  // Different card styles based on type
  const cardStyles = {
    music: "bg-gradient-to-br from-purple-600 to-blue-500",
    movie: "bg-gradient-to-br from-red-600 to-orange-500",
    doc: "bg-gradient-to-br from-green-600 to-teal-500",
    series: "bg-gradient-to-br from-yellow-600 to-amber-500",
  };

  return (
    <div
      onClick={onClick}
      className={`relative flex-shrink-0 w-[400px] h-[450px] rounded-xl overflow-hidden shadow-md group hover:scale-105 transition-transform cursor-pointer ${
        cardStyles[item.type]
      }`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="absolute top-3 right-3 text-white text-xs px-2 py-0.5">
        <span className="flex items-center gap-1 bg-black/25 text-2xl px-2 py-0.5 rounded-md capitalize">
          {item.type}
        </span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 text-white">
        <div className="text-2xl font-medium line-clamp-1">{item.title}</div>
        {item.subtitle && (
          <div className="text-xl opacity-80 line-clamp-1">{item.subtitle}</div>
        )}
      </div>
    </div>
  );
};

export default App;
