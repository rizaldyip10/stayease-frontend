import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Serena Johnson",
    avatar: "/avatar1.jpg",
    content:
      "Erasmus Life Housing is a game-changer for students seeking accommodation abroad. The process was smooth, and I found my perfect home away from home!",
  },
  {
    name: "Ilias Elhassi",
    avatar: "/avatar2.jpg",
    content:
      "I couldn't be happier with the service provided by Erasmus Life Housing. They made finding a place to stay during my exchange program a breeze.",
  },
  {
    name: "Maria González",
    avatar: "/avatar3.jpg",
    content:
      "The team at Erasmus Life Housing went above and beyond to ensure I found the perfect accommodation. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-950 mb-8 text-center">
          That's What Our Clients Say
        </h2>
        <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-2">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {testimonial.content}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
