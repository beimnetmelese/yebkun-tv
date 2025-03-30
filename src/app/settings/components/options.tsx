import { Buttons } from "./buttons";

export const Options = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-[640px] h-[70px] bg-[#FFFFFF] rounded-[50px] flex items-center justify-between mt-[30px]">
      <div className="flex flex-col ml-[40px] ">
        <p className="text-[26px] p-[0px] m-[0px] font-[genos] font-[500] text-[#1C274C]">
          {title}
        </p>
        <p className="text-[22px] p-[0px] m-[0px] font-[genos] font-[500] text-[#64748B] ">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-[8px] mr-[40px]">
        <Buttons content="Yes" isSuccess={true} />
        <Buttons content="No" isSuccess={false} />
      </div>
    </div>
  );
};
