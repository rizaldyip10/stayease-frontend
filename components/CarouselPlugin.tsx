"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface CarouselPluginProps {
  className?: string;
  images: {
    src: string;
    alt: string;
  }[];
}

export function CarouselPlugin({ className, images }: CarouselPluginProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Carousel
      plugins={[plugin.current]}
      className={`carousel relative w-full max-w-xs h-full ${className}`}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-full w-full p-1">
            <div className="h-full w-full">
              <Image
                src={image.src}
                alt={`Slide ${index + 1} - ${image.alt}`}
                width={480}
                height={480}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute  z-20 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full ${index === activeIndex ? "bg-appblue-900" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
