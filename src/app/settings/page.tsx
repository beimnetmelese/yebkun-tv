import Navigation from "@/components/ui/navigation";
import { AppSettingsNav } from "./components/app_settings_nav";
import { RightCard } from "./components/right_card";
import { MiddleCard } from "./components/middle_card";

const Settings = () => {
  return (
    <div className="flex flex-row">
      <Navigation />

      <div className="flex mt-[150px]  p-[10px] items-center justify-center gap-[20px] w-full h-full bg-[#FFFFFF] space-x-[20px]">
        <AppSettingsNav />

        <div className="flex-1">
          <MiddleCard />
        </div>
        <div className="flex-1">
          <RightCard />
        </div>
      </div>
    </div>
  );
};

export default Settings;
