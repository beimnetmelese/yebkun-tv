"use client";

import Image from "next/image";
import Navigation from "@/components/ui/navigation";
import { useRouter } from "next/navigation";

export default function AdultPage() {
  const router = useRouter();
  return (
    <>
      <Navigation active="videos" />
      <div className="min-h-screen pt-[150px] h-full w-full overflow-auto bg-[#0c0c0c] text-white pt-10 px-6 font-sans">
        <div className="flex gap-8 mx-auto">
          {/* Main Content */}
          <main className="flex-1">
            {/* ON AIR Section */}
            <section>
              <h2
                className="inline-block text-2xl mt-3 font-semibold mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                AI History
              </h2>
              <div className="flex gap-4 overflow-hidden">
                {[
                  ["/images/adults/reel1.jpg", "/adult/video/reel?playlist=0"],
                  ["/images/adults/reel2.jpg", "/adult/video/reel?playlist=1"],
                  ["/images/adults/reel3.jpg", "/adult/video/reel?playlist=2"],
                  ["/images/adults/reel1.jpg", "/adult/video/reel?playlist=0"],
                  ["/images/adults/reel2.jpg", "/adult/video/reel?playlist=1"],
                  ["/images/adults/reel3.jpg", "/adult/video/reel?playlist=2"],
                  ["/images/adults/reel1.jpg", "/adult/video/reel?playlist=0"],
                  ["/images/adults/reel2.jpg", "/adult/video/reel?playlist=1"],
                  ["/images/adults/reel3.jpg", "/adult/video/reel?playlist=2"],
                  ["/images/adults/reel1.jpg", "/adult/video/reel?playlist=0"],
                  ["/images/adults/reel2.jpg", "/adult/video/reel?playlist=1"],
                ].map((label, i) => (
                  <div
                    onClick={() => router.push(label[1])}
                    key={i}
                    className="relative w-[300px] tv-md:w-[200px] tv-md:h-[260px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label[0]}
                      alt="Chef"
                      className={
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      }
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

                    <div className="absolute bottom-3 left-3">
                      <Image
                        src={"/images/navigation/user.png"}
                        alt={label[0]}
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
              <div className="flex gap-4 overflow-hidden">
                {[
                  [
                    "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "Ciwan Haco",
                    "Dîlok",
                    "/adult/video/clip?videoUrl=/adults/Music section/Ciwan Haco/Yari serin.mp4&title=Dîlok&artist=Ciwan Haco&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                  ],
                  [
                    "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                    "Şivan Perwer",
                    "Ey Ferat",
                    "/adult/video/clip?videoUrl=/adults/Music section/sivan Perwer/Dur Dur.mp4&title=Ey Ferat&artist=Şivan Perwer&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                  ],
                  [
                    "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                    "Diyar Dersim",
                    "Roj baş",
                    "/adult/video/clip?videoUrl=/adults/Music section/Diyar dersim/Emrem Buri.mp4&title=Roj baş&artist=Diyar Dersim&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                  ],
                  [
                    "/adults/Music section/seyda Rojava/seyda.jpg",
                    "Seyda Rojava",
                    "Helebçe",
                    "/adult/video/clip?videoUrl=/adults/Music section/seyda Rojava/Gula Male.mp4&title=Dîlok&artist=Seyda Rojava&image=/adults/Music section/seyda Rojava/seyda.jpg",
                  ],
                  [
                    "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "Ciwan Haco",
                    "Dîlok",
                    "/adult/video/clip?videoUrl=/adults/Music section/Ciwan Haco/Yari serin.mp4&title=Dîlok&artist=Ciwan Haco&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                  ],
                  [
                    "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                    "Şivan Perwer",
                    "Ey Ferat",
                    "/adult/video/clip?videoUrl=/adults/Music section/sivan Perwer/Dur Dur.mp4&title=Ey Ferat&artist=Şivan Perwer&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                  ],
                  [
                    "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                    "Diyar Dersim",
                    "Roj baş",
                    "/adult/video/clip?videoUrl=/adults/Music section/Diyar dersim/Emrem Buri.mp4&title=Roj baş&artist=Diyar Dersim&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                  ],
                  [
                    "/adults/Music section/seyda Rojava/seyda.jpg",
                    "Seyda Rojava",
                    "Helebçe",
                    "/adult/video/clip?videoUrl=/adults/Music section/seyda Rojava/Gula Male.mp4&title=Dîlok&artist=Seyda Rojava&image=/adults/Music section/seyda Rojava/seyda.jpg",
                  ],
                ].map((label, i) => (
                  <div
                    onClick={() => router.push(label[3])}
                    key={i}
                    className="w-[300px] relative tv-md:w-[270px] tv-md:h-[160px] aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label[0]}
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

                    <div className="absolute bottom-3 left-3">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        {label[1]}
                      </span>
                    </div>

                    {/* BOTTOM-RIGHT LOGO */}
                    <div className="absolute bottom-3 right-3">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        {label[2]}
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
                AI Stories
              </h2>
              <div className="flex gap-4 overflow-hidden">
                {[
                  ["/images/adults/reel1.jpg", "/adult/video/reel?playlist=0"],
                  ["/images/adults/reel2.jpg", "/adult/video/reel?playlist=1"],
                  ["/images/adults/reel3.jpg", "/adult/video/reel?playlist=2"],
                  ["/images/adults/reel1.jpg", "/adult/video/reel?playlist=0"],
                  ["/images/adults/reel2.jpg", "/adult/video/reel?playlist=1"],
                  ["/images/adults/reel3.jpg", "/adult/video/reel?playlist=2"],
                  ["/images/adults/reel1.jpg", "/adult/video/reel?playlist=0"],
                  ["/images/adults/reel2.jpg", "/adult/video/reel?playlist=1"],
                  ["/images/adults/reel3.jpg", "/adult/video/reel?playlist=2"],
                  ["/images/adults/reel1.jpg", "/adult/video/reel?playlist=0"],
                  ["/images/adults/reel2.jpg", "/adult/video/reel?playlist=1"],
                ].map((label, i) => (
                  <div
                    onClick={() => router.push(label[1])}
                    key={i}
                    className="relative w-[300px] tv-md:w-[200px] tv-md:h-[260px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label[0]}
                      alt="Chef"
                      className={
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      }
                    />

                    {/* DARK GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-transparent" />

                    {/* TOP-RIGHT CHANNEL INFO */}
                    <div className="absolute top-3 left-3 flex flex-col items-end text-white space-y-1">
                      <div className={"flex items-center"}>
                        <div className="flex  p-2 items-center gap-3">
                          <img
                            src={"/images/adults/chef.png"}
                            className="w-[20px] h-[20px]  tv-md:w-[30px] tv-md:h-[30px] rounded-full"
                            alt="cover"
                          />
                          <div>
                            <p className="text-sm tv-md:text-[18px] font-medium">
                              Clip
                            </p>
                            <p className="text-sm tv-md:text-[18px] text-gray-200">
                              voice
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <svg
                        width="26"
                        height="36"
                        viewBox="0 0 26 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M11.3027 22C7.5315 22 5.64588 22 4.47431 20.8284C3.30273 19.6569 3.30273 18.7712 3.30273 15"
                          stroke="white"
                          stroke-linecap="round"
                        />
                        <path
                          opacity="0.5"
                          d="M23.3027 15C23.3027 18.7712 23.3027 19.6569 22.1312 20.8284C20.9596 22 19.074 22 15.3027 22"
                          stroke="white"
                          stroke-linecap="round"
                        />
                        <path
                          opacity="0.5"
                          d="M15.3027 2C19.074 2 20.9596 2 22.1312 3.17157C23.3027 4.34315 23.3027 5.22876 23.3027 9"
                          stroke="white"
                          stroke-linecap="round"
                        />
                        <path
                          opacity="0.5"
                          d="M11.3027 2C7.5315 2 5.64588 2 4.47431 3.17157C3.30273 4.34315 3.30273 5.22876 3.30273 9"
                          stroke="white"
                          stroke-linecap="round"
                        />
                        <path
                          d="M7.19516 14.0598C6.60021 13.3697 6.30273 13.0246 6.30273 12C6.30273 10.9754 6.60021 10.6303 7.19516 9.94021C8.38311 8.56222 10.3754 7 13.3027 7C16.2301 7 18.2224 8.56222 19.4103 9.94021C20.0053 10.6303 20.3027 10.9754 20.3027 12C20.3027 13.0246 20.0053 13.3697 19.4103 14.0598C18.2224 15.4378 16.2301 17 13.3027 17C10.3754 17 8.38311 15.4378 7.19516 14.0598Z"
                          stroke="white"
                        />
                        <circle cx="13.3027" cy="12" r="2" stroke="white" />
                        <path
                          d="M7.51098 34V29.56C7.51098 29.304 7.47098 29.136 7.39098 29.056C7.31098 28.976 7.19498 28.936 7.04298 28.936C6.91498 28.936 6.77498 28.956 6.62298 28.996C6.47898 29.028 6.35098 29.06 6.23898 29.092V28.636C6.41498 28.596 6.61498 28.56 6.83898 28.528C7.06298 28.488 7.28298 28.468 7.49898 28.468C7.73898 28.468 7.92698 28.5 8.06298 28.564C8.20698 28.628 8.30698 28.728 8.36298 28.864C8.41898 29 8.44698 29.18 8.44698 29.404V34H7.51098ZM9.80514 34C9.80514 33.808 9.80514 33.62 9.80514 33.436C9.80514 33.244 9.80514 33.052 9.80514 32.86C9.80514 32.476 9.84114 32.168 9.91314 31.936C9.98514 31.696 10.0971 31.516 10.2491 31.396C10.4091 31.276 10.6091 31.196 10.8491 31.156C11.0891 31.116 11.3771 31.096 11.7131 31.096C11.8891 31.096 12.0491 31.096 12.1931 31.096C12.3371 31.096 12.4971 31.096 12.6731 31.096C12.9851 31.096 13.2411 31.024 13.4411 30.88C13.6411 30.728 13.7411 30.452 13.7411 30.052C13.7411 29.708 13.6651 29.464 13.5131 29.32C13.3691 29.176 13.1691 29.084 12.9131 29.044C12.7771 29.02 12.6371 29.004 12.4931 28.996C12.3491 28.988 12.1771 28.984 11.9771 28.984C11.7451 28.984 11.5051 28.996 11.2571 29.02C11.0091 29.036 10.7971 29.072 10.6211 29.128C10.5411 29.144 10.4451 29.168 10.3331 29.2C10.2291 29.224 10.1331 29.256 10.0451 29.296C9.95714 29.328 9.89314 29.368 9.85314 29.416C9.85314 29.384 9.85314 29.34 9.85314 29.284C9.85314 29.22 9.85314 29.16 9.85314 29.104C9.85314 29.048 9.85314 29.02 9.85314 29.02C9.85314 28.916 9.91314 28.828 10.0331 28.756C10.1611 28.684 10.3291 28.628 10.5371 28.588C10.7451 28.54 10.9771 28.508 11.2331 28.492C11.4971 28.468 11.7611 28.456 12.0251 28.456C12.5051 28.456 12.9371 28.484 13.3211 28.54C13.7051 28.596 14.0051 28.74 14.2211 28.972C14.4451 29.196 14.5571 29.56 14.5571 30.064C14.5571 30.512 14.4771 30.852 14.3171 31.084C14.1571 31.308 13.9491 31.46 13.6931 31.54C13.4371 31.62 13.1611 31.66 12.8651 31.66C12.7131 31.66 12.5571 31.66 12.3971 31.66C12.2371 31.66 12.0611 31.66 11.8691 31.66C11.5971 31.66 11.3731 31.688 11.1971 31.744C11.0211 31.8 10.8891 31.904 10.8011 32.056C10.7131 32.208 10.6691 32.428 10.6691 32.716V33.46H14.5931V34H9.80514ZM17.6936 34.072C17.4536 34.072 17.2016 34.064 16.9376 34.048C16.6736 34.04 16.4256 34.02 16.1936 33.988C15.9616 33.956 15.7736 33.916 15.6296 33.868C15.5256 33.836 15.4496 33.788 15.4016 33.724C15.3616 33.66 15.3456 33.58 15.3536 33.484L15.3656 33.232C15.6296 33.328 15.9496 33.404 16.3256 33.46C16.7016 33.516 17.1216 33.544 17.5856 33.544C17.9696 33.544 18.2896 33.516 18.5456 33.46C18.8096 33.396 19.0096 33.284 19.1456 33.124C19.2816 32.956 19.3496 32.72 19.3496 32.416C19.3496 32.136 19.3136 31.932 19.2416 31.804C19.1696 31.668 19.0696 31.58 18.9416 31.54C18.8136 31.492 18.6776 31.468 18.5336 31.468H16.1336V30.928H18.5456C18.7616 30.928 18.9296 30.86 19.0496 30.724C19.1696 30.588 19.2296 30.36 19.2296 30.04C19.2296 29.744 19.1776 29.524 19.0736 29.38C18.9696 29.228 18.8136 29.124 18.6056 29.068C18.4056 29.012 18.1536 28.984 17.8496 28.984C17.7936 28.984 17.7336 28.984 17.6696 28.984C17.6136 28.984 17.5496 28.984 17.4776 28.984C17.2536 28.984 17.0096 29 16.7456 29.032C16.4896 29.056 16.2536 29.092 16.0376 29.14C15.8216 29.18 15.6536 29.224 15.5336 29.272V28.984C15.5336 28.88 15.5616 28.804 15.6176 28.756C15.6736 28.7 15.7696 28.652 15.9056 28.612C16.0336 28.572 16.2736 28.536 16.6256 28.504C16.9776 28.472 17.3696 28.456 17.8016 28.456C18.4256 28.456 18.9016 28.504 19.2296 28.6C19.5656 28.696 19.7936 28.86 19.9136 29.092C20.0416 29.316 20.1056 29.624 20.1056 30.016C20.1056 30.344 20.0456 30.608 19.9256 30.808C19.8056 31.008 19.6376 31.124 19.4216 31.156V31.168C19.6856 31.168 19.8856 31.26 20.0216 31.444C20.1656 31.628 20.2376 31.96 20.2376 32.44C20.2376 32.88 20.1496 33.216 19.9736 33.448C19.8056 33.68 19.5376 33.844 19.1696 33.94C18.8016 34.028 18.3096 34.072 17.6936 34.072Z"
                          fill="white"
                        />
                      </svg>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <div>
                        <p className="text-sm tv-md:text-[18px] font-medium">
                          Clip
                        </p>
                        <p className="text-sm tv-md:text-[18px] text-gray-200">
                          voice
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2
                className="inline-block text-2xl font-semibold mt-6 mb-6 p-2 rounded-md"
                style={{ backgroundColor: "#FFFFFF40" }}
              >
                Music Clip
              </h2>
              <div className="flex gap-4 overflow-hidden">
                {[
                  [
                    "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "Ciwan Haco",
                    "Dîlok",
                    "/adult/video/clip?videoUrl=/adults/Music section/Ciwan Haco/Yari serin.mp4&title=Dîlok&artist=Ciwan Haco&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                  ],
                  [
                    "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                    "Şivan Perwer",
                    "Ey Ferat",
                    "/adult/video/clip?videoUrl=/adults/Music section/sivan Perwer/Dur Dur.mp4&title=Ey Ferat&artist=Şivan Perwer&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                  ],
                  [
                    "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                    "Diyar Dersim",
                    "Roj baş",
                    "/adult/video/clip?videoUrl=/adults/Music section/Diyar dersim/Emrem Buri.mp4&title=Roj baş&artist=Diyar Dersim&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                  ],
                  [
                    "/adults/Music section/seyda Rojava/seyda.jpg",
                    "Seyda Rojava",
                    "Helebçe",
                    "/adult/video/clip?videoUrl=/adults/Music section/seyda Rojava/Gula Male.mp4&title=Dîlok&artist=Seyda Rojava&image=/adults/Music section/seyda Rojava/seyda.jpg",
                  ],
                  [
                    "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                    "Ciwan Haco",
                    "Dîlok",
                    "/adult/video/clip?videoUrl=/adults/Music section/Ciwan Haco/Yari serin.mp4&title=Dîlok&artist=Ciwan Haco&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
                  ],
                  [
                    "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                    "Şivan Perwer",
                    "Ey Ferat",
                    "/adult/video/clip?videoUrl=/adults/Music section/sivan Perwer/Dur Dur.mp4&title=Ey Ferat&artist=Şivan Perwer&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
                  ],
                  [
                    "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                    "Diyar Dersim",
                    "Roj baş",
                    "/adult/video/clip?videoUrl=/adults/Music section/Diyar dersim/Emrem Buri.mp4&title=Roj baş&artist=Diyar Dersim&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
                  ],
                  [
                    "/adults/Music section/seyda Rojava/seyda.jpg",
                    "Seyda Rojava",
                    "Helebçe",
                    "/adult/video/clip?videoUrl=/adults/Music section/seyda Rojava/Gula Male.mp4&title=Dîlok&artist=Seyda Rojava&image=/adults/Music section/seyda Rojava/seyda.jpg",
                  ],
                ].map((label, i) => (
                  <div
                    onClick={() => router.push(label[3])}
                    key={i}
                    className="w-[300px] relative tv-md:w-[270px] tv-md:h-[160px] aspect-video rounded-xl overflow-hidden shadow-lg bg-black group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                  >
                    {/* BACKGROUND IMAGE */}
                    <img
                      src={label[0]}
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
                        alt={label[0]}
                        width={33}
                        height={33}
                        loading="eager"
                        quality={90}
                        unoptimized
                      />
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        {label[1]}
                      </span>
                    </div>

                    {/* BOTTOM-RIGHT LOGO */}
                    <div className="absolute bottom-3 right-3">
                      <span className="text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                        {label[2]}
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
