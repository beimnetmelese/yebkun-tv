"use client";

import Image from "next/image";
import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";

export default function AdultPage() {
  const router = useRouter();
  return (
    <>
      <Navigation active="videos" />
      <div className="min-h-screen pt-[150px] overflow-auto bg-[#0c0c0c] text-white pt-10 px-6 font-sans">
        <div className="flex gap-8 mx-auto">
          {/* Main Content */}
          <main className="flex-1">
            {/* ON AIR Section */}
            <section>
              <h2
                className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Latest Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {[
                  "/images/adults/podcast.jpg",
                  "/images/adults/chef.png",
                  "/images/adults/live.jpg",
                  "/images/adults/podcast.jpg",
                ].map((label, i) => (
                  <div
                    onClick={() => router.push("/adult/video/clip")}
                    key={i}
                    className=" w-full relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label}
                      alt="Chef"
                      className={
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      }
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    {/* TOP-RIGHT CHANNEL INFO */}
                    <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                      <span className="flex items-center gap-1 bg-black/25 text-xs px-2 py-0.5 rounded-md">
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

                    {/* BOTTOM-LEFT WATCH BUTTON */}
                    <div className="absolute top-3 left-3">
                      <Image
                        src={"/images/navigation/user.png"}
                        alt={label}
                        width={33}
                        height={33}
                        loading="eager"
                        quality={90}
                        unoptimized
                      />
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        Clip Name
                      </span>
                    </div>

                    {/* BOTTOM-RIGHT LOGO */}
                    <div className="absolute bottom-3 right-3">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        Clip Name
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2
                className="inline-block text-2xl mt-3 font-semibold mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Latest Reels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {[
                  "/images/adults/podcast.jpg",
                  "/images/adults/chef.png",
                  "/images/adults/live.jpg",
                  "/images/adults/podcast.jpg",
                ].map((label, i) => (
                  <div
                    onClick={() => router.push("/adult/video/reel")}
                    key={i}
                    className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label}
                      alt="Chef"
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
                        label === "/chef.png"
                          ? "scale-x-[-1] hover:scale-[1.05] hover:scale-x-[-1]"
                          : "hover:scale-105"
                      }`}
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-transparent" />

                    {/* TOP-RIGHT CHANNEL INFO */}
                    <div className="absolute bottom-3 right-3 flex flex-col items-end text-white space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center gap-1 bg-white bg-opacity-60 text-xs px-2 py-0.5 rounded-md">
                          <svg
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_3491_4353)">
                              <path
                                d="M2.72021 2.7785C2.54921 2.7785 2.38321 2.691 2.28971 2.5335L1.99321 2.0335C1.85271 1.796 1.93071 1.4895 2.16871 1.3485C2.40571 1.208 2.71271 1.286 2.85371 1.524L3.15021 2.024C3.29071 2.2615 3.21271 2.568 2.97471 2.709C2.89471 2.7565 2.80721 2.7785 2.72021 2.7785ZM5.99971 5.5C5.44821 5.5 4.99971 5.9485 4.99971 6.5C4.99971 7.0515 5.44821 7.5 5.99971 7.5C6.55121 7.5 6.99971 7.0515 6.99971 6.5C6.99971 5.9485 6.55121 5.5 5.99971 5.5ZM10.5947 7.637C10.1717 8.191 8.58971 10 5.99971 10C3.40971 10 1.92221 8.3705 1.39721 7.6695C0.886212 6.9875 0.887212 6.0415 1.39971 5.369C1.82321 4.8135 3.40721 3 5.99971 3C8.55771 3 10.0667 4.633 10.5967 5.335C11.1107 6.016 11.1097 6.9625 10.5947 7.637ZM7.99971 6.5C7.99971 5.397 7.10271 4.5 5.99971 4.5C4.89671 4.5 3.99971 5.397 3.99971 6.5C3.99971 7.603 4.89671 8.5 5.99971 8.5C7.10271 8.5 7.99971 7.603 7.99971 6.5ZM6.49971 1.5V1C6.49971 0.724 6.27571 0.5 5.99971 0.5C5.72371 0.5 5.49971 0.724 5.49971 1V1.5C5.49971 1.776 5.72371 2 5.99971 2C6.27571 2 6.49971 1.776 6.49971 1.5ZM9.70971 2.533L10.0062 2.033C10.1467 1.7955 10.0687 1.489 9.83071 1.348C9.59371 1.2075 9.28671 1.2855 9.14571 1.5235L8.84921 2.0235C8.70871 2.261 8.78671 2.5675 9.02471 2.7085C9.25821 2.848 9.56821 2.773 9.70971 2.533ZM9.83071 11.6515C10.0682 11.5105 10.1467 11.204 10.0062 10.9665L9.70971 10.4665C9.56871 10.2285 9.26221 10.1505 9.02471 10.291C8.78721 10.4315 8.70871 10.7385 8.84921 10.976L9.14571 11.476C9.28721 11.7155 9.59721 11.7905 9.83071 11.6515ZM6.49971 11.9995V11.4995C6.49971 11.2235 6.27571 10.9995 5.99971 10.9995C5.72371 10.9995 5.49971 11.2235 5.49971 11.4995V11.9995C5.49971 12.2755 5.72371 12.4995 5.99971 12.4995C6.27571 12.4995 6.49971 12.2755 6.49971 11.9995ZM2.85371 11.476L3.15021 10.976C3.29071 10.7385 3.21271 10.432 2.97471 10.291C2.73671 10.15 2.43071 10.2285 2.28971 10.4665L1.99321 10.9665C1.85271 11.204 1.93071 11.5105 2.16871 11.6515C2.40221 11.791 2.71221 11.716 2.85371 11.476Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3491_4353">
                                <rect
                                  width="12"
                                  height="12"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          159k
                        </span>
                      </div>
                    </div>

                    {/* TOP-LEFT WATCH BUTTON */}
                    <div className="absolute top-3 right-3">
                      <Image
                        src={"/images/navigation/user.png"}
                        alt={label}
                        width={33}
                        height={33}
                        loading="eager"
                        quality={90}
                        unoptimized
                      />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Image
                        src={"/images/navigation/user.png"}
                        alt={label}
                        width={33}
                        height={33}
                        loading="eager"
                        quality={90}
                        unoptimized
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2
                className="inline-block text-2xl font-semibold mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Music Clip
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {[
                  "/images/adults/podcast.jpg",
                  "/images/adults/chef.png",
                  "/images/adults/live.jpg",
                  "/images/adults/podcast.jpg",
                ].map((label, i) => (
                  <div
                    onClick={() => router.push("/adult/video/clip")}
                    key={i}
                    className=" w-full relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label}
                      alt="Chef"
                      className={
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      }
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    {/* TOP-RIGHT CHANNEL INFO */}
                    <div className="absolute top-3 right-3 flex flex-col items-end text-white space-y-1">
                      <span className="flex items-center gap-1 bg-black/25 text-xs px-2 py-0.5 rounded-md">
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

                    {/* BOTTOM-LEFT WATCH BUTTON */}
                    <div className="absolute top-3 left-3">
                      <Image
                        src={"/images/navigation/user.png"}
                        alt={label}
                        width={33}
                        height={33}
                        loading="eager"
                        quality={90}
                        unoptimized
                      />
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        Clip Name
                      </span>
                    </div>

                    {/* BOTTOM-RIGHT LOGO */}
                    <div className="absolute bottom-3 right-3">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        Clip Name
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
