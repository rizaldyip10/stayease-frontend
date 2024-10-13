import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";

const MapInstructions: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" size="sm" className="text-blue-800 text-xs">
          <InfoIcon className="mr-1 h-4 w-4" /> Map Instructions
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="p-4">
          <p className="font-bold mb-2">How to set the address:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Click on the map to place a marker</li>
            <li>Drag the marker to adjust the location</li>
            <li>The address fields will update automatically</li>
            <li>
              You may edit the &quot;Address&quot; field if the address from the
              map is not accurate.
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MapInstructions;
