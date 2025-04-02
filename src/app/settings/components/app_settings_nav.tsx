"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <button
    className={`flex items-center gap-[10px] px-[4px] py-[2px] border-none rounded-[10px] transition-colors w-full h-[38px] text-left cursor-pointer ${
      active ? "bg-[#FFFFFF]" : "hover:bg-[#F2F2F2]"
    }`}
    onClick={onClick}
  >
    <div className="w-[24px] h-[24px] flex items-center justify-center">
      <Image src={icon} alt={label} width={24} height={24} />
    </div>
    <span className="text-[16px] text-[#1C274C] font-[genos] font-[500]">
      {label}
    </span>
  </button>
);

const NavSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-[6px] px-[10px] h-full">
    <h2 className="text-[18px] font-[genos] font-[500] text-[#1C274C] mb-2">
      {title}
    </h2>
    <div className="space-y-1 flex flex-col gap-[10px]">{children}</div>
  </div>
);

interface AppSettingsNavProps {
  activeSection: string;
  onSectionChange: Dispatch<SetStateAction<string>>;
}

export const AppSettingsNav = ({
  activeSection,
  onSectionChange,
}: AppSettingsNavProps) => {
  return (
    <nav className="w-full h-full bg-[#F2F2F2] rounded-[15px] py-[15px] px-[10px] flex flex-col">
      <NavSection title="App Settings">
        <NavItem
          icon="/app_settings/video.png"
          label="Video Options"
          active={activeSection === "video-options"}
          onClick={() => onSectionChange("video-options")}
        />
        <NavItem
          icon="/app_settings/clean_search.png"
          label="Clean Search"
          active={activeSection === "clean-search"}
          onClick={() => onSectionChange("clean-search")}
        />
        <NavItem
          icon="/app_settings/notifications.png"
          label="Notifications"
          active={activeSection === "notifications"}
          onClick={() => onSectionChange("notifications")}
        />
      </NavSection>

      <NavSection title="Kids Settings">
        <NavItem
          icon="/app_settings/parent_code.png"
          label="Parent Code"
          active={activeSection === "parent-code"}
          onClick={() => onSectionChange("parent-code")}
        />
        <NavItem
          icon="/app_settings/kids_permissions.png"
          label="Kids Permission"
          active={activeSection === "kids-permission"}
          onClick={() => onSectionChange("kids-permission")}
        />
      </NavSection>

      <NavSection title="TV App Info">
        <NavItem
          icon="/app_settings/app_policy.png"
          label="App Policy"
          active={activeSection === "app-policy"}
          onClick={() => onSectionChange("app-policy")}
        />
        <NavItem
          icon="/app_settings/about_the_app.png"
          label="About the App"
          active={activeSection === "about"}
          onClick={() => onSectionChange("about")}
        />
      </NavSection>

      {/* Logo and Copyright */}
      <div className="mt-auto flex flex-col items-center pt-[4px] bg-[#FFFFFF] rounded-b-[15px]">
        <Image
          src="/app_settings/logo.png"
          alt="Logo"
          width={90}
          height={30}
          className="mb-[2px]"
        />
        <p className="text-[10px] text-[#64748B] font-[genos]">
          Copyright Connect ltd
        </p>
      </div>
    </nav>
  );
};
