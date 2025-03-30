import Image from "next/image";
import Link from "next/link";
import "tailwindcss";

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
}

const NavItem = ({ icon, label, href }: NavItemProps) => (
  <Link
    href={href}
    className="flex items-center gap-[10px] px-[10px] py-[10px] rounded-lg hover:bg-white/5 transition-colors no-underline"
  >
    <Image src={icon} alt={label} width={24} height={24} />
    <span className="text-[16px] ml-[10px]  text-[#000000]/90 font-genos font-[500px]">
      {label}
    </span>
  </Link>
);

const NavSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6 rounded-15 flex flex-col gap-[2px]">
    <h2 className="text-white/70 text-[18px] font-genos font-[500] ">
      {title}
    </h2>
    {children}
  </div>
);

export const AppSettingsNav = () => {
  return (
    <nav className=" w-[218px] h-[605px]  bg-[#F2F2F2] rounded-[15px] backdrop-blur-sm py-[4px] px-[14px]">
      <NavSection title="App Settings ">
        <NavItem
          icon="/app_settings/upgrade_account.png"
          label="Video Options"
          href="/settings/video-options"
        />
        <NavItem
          icon="/app_settings/video.png"
          label="Clean Search"
          href="/settings/clean-search"
        />
        <NavItem
          icon="/app_settings/notifications.png"
          label="Notifications"
          href="/settings/notifications"
        />
      </NavSection>

      <NavSection title="Kids Settings">
        <NavItem
          icon="/app_settings/parent_code.png"
          label="Parent Code"
          href="/settings/parent-code"
        />
        <NavItem
          icon="/app_settings/kids_permissions.png"
          label="Kids Permission"
          href="/settings/kids-permission"
        />
      </NavSection>

      <NavSection title="TV App Info">
        <NavItem
          icon="/app_settings/app_policy.png"
          label="App Policy"
          href="/settings/app-policy"
        />
        <NavItem
          icon="/app_settings/about_the_app.png"
          label="About the App"
          href="/settings/about"
        />
      </NavSection>

      {/* Logo and Copyright */}
      <div className="absolute left-0 right-0 flex flex-col items-center w-[180px] h-[70px] bg-[#FFFFFF] m-[10px] p-[10px] rounded-[15px]">
        <Image
          src="/app_settings/logo.png"
          alt="Logiconn"
          width={120}
          height={40}
          className="mb-2"
        />
        <p className="text-xs text-white/50">Copyright Connect ltd</p>
      </div>
    </nav>
  );
};
