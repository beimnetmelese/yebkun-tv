"use client";

import { Options } from "../components/options";

export default function CleanSearchContent() {
  return (
    <div className="w-[684px] h-[605px] bg-[#F2F2F2] rounded-[15px] py-[15px] px-[20px] overflow-y-auto">
      <h1 className="text-[30px] font-[genos] font-[500] text-[#1C274C] mb-6">
        Clean Search
      </h1>

      <div className="space-y-4">
        <Options
          title="Safe Search"
          description="Filter explicit content from search results"
        />
        <Options
          title="Kids Mode"
          description="Show only child-friendly content"
        />
        <Options
          title="Content Filter"
          description="Filter specific content categories"
        />
        <Options
          title="Block Specific Words"
          description="Add words to be blocked"
        />
      </div>
    </div>
  );
}
