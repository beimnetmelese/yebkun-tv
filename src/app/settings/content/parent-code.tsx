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

  const handleClearClick = () => {
    setPin(["", "", "", ""]);
    setCurrentIndex(0);
  };

  const handleBackspaceClick = () => {
    if (currentIndex > 0) {
      const newPin = [...pin];
      newPin[currentIndex - 1] = "";
      setPin(newPin);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-[684px] h-[605px] bg-[#F2F2F2] rounded-[15px] py-[15px] px-[20px] overflow-y-auto">
      <h1 className="text-[32px] font-genos font-medium text-[#1C274C] mb-6">
        Parent Code
      </h1>

      <div className="flex flex-col items-center justify-center">
        {/* PIN Display */}
        <div className="flex gap-4 mb-8">
          {pin.map((digit, index) => (
            <div
              key={index}
              className="w-[70px] h-[70px] bg-white rounded-[15px] flex items-center justify-center text-[32px] font-genos font-medium"
            >
              {digit ? "●" : ""}
            </div>
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              className="w-[70px] h-[70px] bg-[#B3DFFF] rounded-[15px] flex items-center justify-center text-[32px] font-genos font-medium text-[#1C274C]"
              onClick={() => handleNumberClick(number.toString())}
            >
              {number}
            </button>
          ))}
          <button
            className="w-[70px] h-[70px] bg-[#8EEA88] rounded-[15px] flex items-center justify-center"
            onClick={() => {
              /* Submit functionality */
            }}
          >
            ✓
          </button>
          <button
            className="w-[70px] h-[70px] bg-[#B3DFFF] rounded-[15px] flex items-center justify-center text-[32px] font-genos font-medium text-[#1C274C]"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>
          <button
            className="w-[70px] h-[70px] bg-[#FF8E8E] rounded-[15px] flex items-center justify-center"
            onClick={handleBackspaceClick}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
