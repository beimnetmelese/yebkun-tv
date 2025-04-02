"use client";

import { Options } from "../components/options";

export default function NotificationsContent() {
  return (
    <div className="w-full h-full bg-[#F2F2F2] rounded-[15px] py-[15px] px-[20px] overflow-y-auto">
      <h1 className="text-[30px] font-[genos] font-[500] text-[#1C274C] mb-6">
        Notifications
      </h1>

      <div className="space-y-4">
        <Options
          title="AutoPlay"
          description="Play Video and Music automatically"
        />
        <Options
          title="New Content"
          description="Get notified about new content"
        />
        <Options
          title="Live Streams"
          description="Get notified about live streams"
        />
        <Options
          title="System Updates"
          description="Get notified about system updates"
        />
      </div>
    </div>
  );
}
