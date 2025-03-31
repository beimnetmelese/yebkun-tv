import Image from "next/image";
import Link from "next/link";

interface NavigationItemProps {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
}

const NavigationItem = ({
  href,
  label,
  icon,
  active = false,
}: NavigationItemProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-[1px] px-[10px] py-[10px] transition-colors no-underline text-[#FFFFFF]/90"
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center text-black ${
          active ? "ring-2 ring-white" : ""
        }`}
        style={{
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <Image src={icon} alt={label} width={55} height={55} />
      </div>
      <span className="text-[22px] text-white font-bold-500">{label}</span>
    </Link>
  );
};

export default function Navigation() {
  return (
    <header className="fixed top-[0px] left-[0px] right-[0px] w-full h-[150px] z-50">
      <div
        className="w-full h-full bg-[#000000]"
        style={{
          background:
            "linear-gradient(to bottom, #000000, rgba(59, 59, 59, 0))",
        }}
      >
        <div className="flex items-center justify-between w-full h-full px-4">
          <div className="flex items-center space-x-6">
            <NavigationItem
              href="/dashpak"
              label="Dashpak"
              icon="/images/navigation/destpek.png"
            />
            <NavigationItem
              href="/cinema"
              label="Cinema"
              icon="/images/navigation/muzik.png"
            />
            <NavigationItem
              href="/videos"
              label="Videos"
              icon="/images/navigation/sinema.png"
              active={true}
            />
            <NavigationItem
              href="/shwazi"
              label="Shwazi"
              icon="/images/navigation/videos.png"
            />
            <NavigationItem
              href="/gerandin"
              label="Gerandin"
              icon="/images/navigation/stream.png"
            />
            <NavigationItem
              href="/stream"
              label="Stream"
              icon="/images/navigation/gerandin.png"
            />
          </div>

          {/* Search Bar with Mic Icon */}
          <div className="flex items-center space-x-3 bg-white bg-opacity-95 rounded-full px-[10px] py-[10px] w-[423px] gap-[20px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-[30px] bg-[#FFFFFF] rounded-[52px] font-[genos] font-normal text-[36px] focus:outline-none text-[#000000]/90 p-[10px]"
            />
            <Image
              src="/images/navigation/mic.png"
              alt="Mic"
              width={55}
              height={55}
              className="cursor-pointer"
            />
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-3">
            <NavigationItem
              href="/kulturtv"
              label="KulturTV"
              icon="/images/navigation/malbat_tv.png"
            />
            <NavigationItem
              href="/zaroktv"
              label="ZarokTV"
              icon="/images/navigation/zarok_tv.png"
            />
            <NavigationItem
              href="/settings"
              label="Evin"
              icon="/images/navigation/eyar.png"
            />
            <NavigationItem
              href="/archive"
              label="Archive"
              icon="/images/navigation/archive.png"
            />
            <NavigationItem
              href="/user"
              label="User"
              icon="/images/navigation/user.png"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
