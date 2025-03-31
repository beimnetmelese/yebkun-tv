"use client";
import Image from "next/image";

function MovieList() {
  // First row images (3 images)
  const firstRowImages = [
    "/images/home_screen/1.png",
    "/images/home_screen/2.png",
    "/images/home_screen/3.png",
    "/images/home_screen/19.jpg",
    "/images/home_screen/24.jpg",
  ];

  // Second row images (4 images)
  const secondRowImages = [
    "/images/home_screen/19.jpg",
    "/images/home_screen/20.jpg",
    "/images/home_screen/21.jpg",
    "/images/home_screen/22.jpg",
  ];

  // Third row images (3 images)
  const thirdRowImages = [
    "/images/home_screen/23.jpg",
    "/images/home_screen/24.jpg",
    "/images/home_screen/18.jpg",
    "/images/home_screen/19.jpg",
    "/images/home_screen/20.jpg",
  ];

  return (
    <div className="w-full h-full grid grid-rows-[1fr_1fr_1fr] gap-[5px]">
      {/* First row - Infinite scroll left */}
      <div className="relative overflow-hidden rounded-[15px]">
        <div className="flex animate-scroll">
          {[...firstRowImages, ...firstRowImages, ...firstRowImages].map(
            (image, index) => (
              <div
                key={`first-${index}`}
                className="h-[380px] min-w-[515px] flex-shrink-0 px-[2.5px]"
              >
                <div className="relative w-full h-full rounded-[15px] overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt={`Movie ${index + 1}`}
                    fill
                    className="object-fill"
                    sizes="515px"
                    priority={index < 3}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Second row - Infinite scroll right */}
      <div className="relative overflow-hidden rounded-[15px]">
        <div className="flex animate-scroll-reverse">
          {[...secondRowImages, ...secondRowImages, ...secondRowImages].map(
            (image, index) => (
              <div
                key={`second-${index}`}
                className="h-[390px] min-w-[380px] flex-shrink-0 px-[2.5px]"
              >
                <div className="relative w-full h-full rounded-[15px] overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt={`Movie ${index + 1}`}
                    fill
                    className="object-fill"
                    sizes="380px"
                    priority={index < 4}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Third row - Infinite scroll left */}
      <div className="relative overflow-hidden rounded-[15px]">
        <div className="flex animate-scroll">
          {[...thirdRowImages, ...thirdRowImages, ...thirdRowImages].map(
            (image, index) => (
              <div
                key={`third-${index}`}
                className="h-[325px] min-w-[515px] flex-shrink-0 px-[2.5px]"
              >
                <div className="relative w-full h-full rounded-[15px] overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt={`Movie ${index + 1}`}
                    fill
                    className="object-fill"
                    sizes="325"
                    priority={index < 3}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
