"use client";

import Image from "next/image";

export default function AboutAppContent() {
  return (
    <div className="w-[704px] left-[90px] flex flex-row h-[605px]  bg-[#FFFFFF] rounded-[15px] gap-[15px] px-[20px]">
      {/* App Info Section */}
      <div className="relative left-[-20px] flex flex-col w-[337px] h-full bg-[#F2F2F2] rounded-[15px] pb-[20px]">
        <p className="text-[#000000] text-[26px] font-[500] m-[0px] pl-[10px] pt-[10px]">
          App Info
        </p>
        <div className="absolute flex flex-col items-center w-[315px] h-[543px] bg-[#FFFFFF] rounded-[15px] bottom-[15px] left-[10px]">
          <Image
            src={"/settings_right_section_images/app_info.png"}
            alt="about-app-image"
            width={215}
            height={215}
            className="mt-[10px]"
          />
          <div className="flex flex-col items-center justify-center mt-[60px] gap-[10px]">
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[20px] font-[500] m-[0px]">
                App Name
              </p>
              <p className="text-[#000000] text-[16px] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[20px] font-[500] m-[0px]">
                Registred by
              </p>
              <p className="text-[#000000] text-[16px] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[20px] font-[500] m-[0px]">
                Company Name
              </p>
              <p className="text-[#000000] text-[16px] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
          </div>
        </div>
      </div>

      {/* App Version Section */}
      <div className="relative flex left-[-20px] flex-col w-[337px] h-[604px] bg-[#F2F2F2] rounded-[15px] pb-[20px]">
        <p className="text-[#000000] text-[26px] font-[500] m-[0px] pl-[10px] pt-[10px]">
          App Version
        </p>
        <div className="absolute flex flex-col items-center w-[315px] h-[543px] bg-[#FFFFFF] rounded-[15px] bottom-[15px] left-[10px]">
          <Image
            src={"/images/settings/app_version.png"}
            alt="about-app-image"
            width={215}
            height={215}
            className="mt-[10px]"
          />
          <div className="flex flex-col items-center justify-center mt-[60px] gap-[10px]">
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[20px] font-[500] m-[0px]">
                App Version
              </p>
              <p className="text-[#000000] text-[16px] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[20px] font-[500] m-[0px]">
                Device Name
              </p>
              <p className="text-[#000000] text-[16px] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[20px] font-[500] m-[0px]">
                Language
              </p>
              <p className="text-[#000000] text-[16px] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[20px] font-[500] m-[0px]">
                Latest Update
              </p>
              <p className="text-[#000000] text-[16px] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
