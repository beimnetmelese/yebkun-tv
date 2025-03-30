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
    <div className="w-full h-[60px] bg-white rounded-[15px] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          className={`w-6 h-6 rounded-full ${
            active ? "bg-[#1BC469]" : "bg-[#E2E8F0]"
          }`}
          onClick={onToggle}
        />
        <span className="text-[22px] font-genos font-medium text-[#1C274C]">
          {day}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          className={`px-4 py-1 rounded-[20px] text-[18px] font-genos ${
            hasLimit
              ? "bg-[#1BC469] text-white"
              : "bg-white text-[#64748B] border border-[#64748B]"
          }`}
          onClick={onLimitToggle}
        >
          {hasLimit ? "Limit" : "No Limit"}
        </button>

        {active && (
          <>
            <span className="text-[18px] font-genos text-[#1C274C]">-</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={startHour}
                onChange={(e) => onStartHourChange(e.target.value)}
                className="w-[40px] h-[30px] bg-white border border-[#64748B] rounded-[8px] text-center text-[18px] font-genos"
              />
              <button className="w-[24px] h-[24px] bg-[#E2E8F0] rounded-full flex items-center justify-center text-[14px]">
                +
              </button>
            </div>
            <span className="text-[18px] font-genos text-[#1C274C]">-</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={endHour}
                onChange={(e) => onEndHourChange(e.target.value)}
                className="w-[40px] h-[30px] bg-white border border-[#64748B] rounded-[8px] text-center text-[18px] font-genos"
              />
              <button className="w-[24px] h-[24px] bg-[#E2E8F0] rounded-full flex items-center justify-center text-[14px]">
                +
              </button>
            </div>
          </>
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
      hasLimit: day === "Sunday" || day === "Friday",
      startHour: day === "Thursday" ? "05" : "01",
      endHour: day === "Thursday" ? "30" : "15",
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
      <h1 className="text-[32px] font-genos font-medium text-[#1C274C] mb-6">
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
