import React from 'react';
import Image from "next/image";
import img from "@/assets/images/template_property.jpg";
import {MapPin, Star} from "lucide-react";

const PropertySection = () => {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col md:flex-row max-md:gap-y-2 justify-between text-blue-950">
                <h1>Check-in: Oct, 12 2024</h1>
                <h1>Check-out: Oct, 14 2024</h1>
                <h1>Total: Rp 1.600.000</h1>
            </div>
            <div className="w-full bg-blue-500 bg-opacity-20 rounded-md p-2">
                <h1>Property</h1>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2">
                <Image src={img} alt={"room"} width={160} height={160} className="w-30 h-24 object-cover rounded-md"/>
                <div className="flex flex-col gap-1">
                    <h1 className="text-medium text-blue-950">Sunny Beach Villa</h1>
                    <div className="flex items-center gap-2">
                        <MapPin className="text-blue-950 w-4 h-4"/>
                        <p className="text-blue-950 text-sm">Location</p>
                    </div>
                    <p className="text-blue-950  text-sm">123 Beach Road, Miami, USA</p>
                    <div className="flex items-center gap-2">
                        <Star className="text-blue-950 w-4 h-4" />
                        <p className="text-blue-950 text-sm">4.9 Ratings</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PropertySection;