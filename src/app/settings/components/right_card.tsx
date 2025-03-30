import { UserInfo } from "@/utils/dummy_data";
import Image from "next/image";

export const RightCard = ({
  settingImage,
  userInfo,
}: {
  settingImage: string;
  userInfo: UserInfo;
}) => {
  return (
    <div className="w-[360px] h-[605px] bg-[#F2F2F2] rounded-[15px] py-[10px] px-[12px] flex flex-col items-center gap-[15px]">
      {/* Top Image Section */}
      <div className="w-[335px] h-[277px] bg-[#FFFFFF] rounded-[15px] flex items-center justify-center">
        <Image
          src={settingImage}
          alt="Settings Illustration"
          width={252}
          height={187}
          className="object-contain"
        />
      </div>

      {/* User Profile Section */}
      <div className="w-[335px] h-[151px] bg-[#FFFFFF] rounded-[15px] flex flex-col items-center justify-center">
        <Image
          src={userInfo.userImage}
          alt="User Profile"
          width={75}
          height={75}
          className="mb-[1px]"
        />
        <p className="text-[24px] font-[genos] text-[#1C274C] font-[500] m-[0px] p-[0px]">
          {userInfo.name}
        </p>
        <div className="flex items-center justify-center mt-1">
          <div className="flex flex-row items-center gap-1">
            <span className="w-[3px] h-[3px] bg-[#1C274C] rounded-full mr-[4px]"></span>
            <Image src={userInfo.flag1} alt="Flag" width={15} height={15} className="rounded-full mr-[4px]" />
            <span className="w-[3px] h-[3px] bg-[#1C274C] rounded-full mr-[4px]"></span>
            <span className="text-[18px] font-[genos] text-[#1C274C] font-[500] mr-[4px]">
              {userInfo.country}
            </span>
            <span className="w-[3px] h-[3px] bg-[#1C274C] rounded-full mr-[4px]" ></span>
            <span className="text-[18px] font-[genos] text-[#1C274C] mr-[4px]">
              {userInfo.city1}
            </span>
            <span className="w-[3px] h-[3px] bg-[#1C274C] rounded-full mr-[4px]"></span>
            <Image src={userInfo.flag2} alt="Flag" width={15} height={15} className="rounded-full mr-[4px]" />
            <span className="text-[18px] font-[genos] text-[#1C274C] mr-[4px]">
              {userInfo.city2}
            </span>
            <span className="w-[3px] h-[3px] bg-[#1C274C] rounded-full mr-[4px]"></span>
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div className="w-[335px] h-[127px] bg-[#FFFFFF] rounded-[15px] flex flex-col items-center justify-center gap-3">
        {/* Medal & Status */}
        <div className="flex items-center justify-center border-[1px] border-[#F2F2F2] w-[130px] h-[52px] rounded-[15px]">
          <div className="flex relative px-[4px">
            <Image
              src="/userinfo/medal.png"
              alt="Medal"
              width={30}
              height={37}
              className="mr-3"
            />
            <div className="flex flex-col pl-[10px]">
              <p className="text-[12px] font-[genos] text-[#1C274C] m-[0px] p-[0px] leading-tight">
                currently
              </p>
              <p className="text-[16px] font-[genos] text-[#1C274C] font-[500] m-[0px] p-[0px] leading-tight">
                {userInfo.status}
              </p>
            </div>
            <div className="absolute top-0 right-[-8px] w-[7.5px] h-[7.5px] bg-[#1BC469] rounded-full"></div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center w-[310px] h-[48px] rounded-[15px] border-[1px] border-[#F2F2F2] overflow-hidden mt-[10px]">
          {/* User Image */}
          <div className="h-full">
            <Image
              src={userInfo.userImage}
              alt="User Profile"
              width={80}
              height={48}
              className="rounded-l-[20px] object-cover"

            />
          </div>

          <div className="flex flex-1 h-full items-center">
            {/* User Name & ID */}
            <div className="flex flex-col justify-center ml-[12px] min-w-[100px]">
              <p className="text-[12px] font-[genos] text-[#1C274C] m-[0px] p-[0px] leading-tight">
                {userInfo.name}
              </p>
              <p className="text-[12px] font-[genos] text-[#64748B] m-[0px] p-[0px] leading-tight">
                {userInfo.id}
              </p>
            </div>

            {/* Divider */}
            <div className="w-[1px] h-[60%] bg-[#E2E8F0] self-center mx-3"></div>

            {/* Membership Info */}
            <div className="flex flex-col justify-center ml-[12px]">
              <p className="text-[12px] font-[genos] text-[#1C274C] m-[0px] p-[0px] leading-tight">
                Member since
              </p>
              <p className="text-[12px] font-[genos] text-[#64748B] m-[0px] p-[0px] leading-tight">
                {userInfo.memeber_since}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
