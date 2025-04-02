"use client";

import Image from "next/image";

export default function AboutAppContent() {
  return (
    <div className="w-full left-[90px] flex flex-row h-full  bg-[#FFFFFF] rounded-[15px] gap-[15px] px-[20px]">
      {/* App Info Section */}
      <div className="relative left-[-20px] flex flex-col w-[60%] h-full bg-[#F2F2F2] rounded-[15px] pb-[20px]">
        <p className="text-[#000000] text-[2.5vh] font-[500] m-[0px] pl-[1vw] pt-[1vh]">
          App Info
        </p>
        <div className="absolute flex flex-col items-center w-[94%] h-[90%] bg-[#FFFFFF] rounded-[15px] bottom-[15px] left-[0px] right-[0px] mx-auto ">
          <Image
            src={"/settings_right_section_images/app_info.png"}
            alt="about-app-image"
            layout="responsive"
            width={100}
            height={50}
            className=" w-[90%] h-[40%]"
          />

          <div className="flex flex-col items-center justify-start mt-[2.7vh] gap-[10px]">
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[2vh] font-[500] m-[0px]">
                App Name
              </p>
              <p className="text-[#000000] text-[1.5vh] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[2vh] font-[500] m-[0px]">
                Registred by
              </p>
              <p className="text-[#000000] text-[1.5vh] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[2vh] font-[500] m-[0px]">
                Company Name
              </p>
              <p className="text-[#000000] text-[1.5vh] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
          </div>
        </div>
      </div>

      {/* App Version Section */}
      <div className="relative flex left-[-20px] flex-col w-[60%] h-full bg-[#F2F2F2] rounded-[15px] pb-[20px]">
        <p className="text-[#000000] text-[2.5vh] font-[genos] font-[500] m-[0px] pl-[1vw] pt-[1vh]">
          App Version
        </p>
        <div className="absolute flex flex-col items-center w-[94%] h-[90%] bg-[#FFFFFF] rounded-[15px] bottom-[15px] left-[0px] right-[0px] mx-auto">
          <Image
            src={"/images/settings/app_version.png"}
            alt="about-app-image"
            layout="responsive"
            width={100}
            height={50}
            className="w-[90%] h-[40%]"
          />
          <div className="flex flex-col items-center justify-center mt-[5vh] gap-[10px]">
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[2vh] font-[500] m-[0px]">
                App Version
              </p>
              <p className="text-[#000000] text-[1.5vh] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[2vh] font-[500] m-[0px]">
                Device Name
              </p>
              <p className="text-[#000000] text-[1.5vh] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[2vh] font-[500] m-[0px]">
                Language
              </p>
              <p className="text-[#000000] text-[1.5vh] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
            <span className="flex flex-col gap-[3px] items-center justify-center">
              <p className="text-[#000000] text-[2vh] font-[500] m-[0px]">
                Latest Update
              </p>
              <p className="text-[#000000] text-[1.5vh] font-[400] m-[0px]">
                Avatar Tasks
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
