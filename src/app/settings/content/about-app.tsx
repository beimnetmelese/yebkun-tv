"use client";

import Image from "next/image";

export default function AboutAppContent() {
  return (
    <div className="w-[684px] h-[605px] bg-[#F2F2F2] rounded-[15px] py-[15px] px-[20px] overflow-y-auto">
      <h1 className="text-[32px] font-genos font-medium text-[#1C274C] mb-6">
        About the App
      </h1>

      <div className="space-y-4">
        <div className="w-full bg-white rounded-[15px] p-6 flex flex-col items-center">
          <Image
            src="/settings_right_section_images/connect.png"
            alt="App Logo"
            width={200}
            height={120}
            className="mb-4"
          />

          <h2 className="text-[24px] font-genos font-medium text-[#1C274C] mb-2">
            App Name
          </h2>
          <p className="text-[18px] font-genos text-[#64748B] italic">
            Version 1.0.0
          </p>

          <div className="w-full mt-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
              <span className="text-[18px] font-genos text-[#1C274C]">
                Registered by
              </span>
              <span className="text-[18px] font-genos text-[#64748B]">
                Yebkun TV
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
              <span className="text-[18px] font-genos text-[#1C274C]">
                Company name
              </span>
              <span className="text-[18px] font-genos text-[#64748B]">
                Connect Ltd
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
              <span className="text-[18px] font-genos text-[#1C274C]">
                Owner Name
              </span>
              <span className="text-[18px] font-genos text-[#64748B]">
                Miran Sulaiman
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
              <span className="text-[18px] font-genos text-[#1C274C]">
                Language
              </span>
              <span className="text-[18px] font-genos text-[#64748B]">
                Kurdish
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[18px] font-genos text-[#1C274C]">
                Latest Update
              </span>
              <span className="text-[18px] font-genos text-[#64748B]">
                May 12, 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
