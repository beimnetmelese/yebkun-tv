"use client";

import Image from "next/image";
import { useState } from "react";

export default function AppPolicyContent() {
  const [activePolicy, setActivePolicy] = useState(0);

  return (
    <div className="w-full h-full bg-[#F2F2F2] rounded-[15px] pl-[20px]">
      <h1 className="text-[2.5vh] font-[genos] font-[500] text-[#1C274C]">
        App Policy
      </h1>

      <div className="bg-[#F2F2F2] rounded-[15px] flex flex-row relative">
        <div className="flex flex-col w-[8vw] h-[10vh] gap-[10px]">
          <div
            onClick={() => setActivePolicy(0)}
            className={`${
              activePolicy === 0 ? "bg-[#FFFFFF]" : "bg-[#F2F2F2]"
            } w-[90%] h-[3vh] rounded-[15px] flex flex-row items-center cursor-pointer`}
          >
            <Image
              src={"/images/settings/app_policy.png"}
              alt="app policy icon"
              width={24}
              height={24}
              className="pl-[10px]"
            />
            <p className="p-[1vh] m-[0px] text-[1vh] font-[genos] font-[500]">
              App Policy
            </p>
          </div>

          <div
            onClick={() => setActivePolicy(1)}
            className={`${
              activePolicy === 1 ? "bg-[#FFFFFF]" : "bg-[#F2F2F2]"
            } w-full h-[3vh] rounded-[15px] flex flex-row items-center cursor-pointer`}
          >
            <Image
              src={"/images/settings/app_policy.png"}
              alt="app policy icon"
              width={24}
              height={24}
              className="pl-[10px]"
            />
            <p className="p-[1vh] m-[0px] text-[1vh] font-[genos] font-[500]">
              App Policy
            </p>
          </div>

          <div
            onClick={() => setActivePolicy(2)}
            className={`${
              activePolicy === 2 ? "bg-[#FFFFFF]" : "bg-[#F2F2F2]"
            } w-full h-[3vh] rounded-[15px] flex flex-row items-center cursor-pointer`}
          >
            <Image
              src={"/images/settings/app_policy.png"}
              alt="app policy icon"
              width={24}
              height={24}
              className="pl-[10px]"
            />
            <p className="p-[1vh] m-[0px] text-[1vh] font-[genos] font-[500]">
              App Policy
            </p>
          </div>
          </div>
        <div className="absolute bg-[#FFFFFF] right-[15px] w-[75%] h-[56vh] top-[-15px] rounded-[15px]">
          <div className="absolute w-[98%] h-[55vh] bg-[#EBECED] mx-auto flex right-[0] my-[5px] left-[0px] top-[0px] rounded-[15px]">
            {activePolicy === 0 && (
              <p className="p-[1vh] text-[1vh]">
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
              <p className="p-[1vh] text-[1vh]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                nec purus ac libero fermentum ultricies.
              </p>
            )}
            {activePolicy === 2 && (
              <p className="p-[1vh] text-[1vh]">Third policy content here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
