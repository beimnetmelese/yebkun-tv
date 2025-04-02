"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

import { useRouter } from "next/navigation";

function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [firstPopup, setFirstPopup] = useState(true);
 
  const [thirPopup, setThirdPopup] = useState(false);

  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="border-none button-none flex items-center justify-center p-[0px] m-[0px] bg-transparent border-[none] [&>button]:hidden">
        <DialogTitle className="sr-only">YekBûn App Download</DialogTitle>
        {firstPopup && (
          <div className="flex flex-row items-center justify-center gap-[70px] h-[672px]">
            
            <div className="flex bg-[#FFFFFF] p-[44px] rounded-[25px] shadow-lg gap-[58px] h-[full] relative">
              {/* Background Pattern */}
              <Image
                src="/images/start_screen/pattern.png"
                alt="Background Pattern"
                fill
                priority
                className="object-cover absolute top-0 left-0 rounded-[25px]"
              />

              <div className="flex flex-row">
                {/* Left Side - Phone Mockup */}
                <div className="relative z-[1]">
                  <Image
                    src="/images/start_screen/mobile-mockup.png"
                    alt="Phone Mockup"
                    width={261}
                    height={620}
                    className="object-contain"
                  />
                </div>

                {/* Right Side - Download Content */}
                <div className="flex flex-col items-center justify-center relative z-[1] mx-[40px]">
                  <h1 className="text-[90px] font-[600] font-[genos] text-[#1C274C] leading-none p[0px] m-[0px] item-center justify-center">
                    DOWNLOAD
                  </h1>
                  <h2 className="text-[64px] font-[500] font-[genos] text-[#1C274C] mb-[32px] m-[0px]">
                    YEKBÛN APP
                  </h2>

                  <div className="flex flex-row gap-[24px] items-center justify-center">
                    {/* App Store */}
                    <div className="flex flex-col items-center justify-start gap-[8px] bg-[#F2F2F2] h-[395px] w-[253px]">
                      <button className="bg-[#000000] w-full h-[70px] text-[#FFFFFF] px-[4px] py-[4px] rounded-[10px] flex items-center justify-center gap-[12px]">
                        <Image
                          src="/images/home_screen/apple.png"
                          alt="App Store"
                          width={50}
                          height={50}
                        />
                        <div className="flex flex-col justify-center items-start">
                          <span className="text-[18px] font-[500] ">
                            Download on the
                          </span>
                          <span className="text-[30px] font-[600]">
                            App Store
                          </span>
                        </div>
                      </button>
                      <div className="w-full h-[149px] bg-[#FFFFFF] flex items-center justify-center">
                        <Image
                          src={"/images/logo.png"}
                          alt="Company logo"
                          width={168}
                          height={132}
                        />
                      </div>
                      <p className="font-[genos] text-[24px] font-[500] m-[0px]">
                        Download App Now
                      </p>
                      <Image
                        src="/images/start_screen/qr.png"
                        alt="App Store QR"
                        width={120}
                        height={120}
                        className="rounded-[10px]"
                      />
                    </div>

                    {/* Google Play */}
                    <div className="flex flex-col items-center gap-[8px] bg-[#F2F2F2] h-[395px] w-[253px]">
                      <button className="bg-[#000000] text-[#FFFFFF] w-full h-[70px] px-[4px] py-[4px] rounded-[10px] flex items-center justify-center gap-[12px]">
                        <Image
                          src="/images/home_screen/googleplay.png"
                          alt="Google Play"
                          width={45}
                          height={45}
                        />
                        <div className="flex flex-col justify-start items-start">
                          <span className="text-[18px] font-[500]">
                            Get it on
                          </span>
                          <span className="text-[30px] font-[600]">
                            Google Play
                          </span>
                        </div>
                      </button>
                      <div className="w-full h-[149px] bg-[#FFFFFF] flex items-center justify-center">
                        <Image
                          src={"/images/logo.png"}
                          alt="Company logo"
                          width={168}
                          height={132}
                        />
                      </div>
                      <p className="font-[genos] text-[24px] font-[500] m-[0px]">
                        Download App Now
                      </p>
                      <Image
                        src="/images/start_screen/qr.png"
                        alt="Play Store QR"
                        width={120}
                        height={120}
                        className="rounded-[10px]"
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
            <div className="bg-[#FFFFFF] p-[42px] rounded-[25px] shadow-lg flex flex-col items-center w-[375px] h-[full]">
              <div className="flex flex-col items-center gap-[24px] mb-[32px]">
                <Image
                  src="/images/start_screen/activate.png"
                  alt="YekBûn Logo"
                  width={298}
                  height={290}
                  className="rounded-[10px]"
                />
                <div className="flex flex-col h-[156px] w-[172px] items-center justify-center bg-[#F2F2F2] rounded-[15px]">
                  <Image
                    src={"/images/start_screen/tv.png"}
                    alt="tv"
                    width={71}
                    height={53}
                  />
                  <div className="bg-[#FFFFFF] w-[124px] h-[23px] p-[4px] rounded-[10px] mt-[10px]">
                    <p className="flex items-center justify-center font-[genos] text-[18px] font-[600] m-[0px]">
                      Tv Type
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] w-[124px] h-[23px] p-[4px] rounded-[10px] mt-[10px]">
                    <p className="flex items-center justify-center font-[genos] text-[16px] font-[400] m-[0px]">
                      MAC ADDRESS
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[16px] mb-[32px]">
                <div className="flex fex-row">
                  <Image
                    src={"/images/start_screen/device_id.png"}
                    alt="tv"
                    width={24}
                    height={24}
                  />
                  <span className="ml-[10px] text-[24px] font-[500] font-[genos] text-[c#1C274C] m-[0px] flex items-start justify-start">
                    DEVICE ID
                  </span>
                </div>
                <div className="flex gap-[8px] text-[32px] font-bold">
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F8F8F8] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F8F8F8] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F8F8F8] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F8F8F8] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px] text-[#1EC981]">
                      -
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F8F8F8] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F8F8F8] rounded-[8px]">
                    <p className="font-[genos] font-[600] text-[48px] m-[0px]">
                      4
                    </p>
                  </span>
                  <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#F8F8F8] rounded-[8px]">
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
                className="flex flex-row items-center justify-start w-full h-[53px] bg-[#F2F2F2] px-[10px] rounded-[15px] cursor-[pointer]"
              >
                <span className="bg-[#FFFFFF]">
                  <Image
                    src={"/images/start_screen/thunder.png"}
                    alt="activate icon"
                    width={40}
                    height={40}
                  />
                </span>
                <span className="flex flex-col items-center justify-center px-[10px] ml-[15px]">
                  <p className="font-[genos] font-[500] m-[0px] text-[20px]">
                    ACTIVATE YOUR TV APP
                  </p>
                  <p className="font-[genos] font-[500] m-[0px] text-[14px]">
                    To get started, simply add this to your YekBûn App
                  </p>
                </span>
              </div>
            </div>
          </div>
        )}

        {thirPopup && (
          <div className="flex flex-row gap-[100px] items-center justify-center">
            <div className="bg-[#FFFFFF] rounded-[25px] shadow-lg flex flex-col items-center w-[375px] h-[560px]">
              <span>
                <Image
                  src={"/images/start_screen/zarok_card.png"}
                  alt="Zarok image"
                  width={375}
                  height={375}
                />
              </span>
              <span>
                <Image
                  src={"/images/start_screen/zarok_text.png"}
                  alt="Zarok"
                  width={340}
                  height={101}
                />
              </span>
              <button
                onClick={() => router.push("/kids ")}
                className="w-[295px] h-[50px] border-none px-[24px] py-[12px] bg-[#22C55E] font-[genos] text-[#FFFFFF] text-[28px] font-[500] rounded-[30px] hover:bg-[#16A34A] transition-colors flex items-center justify-center cursor-pointer"
              >
                Start Now
              </button>
            </div>
            <div className="bg-[#FFFFFF] rounded-[25px] shadow-lg flex flex-col items-center w-[375px] h-[560px]">
              <span>
                <Image
                  src={"/images/start_screen/malbat.png"}
                  alt="Zarok image"
                  width={375}
                  height={375}
                />
              </span>
              <span>
                <Image
                  src={"/images/start_screen/malbat_text.png"}
                  alt="Malbat image"
                  width={340}
                  height={101}
                />
              </span>
              <button
                onClick={() => router.push("/adult")}
                className="w-[295px] h-[50px] border-none  px-[24px] py-[12px] bg-[#22C55E] font-[genos] text-[#FFFFFF] text-[28px] font-[500] rounded-[30px] hover:bg-[#16A34A] transition-colors flex items-center justify-center cursor-pointer"
              >
                Start Now
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
