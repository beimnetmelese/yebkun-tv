import Image from "next/image";
import { useRouter } from "next/navigation";

interface Video {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  episodeNumber: number;
  id: string;
}

function SeriesBottomCard({
  thumbnail,
  title,
  description, // eslint-disable-line @typescript-eslint/no-unused-vars
  url, // eslint-disable-line @typescript-eslint/no-unused-vars
  episodeNumber,
  id,
}: Video) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/kids/series/${encodeURIComponent(id)}`)} className="group relative cursor-pointer w-[329px] h-[180px] z-10 ">
      <div className="w-full h-full rounded-lg relative transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-xl group-hover:border-2 group-hover:border-red-500 group-hover:border-[4px]">
        <Image
          src={thumbnail}
          alt={title}
          width={329}
          height={180}
          className="rounded-lg w-full h-full object-cover transition-transform duration-300 ease-in-out"
        />
        <div className="absolute top-2 right-2 w-[60px] h-[32px] bg-black/60 flex items-center justify-center rounded-md px-2 py-1 shadow-md">
          <p className="text-white text-sm font-semibold font-[genos]">
            EP {episodeNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SeriesBottomCard;
