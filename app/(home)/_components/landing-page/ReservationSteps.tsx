import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    number: 1,
    title: "Pick a few places",
    description:
      "Explore hundreds of high-quality rooms, studios, and apartments. Choose the one that suits you best.",
  },
  {
    number: 2,
    title: "Accepting a reservation",
    description:
      "You will receive the acceptance of the reservation from the owner in just a couple of hours. You will not have to wait long for an answer and torment yourself with guesses.",
  },
  {
    number: 3,
    title: "Payment",
    description:
      "All that's necessary after receiving a response, is to send the payment and you are almost at the finish line!",
  },
  {
    number: 4,
    title: "Get your keys!",
    description:
      "Your accommodation is reserved! You can now pack your bags and get ready for your trip. StayEase, Stay Chill!",
  },
];

const ReservationSteps = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-950 mb-4 text-center">
          Reservation Process
        </h2>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Fast, Intuitive And Absolutely Safe!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.number}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="flex md:flex-row align-middle items-center gap-3">
                    <span className="text-3xl font-bold text-blue-950 mr-2">
                      {step.number}
                    </span>
                    <p>{step.title}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationSteps;
