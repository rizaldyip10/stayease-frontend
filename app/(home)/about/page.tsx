"use client";
import CTASection from "@/app/(home)/about/_components/CTASection";
import { useRef } from "react";
import Achievements from "@/app/(home)/about/_components/Achievements";
import Teams from "@/app/(home)/about/_components/Teams";

export default function About() {
  const ctaRef = useRef<HTMLDivElement>(null);
  return (
    <div className="about">
      <CTASection ctaRef={ctaRef} />
      <Achievements ref={ctaRef} />
      <Teams />
    </div>
  );
}
