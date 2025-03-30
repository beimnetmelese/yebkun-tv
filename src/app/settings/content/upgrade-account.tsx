"use client";

export default function UpgradeAccountContent() {
  return (
    <div className="w-[684px] h-[605px] bg-[#F2F2F2] rounded-[15px] py-[15px] px-[20px] overflow-y-auto">
      <h1 className="text-[32px] font-genos font-medium text-[#1C274C] mb-6">
        Upgrade Account
      </h1>

      <div className="space-y-4">
        <div className="w-full bg-white rounded-[15px] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#1BC469] text-white px-4 py-1 rounded-bl-[15px] font-genos">
            Current Plan
          </div>

          <h2 className="text-[28px] font-genos font-medium text-[#1C274C] mb-2">
            Free Plan
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-[18px] font-genos text-[#64748B] my-4">
            <li>Basic access to content</li>
            <li>HD Streaming (720p)</li>
            <li>Ads included</li>
            <li>Stream on 1 device at a time</li>
          </ul>

          <button className="w-full bg-[#E2E8F0] text-[#1C274C] py-2 rounded-[10px] font-genos text-[20px] font-medium mt-4">
            Current Plan
          </button>
        </div>

        <div className="w-full bg-white rounded-[15px] p-6 relative overflow-hidden border-2 border-[#1BC469]">
          <div className="absolute top-0 right-0 bg-[#1BC469] text-white px-4 py-1 rounded-bl-[15px] font-genos">
            Recommended
          </div>

          <h2 className="text-[28px] font-genos font-medium text-[#1C274C] mb-2">
            Premium Plan
          </h2>

          <p className="text-[22px] font-genos font-medium text-[#1BC469]">
            $9.99/month
          </p>

          <ul className="list-disc pl-6 space-y-2 text-[18px] font-genos text-[#64748B] my-4">
            <li>Full access to all content</li>
            <li>4K Ultra HD Streaming</li>
            <li>Ad-free experience</li>
            <li>Stream on up to 3 devices</li>
            <li>Offline downloads</li>
            <li>Priority customer support</li>
          </ul>

          <button className="w-full bg-[#1BC469] text-white py-2 rounded-[10px] font-genos text-[20px] font-medium mt-4">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
