"use client";
import * as React from "react";
import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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

  // const handleSlideChange = () => {
  //   if (emblaApi) {
  //     setActiveIndex(emblaApi.selectedScrollSnap());
  //     console.log("index:" + index);
  //   }
  // };
  //
  // useEffect(() => {
  //   if (emblaApi) {
  //     emblaApi.on("select", handleSlideChange);
  //     // Add event listener for slide change
  //   }
  //
  //   return () => {
  //     if (emblaApi) {
  //       emblaApi.off("select", handleSlideChange); // Cleanup event listener
  //     }
  //   };
  // }, [emblaApi]);

  return (
    <Carousel
      plugins={[plugin.current]}
      className={`carousel relative w-full h-full ${className}`}
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

      {/*TODO :indicators?*/}
      {/*<div className="absolute z-20 top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-2">*/}
      {/*  {images.map((_, index) => (*/}
      {/*    <div*/}
      {/*      key={index}*/}
      {/*      className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-950" : "bg-gray-300"}`}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </Carousel>
  );
}
