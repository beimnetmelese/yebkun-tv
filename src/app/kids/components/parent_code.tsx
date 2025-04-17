import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ParentCode({ onClose }: { isOpen?: boolean; onClose: () => void }) {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
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
      router.push("/kids");
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
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative bg-white rounded-[15px] shadow-lg flex flex-col items-center justify-center w-[500px] py-8 px-6">
        <div className="flex flex-col items-center justify-center w-full">
          {/* PIN Display */}
          <div className="flex gap-4 mb-8 items-center justify-center">
            {pin.map((digit, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-[#F2F2F2] rounded-lg flex items-center justify-center text-[32px] font-[genos] font-medium"
              >
                {digit ? "●" : ""}
              </div>
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button
                key={number}
                className="w-16 h-16 bg-[#BBDDFF] font-[genos] font-[500] text-[#FFFFFF] border-none text-[52px] rounded-[15px] flex items-center justify-center"
                onClick={() => handleNumberClick(number.toString())}
              >
                {number}
              </button>
            ))}
            <div
              onClick={confirmPin}
              className="w-16 h-16 bg-[#FFFFFF] font-[genos] font-[500] text-[#5DC90A] border-dashed border-[#5DC90A] text-3xl rounded-[15px] flex items-center justify-center cursor-pointer"
            >
              <Image
                src={"/images/start_screen/right.svg"}
                alt="check"
                width={68}
                height={68}
                unoptimized
              />
            </div>
            <button
              key={0}
              className="w-16 h-16 bg-[#BBDDFF] font-[genos] font-[500] text-[52px] text-[#FFFFFF] border-none rounded-[15px] flex items-center justify-center cursor-pointer"
              onClick={() => handleNumberClick("0")}
            >
              0
            </button>
            {/* Backspace */}
            <div
              onClick={handleBackspaceClick}
              className="w-16 h-16 bg-[#FFFFFF] font-[genos] font-[500] text-[#FF270E] border-[#FF270E] border-dashed text-3xl rounded-[15px] flex items-center justify-center cursor-pointer"
            >
              <Image
                src={"/images/start_screen/back.svg"}
                alt="check"
                width={68}
                height={68}
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between bg-[#F2F2F2] w-full rounded-[15px] p-2">
          <div className="flex items-center justify-center p-2 ">
            <Image
              src={"/images/kids/information.svg"}
              alt="information"
              width={130}
              height={130}
              unoptimized
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h6 className="text-[#000000] text-lg font-[genos] font-[500] text-center w-full m-0">
              Information
            </h6>
            <p className="text-[#000000] font-[genos] font-[500] text-center w-full m-0 text-sm">
              To extend or adjust the viewing time, please enter your code
              below. Once entered, you can set new limits or allow more time for
              today.
            </p>
          </div>
          <div className="w-[50px]"></div>
        </div>
      </div>
    </div>
  );
}

export default ParentCode;
