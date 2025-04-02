"use client";
import { Options } from "./options";

export const MiddleCard = () => {
  return (
    <div className="w-full h-full bg-[#F2F2F2] rounded-[15px] py-[10px] px-[20px]">
      <h1 className="text-[32px] font-[genos] font-medium text-[#1C274C] mb-6">
        AutoPlay
      </h1>

      <div className="flex flex-col gap-[20px] w-[640px]">
        <Options
          title="AutoPlay"
          description="Play Video and Music automatically"
        />
      </div>
    </div>
  );
};
