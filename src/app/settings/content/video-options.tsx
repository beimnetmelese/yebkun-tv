"use client";

import { Options } from "../components/options";

export default function VideoOptionsContent() {
  return (
    <div className="w-[684px] h-[605px] bg-[#F2F2F2] rounded-[15px] py-[15px] px-[20px] overflow-y-auto">
      <h1 className="text-[30px] font-[genos] font-[500] text-[#1C274C] mb-6">
        Video Options
      </h1>

      <div className="space-y-4">
        <Options
          title="AutoPlay"
          description="Play Video and Music automatically"
        />
        <Options
          title="Video Quality"
          description="Choose your preferred video quality"
        />
        <Options title="Subtitle" description="Enable or disable subtitles" />
        <Options title="Language" description="Set your preferred language" />
      </div>
    </div>
  );
}
