import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { reservationSteps } from "@/constants/FillerData";

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
          {reservationSteps.map((step) => (
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
