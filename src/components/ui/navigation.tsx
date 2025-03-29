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
      className="flex flex-col items-center gap-1 px-1.5 py-1 transition-colors"
    >
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-black ${
          active ? "ring-2 ring-white" : ""
        }`}
        style={{
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <Image src={icon} alt={label} width={20} height={20} />
      </div>
      <span className="text-[10px] text-white font-medium">{label}</span>
    </Link>
  );
};

export default function Navigation() {
  return (
    <nav className="relative overflow-hidden py-2 border-b border-zinc-700">
      <div
        className="absolute inset-0 bg-black opacity-95"
        style={{
          backgroundImage: `repeating-conic-gradient(#333 0% 25%, #222 0% 50%)`,
          backgroundSize: "12px 12px",
        }}
      ></div>
      <div className="relative max-w-screen-xl mx-auto flex items-center justify-between px-4">
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
        
        <div className="flex items-center space-x-3 bg-white bg-opacity-95 rounded-full px-4 py-1.5 w-full max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
          <Image
            src="/images/navigation/mic.png"
            alt="Mic"
            width={24}
            height={24}
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
            href="/evin"
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
    </nav>
  );
}
