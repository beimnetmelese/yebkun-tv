"use client";

import Navigation from "@/components/ui/navigation";
import { userInfo } from "@/utils/dummy_data";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AppSettingsNav } from "./components/app_settings_nav";

// Dynamically import content components
const VideoOptionsContent = dynamic(() => import("./content/video-options"));
const CleanSearchContent = dynamic(() => import("./content/clean-search"));
const NotificationsContent = dynamic(() => import("./content/notifications"));
const ParentCodeContent = dynamic(() => import("./content/parent-code"));
const KidsPermissionContent = dynamic(
  () => import("./content/kids-permission")
);
const AppPolicyContent = dynamic(() => import("./content/app-policy"));
const AboutAppContent = dynamic(() => import("./content/about-app"));


import { RightCard } from "./components/right_card";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("video-options");

  // Function to render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "video-options":
        return <VideoOptionsContent />;
      case "clean-search":
        return <CleanSearchContent />;
      case "notifications":
        return <NotificationsContent />;
      case "parent-code":
        return <ParentCodeContent />;
      case "kids-permission":
        return <KidsPermissionContent />;
      case "app-policy":
        return <AppPolicyContent />;
      case "about":
        return <AboutAppContent />;
      default:
        return <VideoOptionsContent />;
    }
  };

  // Function to get the correct image for the right card
  const getRightCardImage = () => {
    switch (activeSection) {
      case "upgrade-account":
        return "/settings_right_section_images/app_info.png";
      case "video-options":
        return "/settings_right_section_images/video_options.png";
      case "clean-search":
        return "/settings_right_section_images/clean_search.png";
      case "notifications":
        return "/settings_right_section_images/notifications.png";
      case "parent-code":
        return "/settings_right_section_images/parent_code.png";
      case "kids-permission":
        return "/settings_right_section_images/kids_permissions.png";
      case "app-policy":
        return "/settings_right_section_images/app_policy.png";
      case "about":
        return "/images/settings/connect.png";
      default:
        return "/settings_right_section_images/video_options.png";
    }
  };

  return (
    <div className="flex flex-col h-[605px] bg-[#FFFFFF] mt-[50px] mx-auto">
      <Navigation />

      <div className="flex flex-row justify-start items-start gap-[6px] pt-[155px] px-[8px] pb-[8px] w-full h-[605px]">
        <div className="flex-shrink-0">
          <AppSettingsNav
            onSectionChange={setActiveSection}
            activeSection={activeSection}
          />
        </div>

        <div className="flex w-[684px] h-[603px] ml-[160px]">{renderContent()}</div>

        <div className="flex w-[360px] h-[603px] ml-[15px]">
          <RightCard settingImage={getRightCardImage()} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
