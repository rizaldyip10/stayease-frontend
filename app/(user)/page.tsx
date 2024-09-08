import Image from "next/image";
import HeroSection from "@/app/(user)/_components/hero-section/HeroSection";
import PropertySearchBar from "@/components/PropertySearchBar";

export default function Home() {
  return (
    <main className="">
      <HeroSection className="flex flex-col items-center justify-between p-6 md:min-h-[695px] md:max-h-[695px] max-h-[300px]" />
    </main>
  );
}
