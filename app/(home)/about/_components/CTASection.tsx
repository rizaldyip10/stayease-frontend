import React from "react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  ctaRef: React.RefObject<HTMLDivElement>;
}
const CTASection: React.FC<CTASectionProps> = ({ ctaRef }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto p-10">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">About Us</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              StayEase – your go-to hub for finding the perfect room, studio, or
              apartment, whether you&apos;re traveling for work, vacation, or a
              short stay.
            </h1>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-lg text-gray-600 mb-4">
              Coming to town for a new job, an extended trip, or just a change
              of scenery? We&apos;ve got a variety of places that will suit your
              needs!
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Our mission is to make finding a place to stay smooth and
              stress-free, ensuring that your accommodation search is the
              easiest part of your journey. No hassles, just easy booking and a
              welcoming stay.
            </p>

            <Button
              onClick={() =>
                ctaRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              variant="link"
              className="text-blue-600 p-0"
            >
              Show more ↓
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
