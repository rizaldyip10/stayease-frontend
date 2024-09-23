import React from "react";
import { AdjustedRatesType } from "@/constants/Property";
import { Card } from "@/components/ui/card";
import { currencyFormatter } from "@/utils/CurrencyFormatter";
import { Button } from "@/components/ui/button";
import { usePropertyDetails } from "@/hooks/properties/usePropertyDetails";
import { Plus } from "lucide-react";
import Link from "next/link";

interface RoomTabProps {
  propertyId: number;
}

const RoomTab: React.FC<RoomTabProps> = ({ propertyId }) => {
  const { currentProperty } = usePropertyDetails(propertyId, new Date());

  const hasAdjustment = currentProperty?.rooms?.some(
    (room: AdjustedRatesType) => room.adjustedPrice !== room.basePrice,
  );

  return (
    <div className="space-y-4">
      {currentProperty?.rooms?.map((room: AdjustedRatesType) => (
        <Card key={room.roomId} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-blue-950">{room.roomName}</h4>
              <p className="text-sm text-gray-500">
                Base Rate: IDR {currencyFormatter(room.basePrice)}
              </p>
              {hasAdjustment ? (
                <p className="text-sm text-gray-500">
                  Adjusted Rate Today: IDR{" "}
                  {currencyFormatter(room.adjustedPrice)}
                </p>
              ) : (
                <p className="text-sm text-gray-500">No adjustments today</p>
              )}
            </div>
            <Button variant="outline" className="text-blue-950" asChild>
              <Link href="/dashboard/rates">Adjust Rates</Link>
            </Button>
          </div>
        </Card>
      ))}
      <Link href={`/dashboard/properties/${currentProperty?.id}/edit`}>
        <Button className="w-full bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950 mt-4">
          <Plus className="mr-2 h-4 w-4" /> Add New Room
        </Button>
      </Link>
    </div>
  );
};

export default RoomTab;
