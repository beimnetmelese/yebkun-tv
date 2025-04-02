"use client";

import { useState } from "react";

export default function ParentCodeContent() {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNumberClick = (number: string) => {
    if (currentIndex < 4) {
      const newPin = [...pin];
      newPin[currentIndex] = number;
      setPin(newPin);
      setCurrentIndex(currentIndex + 1);
    }
  };

  // const handleClearClick = () => {
  //   setPin(["", "", "", ""]);
  //   setCurrentIndex(0);
  // };

  const handleBackspaceClick = () => {
    if (currentIndex > 0) {
      const newPin = [...pin];
      newPin[currentIndex - 1] = "";
      setPin(newPin);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full h-full bg-[#F2F2F2] rounded-[1.5vh] py-[1vh] px-[2vw] flex items-start justify-start relative">
      <h1 className="text-[3vh] font-[genos] font-[500] text-[#1C274C] mb-6 m-[0px]">
        Parent Code
      </h1>
      <div className="absolute flex flex-col items-center justify-center w-[84%] h-[88%] bg-[#FFFFFF] bottom-[15px] right-[0px] left-[0px]  mx-auto px-[2vw] rounded-[15px]">
        <div className="flex flex-col items-center justify-center">
          {/* PIN Display */}
          <div className="flex gap-[0.5vw] mb-[25px] items-center justify-center">
            {pin.map((digit, index) => (
              <div
                key={index}
                className="w-[6vw] h-[8vh] bg-[#F2F2F2] rounded-[5px] flex items-center justify-center text-[32px] font-[genos] font-medium"
              >
                {digit ? "●" : ""}
              </div>
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-[0.5vw]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button
                key={number}
                className="w-[4vw] h-[4vw] bg-[#BBDDFF] font-[genos] font-[500] text-[#FFFFFF] border-none text-[3vw] rounded-[15px] flex items-center justify-center  "
                onClick={() => handleNumberClick(number.toString())}
              >
                {number}
              </button>
            ))}
            <button
              className="w-[4vw] h-[4vw]  bg-[#FFFFFF] font-[genos] font-[500] text-[#5DC90A] border-dashed border-[#5DC90A]  text-[3vw] rounded-[15px] flex items-center justify-center  "
              onClick={() => {
                /* Submit functionality */
              }}
            >
              ✓
            </button>
            <button
              className="w-[4vw] h-[4vw]  bg-[#BBDDFF] font-[genos] font-[500] text-[#FFFFFF] border-none text-[3vw]  rounded-[15px] flex items-center justify-center  "
              onClick={() => handleNumberClick("0")}
            >
              0
            </button>
            <button
              className="w-[4vw] h-[4vw]  bg-[#FFFFFF  ] font-[genos] font-[500] text-[#FF270E] border-[#FF270E] border-dashed text-[3vw]  rounded-[15px] flex items-center justify-center  "
              onClick={handleBackspaceClick}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
