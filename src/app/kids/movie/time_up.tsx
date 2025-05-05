"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface TimeUpProps {
  open: boolean;
  onTimeSet?: (minutes: number) => void;
}

function TimeUp({ open, onTimeSet }: TimeUpProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isShowModal, setIsShowModal] = useState({
    time_up: true,
    parent_code: false,
    parent_code_success: false,
  });
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  // Reset modal state when dialog is opened
  useEffect(() => {
    if (open) {
      setIsShowModal({
        time_up: true,
        parent_code: false,
        parent_code_success: false,
      });
      setSelectedTime(null);

      // Play audio immediately when modal opens
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  }, [open]);

  useEffect(() => {
    // Set timeout for redirect
    if (open) {
      timeoutRef.current = setTimeout(() => {
        // Redirect to login page with modal open and thirPopup
        router.push("/login?modal=true&popup=thirPopup");
      }, 30000); // 30 seconds
    }
    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
    };
  }, [isShowModal.time_up, isShowModal, open,router]);

  const handleShowModal = (modal: keyof typeof isShowModal) => {
    setIsShowModal((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handleCloseModal = (modal: keyof typeof isShowModal) => {
    setIsShowModal((prev) => ({ ...prev, [modal]: false }));
  };

  const handleTimeSelection = (minutes: number) => {
    setSelectedTime(minutes);
  };

  const confirmTimeSelection = () => {
    if (selectedTime && onTimeSet) {
      onTimeSet(selectedTime);
      // Reset modal state
      setIsShowModal({
        time_up: false,
        parent_code: false,
        parent_code_success: false,
      });
      setSelectedTime(null);
    }
  };

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
      handleCloseModal("parent_code");
      handleShowModal("parent_code_success");
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

  // Determine dialog size class based on active modal
  const getDialogSizeClass = () => {
    if (isShowModal.time_up) {
      return "w-auto max-w-xl";
    } else if (isShowModal.parent_code) {
      return "w-auto max-w-md";
    } else if (isShowModal.parent_code_success) {
      return "w-auto max-w-3xl";
    }
    return "w-auto";
  };

  return (
    <Dialog open={open}>
      <DialogTitle className="sr-only">Time Up</DialogTitle>
      <DialogContent
        className={`${getDialogSizeClass()} bg-white p-6 rounded-xl [&>button]:hidden border-none shadow-lg overflow-auto max-h-[90vh] transform-gpu transition-all duration-200`}
      >
        {open && (
          <audio
            ref={audioRef}
            src="/images/kids/back.mp3"
            preload="auto"
            autoPlay
            className="hidden"
          />
        )}
        {isShowModal["time_up"] && (
          <div className="flex flex-col items-center justify-center rounded-lg py-[8px]">
            <Image
              src={"/images/kids/break.svg"}
              alt="break icon"
              width={438}
              height={365}
              loading="eager"
              quality={90}
              priority
            />

            <div className="flex flex-row w-full h-[20%] rounded-none rounded-l-full rounded-r-[20px] bg-[#F2F2F2] px-2 py-4">
              <Image
                src={"/images/kids/break/time_Up.svg"}
                alt="time up icon"
                width={70}
                height={70}
                loading="eager"
                quality={90}
                unoptimized
              />
              <span className="flex flex-col items-center justify-center ml-4">
                <p className="text-black text-[22px] font-[500] font-[genos]">
                  Time for a Break
                </p>
                <p className="text-black text-[16px] font-[500] font-[genos] flex items-center justify-center">
                  We had a great time today! Now it&apos;s time to take a break.
                  We&apos;ll see you tomorrow for more fun. See you soon!
                </p>
              </span>
            </div>

            <div
              onClick={() => {
                handleCloseModal("time_up");
                handleShowModal("parent_code");
              }}
              className="flex items-center justify-center bg-[#67ACDB] px-4 py-2 rounded-lg mt-4 cursor-pointer hover:bg-[#5596c5] transition-colors"
            >
              <p className="text-white text-[20px] font-[500] font-[genos]">
                Need more Time ?
              </p>
            </div>
          </div>
        )}

        {isShowModal["parent_code"] && (
          <div className="relative bg-white rounded-[15px] flex flex-col items-center justify-center w-full h-full">
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
              <div className="flex flex-col px-[0px] items-center justify-center">
                <h6 className="text-[#000000] text-lg font-[genos] font-[500] text-center w-full m-[0px]">
                  Information
                </h6>
                <p className="text-[#000000] font-[genos] text-sm text-center w-full m-[0px]">
                  To extend or adjust the viewing time, please enter your code
                  below. Once entered, you can set new limits or allow more time
                  for today.
                </p>
              </div>
              <div className="w-[50px]"></div>
            </div>
          </div>
        )}
        {isShowModal["parent_code_success"] && (
          <div className="flex flex-col items-center justify-center rounded-lg py-[8px] gap-4">
            <h3 className="text-2xl font-bold mb-2">Select Additional Time</h3>
            <div className="grid grid-cols-4 gap-4">
              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map(
                (minutes) => (
                  <button
                    key={minutes}
                    onClick={() => handleTimeSelection(minutes)}
                    className={`flex flex-col ${
                      selectedTime === minutes
                        ? "bg-blue-100 border-2 border-[#67ACDB]"
                        : "bg-[#F2F2F2] hover:bg-[#e5e5e5]"
                    } rounded-[15px] w-[100px] h-[100px] items-center justify-center transition-colors`}
                  >
                    <Image
                      src={`/images/kids/break/${minutes}_min.svg`}
                      alt={`${minutes} min`}
                      width={70}
                      height={70}
                      loading="eager"
                      quality={80}
                      unoptimized
                    />
                    <span className="text-sm font-medium mt-1">
                      {minutes} min
                    </span>
                  </button>
                )
              )}
            </div>
            <div className="flex flex-row items-center justify-center gap-2 mt-4">
              <div>
                <Image
                  src={"/images/kids/information.svg"}
                  alt="information"
                  width={50}
                  height={50}
                  loading="eager"
                  quality={90}
                  unoptimized
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h6 className="text-[#000000] text-lg font-[genos] font-[500] text-center w-full m-[0px]">
                  Information
                </h6>
                <p className="text-sm text-black font-[genos]">
                  Children shouldn&apos;t watch TV for more than an hour at a
                  time. Regular breaks are important for their health and focus.
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={confirmTimeSelection}
                disabled={selectedTime === null}
                className={`bg-[#67ACDB] text-white px-8 py-2 rounded-[15px] ${
                  selectedTime === null
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#5596c5] cursor-pointer"
                } transition-colors mt-4`}
              >
                Set the Time
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TimeUp;
