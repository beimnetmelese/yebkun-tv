import { Dialog } from "@/components/ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

function ParentCode({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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

  const confirmPin = () => {
    if (pin.join("") === "1234") {
      onClose();
    } else {
      alert("Invalid Parent Code");
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
    <Dialog open={isOpen} onOpenChange={confirmPin}>
      <DialogContent>
        <DialogTitle className="sr-only">Enter Parent Code</DialogTitle>
        <div className="absolute flex flex-col items-center justify-center w-[26%] h-[58%] bg-[#FFFFFF] bottom-[0px] right-[0px] left-[0px]  mx-auto px-[2vw] rounded-[15px] translate-y-[-20%] gap-[20px]">
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
                onClick={() => confirmPin()}
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

          <div className="flex flex-row items-center justify-between bg-[#F2F2F2] w-[100%] h-[10%] rounded-[15px] p-[25px] bottom-[5px]">
            <div className="flex items-center justify-center p-[10px]">
              <Image
                src={"/images/kids/information.svg"}
                alt="information"
                width={70}
                height={82}
              />
            </div>
            <div className="flex flex-col px-[0px] items-center justify-center flex-1">
              <h6 className="text-[#000000] text-[20px] font-[genos] font-[500] text-center w-full m-[0px]">
                Information
              </h6>
              <p className="text-[#000000] font-[genos] f-[500] text-center w-full m-[0px]">
                To extend or adjust the viewing time, please enter your code
                below. Once entered, you can set new limits or allow more time
                for today.
              </p>
            </div>
            <div className="w-[70px]"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ParentCode;
