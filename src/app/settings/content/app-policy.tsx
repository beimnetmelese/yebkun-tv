"use client";

import Image from "next/image";
import { useState } from "react";

export default function AppPolicyContent() {
  const [activePolicy, setActivePolicy] = useState(0);

  return (
    <div className="w-[684px] h-[605px] bg-[#F2F2F2] rounded-[15px] pl-[20px]">
      <h1 className="text-[30px] font-[genos] font-[500] text-[#1C274C]">
        App Policy
      </h1>

      <div className="bg-[#F2F2F2] rounded-[15px] flex flex-row relative">
        <div className="flex flex-col w-[160px] h-[138px] gap-[10px]">
          <div
            onClick={() => setActivePolicy(0)}
            className={`${
              activePolicy === 0 ? "bg-[#FFFFFF]" : "bg-[#F2F2F2]"
            } w-[160px] h-[38px] rounded-[15px] flex flex-row items-center cursor-pointer`}
          >
            <Image
              src={"/images/settings/app_policy.png"}
              alt="app policy icon"
              width={24}
              height={24}
              className="pl-[10px]"
            />
            <p className="p-[10px] m-[0px] text-[16px] font-[genos] font-[500]">
              App Policy
            </p>
          </div>

          <div
            onClick={() => setActivePolicy(1)}
            className={`${
              activePolicy === 1 ? "bg-[#FFFFFF]" : "bg-[#F2F2F2]"
            } w-[160px] h-[38px] rounded-[15px] flex flex-row items-center cursor-pointer`}
          >
            <Image
              src={"/images/settings/app_policy.png"}
              alt="app policy icon"
              width={24}
              height={24}
              className="pl-[10px]"
            />
            <p className="p-[10px] m-[0px] text-[16px] font-[genos] font-[500]">
              App Policy
            </p>
          </div>

          <div
            onClick={() => setActivePolicy(2)}
            className={`${
              activePolicy === 2 ? "bg-[#FFFFFF]" : "bg-[#F2F2F2]"
            } w-[160px] h-[38px] rounded-[15px] flex flex-row items-center cursor-pointer`}
          >
            <Image
              src={"/images/settings/app_policy.png"}
              alt="app policy icon"
              width={24}
              height={24}
              className="pl-[10px]"
            />
            <p className="p-[10px] m-[0px] text-[16px] font-[genos] font-[500]">
              App Policy
            </p>
          </div>
        </div>
        <div className="absolute bg-[#FFFFFF] right-[15px] w-[478px] h-[532px] top-[-15px] rounded-[15px]">
          <div className="absolute w-[458px] h-[506px] bg-[#EBECED] right-[10px] top-[10px] rounded-[15px]">
            {activePolicy === 0 && (
              <p className="p-[10px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                nec purus ac libero fermentum ultricies. Nullam nec purus ac
                libero fermentum ultricies. Nullam nec purus ac libero fermentum
                ultricies. Nullam nec purus ac libero fermentum ultricies.
                Nullam nec purus ac libero fermentum ultricies. Nullam nec purus
                ac libero fermentum ultricies. Nullam nec purus ac libero
                fermentum ultricies. Nullam nec purus ac libero fermentum
                ultricies. Nullam nec purus ac libero fermentum ultricies.
                Nullam nec purus ac libero fermentum ultricies. Nullam nec purus
                ac libero fermentum ultricies. Nullam nec purus ac libero
                fermentum ultricies. Nullam nec purus ac libero fermentum
                ultricies. Nullam nec purus ac libero fermentum ultricies.
                Nullam nec purus ac libero fermentum ultricies. Nullam nec purus
                ac libero fermentum ultricies. Nullam nec purus ac libero
                fermentum ultricies. Nullam nec purus ac
              </p>
            )}
            {activePolicy === 1 && (
              <p className="p-[10px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                nec purus ac libero fermentum ultricies.
              </p>
            )}
            {activePolicy === 2 && (
              <p className="p-[10px]">Third policy content here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
