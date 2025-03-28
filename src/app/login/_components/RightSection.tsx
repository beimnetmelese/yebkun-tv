"use client";
import Image from "next/image";
import React from "react";

const cards = [
  {
    id: 1,
    image: "/images/start_screen/playstore.png",
    qrCode: "/images/start_screen/qr.png",
    title: "Card 1",
  },
  {
    id: 2,
    image: "/images/start_screen/appstore.png",
    qrCode: "/images/start_screen/qr.png",
    title: "Card 2",
  },
];

function RightSection() {
  return (
    <div className="w-full h-full rounded-[15px] flex flex-col items-center gap-2">
      <Card image={cards[0].image} title={cards[0].title} />
      <Card image={cards[1].image} title={cards[1].title} />
      <Image
        src={"/images/start_screen/company-logo.png"}
        alt={"company-logo"}
        width={1920}
        height={1080}
        className="w-[104.42px] h-[104.42px] object-contain justify-self-end"
      />
    </div>
  );
}

function Card({ image, title }: { image: string; title: string }) {
  return (
    <div className="w-full bg-white rounded-[15px] px-[7px] py-[10px]">
      <Image
        src={image}
        alt={title}
        width={1920}
        height={1080}
        className="w-full h-[91.65px] object-contain"
      />
      <div className="w-full py-2 bg-[#F2F2F2] flex flex-col items-center gap-2 rounded-[10px]">
        <Image
          src={"/images/start_screen/app-logo-2.png"}
          alt={title}
          width={1920}
          height={1080}
          className="w-[95px] h-[95px] object-cover"
        />
        <div className="flex flex-col items-center ">
          <h1 className="font-semibold text-[36px] text-[#1C274C]">YekBûn</h1>
          <p className="font-semibold text-[20px] text-[#101010]">
            Sosialmedia Kurdî
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="font-semibold text-[24px] text-[#101010]">
          Download App Now!
        </h1>
        <Image
          src={"/images/start_screen/qr.png"}
          alt={title}
          width={1920}
          height={1080}
          className="w-[104.42px] h-[104.42px] object-contain"
        />
      </div>
    </div>
  );
}

export default RightSection;
