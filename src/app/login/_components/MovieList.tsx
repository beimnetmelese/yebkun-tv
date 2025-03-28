import React from "react";
import Image from "next/image";

function MovieList() {
  // Design Description
  /*
  This section has 3 rows of movie posters. 
  first and last row have 3 columns of 515px each. and the image height is 293px.
  second row has 4 columns of 380px each. and the image height is 433px.
  */

  // movie list bento grid
  const movieList = [
    {
      id: 1,
      title: "Movie 1",
      image: "https://picsum.photos/515/293?random=1",
    },
    {
      id: 2,
      title: "Movie 2",
      image: "https://picsum.photos/515/293?random=2",
    },
    {
      id: 3,
      title: "Movie 3",
      image: "https://picsum.photos/515/293?random=3",
    },
    {
      id: 4,
      title: "Movie 4",
      image: "https://picsum.photos/380/433?random=4",
    },
    {
      id: 5,
      title: "Movie 5",
      image: "https://picsum.photos/380/433?random=5",
    },
    {
      id: 6,
      title: "Movie 6",
      image: "https://picsum.photos/380/433?random=6",
    },
    {
      id: 7,
      title: "Movie 7",
      image: "https://picsum.photos/380/433?random=7",
    },
    {
      id: 8,
      title: "Movie 8",
      image: "https://picsum.photos/515/293?random=8",
    },
    {
      id: 9,
      title: "Movie 9",
      image: "https://picsum.photos/515/293?random=9",
    },
    {
      id: 10,
      title: "Movie 10",
      image: "https://picsum.photos/515/293?random=10",
    },
  ];

  return (
    <div className="w-full h-full grid grid-rows-[1fr_1.5fr_1fr] gap-5">
      {/* First row - 3 columns */}
      <div className="grid grid-cols-3 gap-5">
        {movieList.slice(0, 3).map((movie) => (
          <div
            key={movie.id}
            className="relative  rounded-[15px] overflow-hidden"
          >
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(min-width: 3840px) 33vw, 515px"
            />
          </div>
        ))}
      </div>

      {/* Second row - 4 columns */}
      <div className="grid grid-cols-4 gap-5">
        {movieList.slice(3, 7).map((movie) => (
          <div
            key={movie.id}
            className="relative aspect-[380/433] rounded-[15px] overflow-hidden"
          >
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(min-width: 3840px) 25vw, 380px"
            />
          </div>
        ))}
      </div>

      {/* Third row - 3 columns */}
      <div className="grid grid-cols-3 gap-5">
        {movieList.slice(7, 10).map((movie) => (
          <div
            key={movie.id}
            className="relative rounded-[15px] overflow-hidden"
          >
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(min-width: 3840px) 33vw, 515px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
