import Navigation from "@/components/ui/navigation";

export default function ChefChannel() {
  return (
    <>
      <Navigation active="stream" />
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#0c0c0c] via-[#1a1a1a] to-[#2f2f2f]">
        {/* Your content here */}
        <img
          src="/images/adults/stream.jpg"
          alt="background"
          className="w-689 h-578 object-cover object-top"
        />
      </div>
    </>
  );
}
