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
    <div className="w-full h-full rounded-[15px] p-[10px] flex flex-col items-center gap-[15px] bg-[#F2F2F2]">
      {cards.map((card) => (
        <Card key={card.id} image={card.image} title={card.title} />
      ))}

      {/* Optimized company logo */}
      <Image
        src="/images/start_screen/company-logo.png"
        alt="company-logo"
        width={104}
        height={104}
        priority
        fetchPriority="high"
        className="w-[104px] h-[104px] object-contain justify-self-end"
      />
    </div>
  );
}

function Card({ image, title }: { image: string; title: string }) {
  return (
    <div className="w-[full] mx-auto bg-[#FFFFFF] rounded-[15px] gap-[5px] p-[10px] shadow-md flex flex-col items-center justify-center">
      {/* Optimized card image */}
      <Image
        src={image}
        alt={title}
        width={250}
        height={120}
        loading="eager"
        className="w-[98%] h-[91.65px] object-contain mx-auto"
      
      />

      {/* App Info Section */}
      <div className="w-[90%] p-[10px] py-[5px] bg-[#F2F2F2] mx-auto gap-[5px] rounded-[10px] left-[0px] right[0px] flex flex-col items-center justify-center">
        <Image
          src="/images/start_screen/app-logo-2.svg"
          alt={title}
          width={95}
          height={85}
          placeholder="blur"
          blurDataURL="/images/start_screen/placeholder.png"
          className="w-[94%] mx-auto object-contain py-[5px]"
          unoptimized
        />
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-[28px] text-[#1C274C] m-[0px]">YekBûn</h1>
          <p className="font-semibold text-[18px] text-[#101010] m-0">
            Sosialmedia Kurdî
          </p>
        </div>
      </div>

      {/* Download Section */}
      <div className="w-full flex flex-col items-center gap-[5px]">
        <h1 className="font-semibold text-[20px] text-[#101010] m-[0px]">
          Download App Now!
        </h1>
        <Image
          src="/images/start_screen/qr.svg"
          alt="QR Code"
          width={100}
          height={90}
          placeholder="blur"
          blurDataURL="/images/start_screen/placeholder.png"
          className="w-full h-[91px] object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}

export default RightSection;
