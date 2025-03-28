import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* make the width 941 + 375 + 109 */}
      <DialogContent className="!max-w-screen h-screen bg-transparent">
        <LeftSection />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;

function LeftSection() {
  return (
    <div className="relative w-fit h-fit bg-white rounded-[25px] px-[44px] flex gap-[58px]">
      {/* bg image */}
      <Image
        src={"/images/start_screen/pattern.png"}
        alt={"bg-image"}
        width={1920}
        height={1080}
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      <Image
        src={"/images/start_screen/mobile-mockup.png"}
        alt={"company-logo"}
        width={1920}
        height={1080}
        className="w-[261px] h-[620.5px] object-contain my-[26px] relative z-20 bg-white"
      />

      {/* right section */}
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-[90px] text-[#1C274C]">DOWNLOAD</h1>
        <p className="font-semibold text-[64px] text-[#1C274C]">YEKBÛN APP </p>
      </div>
    </div>
  );
}

function RightSection() {
  return <div className="w-full h-full bg-blue-500"></div>;
}
