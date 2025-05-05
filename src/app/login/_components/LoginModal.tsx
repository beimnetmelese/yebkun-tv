"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";

import ParentCode from "@/app/kids/components/parent_code";
import { useRouter } from "next/navigation";
import Zarok from "/public/images/start_screen/zarok_card.svg";
import Malbat from "/public/images/start_screen/malbat.svg";

function LoginModal({
  isOpen,
  onClose,
  initialPopup,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPopup: string | null;
}) {
  const [firstPopup, setFirstPopup] = useState(true);
  const [thirPopup, setThirdPopup] = useState(false);
  const [isParentCodeOpen, setIsParentCodeOpen] = useState(false);
  const handleParentCodeClose = () => {
    setIsParentCodeOpen(false);
  };
  const router = useRouter();

  useEffect(() => {
    if (initialPopup === "thirPopup") {
      setThirdPopup(true);
      setIsParentCodeOpen(false);
      setFirstPopup(false);
    }
  }, [initialPopup]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-none button-none flex items-center justify-center p-0 m-0 bg-transparent border-0 [&>button]:hidden max-w-[95vw] sm:max-w-[95vw] md:max-w-[95vw] lg:max-w-[95vw] xl:max-w-[95vw] w-screen h-screen">
        <DialogTitle className="sr-only">YekBûn App Download</DialogTitle>

        {/* Parent Code before kids section */}
        {isParentCodeOpen && (
          <div className="relative w-full h-full flex items-center justify-center">
            <ParentCode
              isOpen={isParentCodeOpen}
              onClose={handleParentCodeClose}
            />
          </div>
        )}

        {firstPopup && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-[30px] md:gap-[50px] w-full max-w-[95vw] xl:max-w-[1500px] p-4">
            <div className="flex bg-[#FFFFFF] p-[20px] md:p-[44px] rounded-[25px] shadow-lg gap-[20px] md:gap-[40px] min-h-[620px] w-full md:min-w-[880px] lg:min-w-[900px] relative overflow-hidden">
              {/* Background Pattern */}
              <Image
                src="/images/start_screen/pattern.png"
                alt="Background Pattern"
                fill
                priority
                className="object-cover absolute top-0 left-0 rounded-[25px] z-0"
              />

              <div className="flex flex-col md:flex-row z-10 relative w-full">
                {/* Left Side - Phone Mockup */}
                <div className="relative z-[1] shrink-0 flex-none">
                  <Image
                    src="/images/start_screen/mobile-mockup.svg"
                    alt="Phone Mockup"
                    width={261}
                    height={620}
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Right Side - Download Content */}
                <div className="flex flex-col items-center justify-center relative z-[1] mx-[20px] md:mx-[40px] flex-grow">
                  <h1 className="text-[60px] md:text-[90px] font-[600] font-[genos] text-[#1C274C] leading-none p[0px] m-[0px] item-center justify-center">
                    DOWNLOAD
                  </h1>
                  <h2 className="text-[40px] md:text-[64px] font-[500] font-[genos] text-[#1C274C] mb-[20px] md:mb-[32px] m-[0px]">
                    YEKBÛN APP
                  </h2>

                  <div className="flex flex-col md:flex-row gap-[24px] items-center justify-center">
                    {/* App Store */}
                    <div className="flex flex-col items-center justify-start gap-[8px] bg-[#F2F2F2] h-[395px] w-[253px] shrink-0 flex-none">
                      <button className="bg-[#000000] w-full h-[70px] text-[#FFFFFF] px-[4px] py-[4px] rounded-[10px] flex items-center justify-center gap-[12px]">
                        <Image
                          src="/images/home_screen/apple.svg"
                          alt="App Store"
                          width={50}
                          height={50}
                          unoptimized
                        />
                        <div className="flex flex-col justify-center items-start gap-[0px]">
                          <span className="text-[24px] font-[500] font-[genos] leading-none">
                            Download on the
                          </span>
                          <span className="text-[35px] font-[600] font-[oswald] leading-none">
                            App Store
                          </span>
                        </div>
                      </button>

                      <div className="w-full h-[149px] bg-[#FFFFFF] flex items-center justify-center flex-col py-[10px]">
                        <Image
                          src={"/images/logo.svg"}
                          alt="Company logo"
                          width={78}
                          height={78}
                          unoptimized
                        />
                        <p className="font-[genos] text-[32px] font-[500] text-[#1C274C]">
                          YekBûn
                        </p>
                        <p className="font-[genos] text-[18px] font-[400] text-[#101010]">
                          Sosialmedia Kurdî
                        </p>
                      </div>
                      <p className="font-[genos] text-[24px] font-[500] m-[0px]">
                        Download App Now
                      </p>
                      <div className="">
                        <Image
                          src="/images/start_screen/qr.svg"
                          alt="App Store QR"
                          width={105}
                          height={105}
                          className="rounded-[10px]"
                          unoptimized
                        />
                      </div>
                    </div>

                    {/* Google Play */}
                    <div className="flex flex-col items-center gap-[8px] bg-[#F2F2F2] h-[395px] w-[253px] shrink-0 flex-none">
                      <button className="bg-[#000000] text-[#FFFFFF] w-full h-[70px] px-[4px] py-[4px] rounded-[10px] flex items-center justify-center gap-[12px]">
                        <Image
                          src="/images/home_screen/googleplay.png"
                          alt="Google Play"
                          width={45}
                          height={45}
                        />
                        <div className="flex flex-col justify-center items-start gap-[0px]">
                          <span className="text-[24px] font-[500] font-[genos] leading-none">
                            Get it on
                          </span>
                          <span className="text-[35px] font-[600] font-[oswald] leading-none">
                            Google Play
                          </span>
                        </div>
                      </button>
                      <div className="w-full h-[149px] bg-[#FFFFFF] flex items-center justify-center flex-col py-[10px]">
                        <Image
                          src={"/images/logo.svg"}
                          alt="Company logo"
                          width={78}
                          height={78}
                          unoptimized
                        />
                        <p className="font-[genos] text-[32px] font-[500] text-[#1C274C]">
                          YekBûn
                        </p>
                        <p className="font-[genos] text-[18px] font-[400] text-[#101010]">
                          Sosialmedia Kurdî
                        </p>
                      </div>
                      <p className="font-[genos] text-[24px]  font-[500] m-[0px]">
                        Download App Now
                      </p>
                      <Image
                        src="/images/start_screen/googleqr.svg"
                        alt="Play Store QR"
                        width={105}
                        height={105}
                        className="rounded-[10px]"
                        unoptimized
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFirstPopup(false);
                      setThirdPopup(true);
                    }}
                    className="w-[295px] h-[50px] border-none mt-[32px] px-[24px] py-[12px] bg-[#22C55E] font-[genos] text-[#FFFFFF] text-[28px] font-[500] rounded-[30px] hover:bg-[#16A34A] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
            {/* Second Popup - Activate TV */}
            <div className="bg-[#FFFFFF] p-[20px] md:p-[42px] rounded-[25px] shadow-lg flex flex-col items-center w-full md:min-w-[480px] md:w-[400px] min-h-[700px]">
              <div className="flex flex-col items-center gap-[24px] mb-[32px]">
                <Image
                  src="/images/start_screen/activate.svg"
                  alt="YekBûn Logo"
                  width={298}
                  height={290}
                  className="rounded-[10px]"
                  unoptimized
                />
                <div className="flex flex-col h-[156px] w-[172px] items-center justify-center bg-[#F2F2F2] rounded-[15px]">
                  <Image
                    src={"/images/start_screen/tv.svg"}
                    alt="tv"
                    width={71}
                    height={53}
                    unoptimized
                  />
                  <div className="bg-[#FFFFFF] w-[124px] h-[23px] p-[4px] rounded-[10px] mt-[10px] flex items-center justify-center">
                    <p className="flex items-center justify-center font-[genos] text-[18px] font-[600] m-[0px]">
                      Tv Type
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] w-[124px] h-[23px] p-[4px] rounded-[10px] mt-[10px] flex items-center justify-center">
                    <p className="flex items-center justify-center font-[genos] text-[16px] font-[400]">
                      MAC ADDRESS
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[16px] mb-[32px]">
                <div className="flex fex-row">
                  <Image
                    src={"/images/start_screen/device_id.svg"}
                    alt="tv"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <span className="ml-[10px] text-[24px] font-[500] font-[genos] text-[c#1C274C] m-[0px] flex items-F8F8F8start justify-start">
                    DEVICE ID
                  </span>
                </div>
                <div className="flex gap-[8px] text-[32px] font-bold">
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F2F2F2] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F2F2F2] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F2F2F2] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F2F2F2] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px] text-[#1EC981]">
                      -
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F2F2F2] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F2F2F2] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F2F2F2] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                </div>
              </div>
              <div
                onClick={() => {
                  setFirstPopup(false);
                  setThirdPopup(true);
                }}
                className="flex flex-row items-center justify-start w-full h-[70px] bg-[#F2F2F2] px-[10px] rounded-[15px] cursor-[pointer]"
              >
                <span className="bg-[#FFFFFF]">
                  <Image
                    src={"/images/start_screen/thunder.svg"}
                    alt="activate icon"
                    width={33}
                    height={33}
                    unoptimized
                  />
                </span>
                <span className="flex flex-col items-center justify-center px-[6  px] ml-[15px] py-[30px]">
                  <p className="font-[genos] font-[500] m-[0px] text-[20px]">
                    ACTIVATE YOUR TV APP
                  </p>
                  <p className="font-[genos] font-[500] text-[14px] ">
                    To get started, simply add this to your YekBûn App
                  </p>
                </span>
              </div>
            </div>
          </div>
        )}

        {thirPopup && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="w-auto h-auto">
              <div className="flex flex-row gap-14">
                <div className="bg-white rounded-t-[50px] rounded-b-[20px] pb-4 flex flex-col items-center w-[400px]">
                  <div className="w-full border-none">
                    <Zarok />
                  </div>
                  <div className="mt-2 mb-4">
                    <Image
                      src={"/images/start_screen/zarok_text.png"}
                      alt="Zarok"
                      width={340}
                      height={101}
                      className="h-auto w-auto"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setFirstPopup(false);
                      setThirdPopup(false);
                      setIsParentCodeOpen(true);
                    }}
                    className="w-[295px] h-[50px] border-none px-[24px] py-[12px] bg-[#22C55E] font-[genos] text-[#FFFFFF] text-[28px] font-[500] rounded-[30px] hover:bg-[#16A34A] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Start Now
                  </button>
                </div>

                <div className="bg-white rounded-t-[50px] rounded-b-[20px] pb-4 flex flex-col items-center w-[400px]">
                  <div className="w-full">
                    <Malbat />
                  </div>
                  <div className="mt-2 mb-4">
                    <Image
                      src={"/images/start_screen/malbat_text.png"}
                      alt="Malbat image"
                      width={340}
                      height={101}
                      className="h-auto w-auto"
                    />
                  </div>
                  <button
                    onClick={() => router.push("/adult")}
                    className="w-[295px] h-[50px] border-none px-[24px] py-[12px] bg-[#22C55E] font-[genos] text-[#FFFFFF] text-[28px] font-[500] rounded-[30px] hover:bg-[#16A34A] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
