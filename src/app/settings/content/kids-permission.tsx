"use client";

import { useState } from "react";

interface DaySettingProps {
  day: string;
  active: boolean;
  hasLimit: boolean;
  startHour: string;
  endHour: string;
  onToggle: () => void;
  onLimitToggle: () => void;
  onStartHourChange: (value: string) => void;
  onEndHourChange: (value: string) => void;
}

const DaySetting = ({
  day,
  active,
  hasLimit,
  startHour,
  endHour,
  onToggle,
  onLimitToggle,
  onStartHourChange,
  onEndHourChange,
}: DaySettingProps) => {
  return (
    <div className="w-[600px] h-[60px] bg-[#FFFFFF] rounded-[15px] flex items-center justify-between px-[24px] mt-[15px]">
      <div className="flex items-center gap-[16px]">
        <button
          className={`w-[24px] h-[24px] rounded-full border-none ${
            active ? "bg-[#22C55E]" : "bg-[#E2E8F0]"
          }`}
          onClick={onToggle}
        />
        <span className="text-[22px] font-[genos] font-[500] text-[#1C274C]">
          {day}
        </span>
      </div>

      <div className="flex items-center gap-[16px]">
        <div className="flex gap-[8px]">
          <button
            className={`px-[16px] py-[4px] rounded-[20px] text-[16px] font-[genos] border-none ${
              hasLimit
                ? "bg-[#E2E8F0] text-[#64748B]"
                : "bg-[#22C55E] text-[#FFFFFF]"
            }`}
            onClick={onLimitToggle}
          >
            Limit
          </button>
          <button
            className={`px-[16px] py-[4px] rounded-[20px] text-[16px] font-[genos] border-none ${
              !hasLimit
                ? "bg-[#E2E8F0] text-[#64748B]"
                : "bg-[#22C55E] text-[#FFFFFF]"
            }`}
            onClick={onLimitToggle}
          >
            No Limit
          </button>
        </div>

        {active && (
          <div className="flex items-center gap-[8px]">
            <span className="flex items-center gap-[8px] bg-[#F1F5F9] rounded-[15px] px-[10px]">
              <button className="w-[24px] h-[24px] bg-[#FFFFFF] rounded-full flex items-center justify-center text-[16px] text-[#64748B] border-none">
                -
              </button>
              <div className="w-[40px] h-[30px] bg-[#F1F5F9] rounded-[8px] flex items-center justify-center border-none">
                <input
                  type="text"
                  value={startHour}
                  onChange={(e) => onStartHourChange(e.target.value)}
                  className="w-full h-full bg-transparent text-center text-[16px] font-[genos] text-[#1C274C] border-none"
                />
              </div>
              <button className="w-[24px] h-[24px] bg-[#FFFFFF] rounded-full flex items-center justify-center text-[16px] text-[#64748B] border-none">
                +
              </button>
            </span>

            <span className="text-[25px] font-[600] font-[genos] text-[#00000099]">
              :
            </span>
            <span className="flex items-center gap-[8px] bg-[#F1F5F9] rounded-[15px] px-[10px]">
              <button className="w-[24px] h-[24px] bg-[#FFFFFF] rounded-full flex items-center justify-center text-[16px] text-[#64748B] border-none">
                -
              </button>
              <div className="w-[40px] h-[30px] bg-[#F1F5F9] rounded-[8px] flex items-center justify-center">
                <input
                  type="text"
                  value={endHour}
                  onChange={(e) => onEndHourChange(e.target.value)}
                  className="w-full h-full bg-transparent text-center text-[16px] font-[genos] text-[#1C274C] border-none"
                />
              </div>
              <button className="w-[24px] h-[24px] bg-[#FFFFFF] rounded-full flex items-center justify-center text-[16px] text-[#64748B] border-none">
                +
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function KidsPermissionContent() {
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const [daySettings, setDaySettings] = useState(
    days.map((day) => ({
      day,
      active: day === "Sunday" || day === "Thursday" || day === "Friday",
      hasLimit:
        day === "Sunday" ||
        day === "Friday" ||
        day === "Thursday" ||
        day === "Tuesday" ||
        day === "Wednesday" ||
        day === "Monday",
      startHour:
        day === "Thursday"
          ? "05"
          : day === "Monday"
          ? "01"
          : day === "Sunday"
          ? "00"
          : day === "Tuesday"
          ? "00"
          : day === "Wednesday"
          ? "00"
          : "00",
      endHour:
        day === "Thursday"
          ? "30"
          : day === "Monday"
          ? "15"
          : day === "Tuesday"
          ? "10"
          : day === "Wednesday"
          ? "12"
          : day === "Sunday"
          ? "00"
          : day === "Friday"
          ? "00"
          : "00",
    }))
  );

  const toggleDayActive = (index: number) => {
    const newSettings = [...daySettings];
    newSettings[index].active = !newSettings[index].active;
    setDaySettings(newSettings);
  };

  const toggleDayLimit = (index: number) => {
    const newSettings = [...daySettings];
    newSettings[index].hasLimit = !newSettings[index].hasLimit;
    setDaySettings(newSettings);
  };

  const updateStartHour = (index: number, value: string) => {
    const newSettings = [...daySettings];
    newSettings[index].startHour = value;
    setDaySettings(newSettings);
  };

  const updateEndHour = (index: number, value: string) => {
    const newSettings = [...daySettings];
    newSettings[index].endHour = value;
    setDaySettings(newSettings);
  };

  return (
    <div className="w-[684px] h-[605px] bg-[#F2F2F2] rounded-[15px] py-[15px] px-[20px] overflow-y-auto">
      <h1 className="text-[30px] font-[genos] font-[500] text-[#1C274C] mb-6">
        Kids Permission
      </h1>

      <div className="space-y-4">
        {daySettings.map((setting, index) => (
          <DaySetting
            key={setting.day}
            day={setting.day}
            active={setting.active}
            hasLimit={setting.hasLimit}
            startHour={setting.startHour}
            endHour={setting.endHour}
            onToggle={() => toggleDayActive(index)}
            onLimitToggle={() => toggleDayLimit(index)}
            onStartHourChange={(value) => updateStartHour(index, value)}
            onEndHourChange={(value) => updateEndHour(index, value)}
          />
        ))}
      </div>
    </div>
  );
}
