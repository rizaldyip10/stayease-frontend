"use client";

import imageEx from "@/assets/images/template_property.jpg";
import Image from "next/image";
import ReviewSection from "@/components/formik/ReviewSection";
import {Button} from "@/components/ui/button";
import {PencilLine} from "lucide-react";
import {useState} from "react";

const ReviewedCard = () => {
    const [isEditState, setEditState] = useState<boolean>(false);
    return (
        <div className="w-full flex flex-col lg:flex-row gap-3 border border-gray-200 p-5 rounded-md">
            <Image src={imageEx} alt={"image"} height={120} className="h-32 object-cover rounded-md" />
            <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                    <p className="text-xs text-blue-950 text-opacity-50">Booking ID: 1234631</p>
                    <Button
                        variant="ghost"
                        className="p-1 h-max"
                        onClick={() => setEditState(!isEditState)}
                    >
                        <PencilLine className="w-4 h-4" />
                    </Button>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-1">
                    <div className="w-full lg:w-1/2 flex flex-col gap-2">
                        <h1 className="text-lg text-blue-950 font-semibold">The Cove Bali -- Beachfront Villa</h1>
                        <p className="text-sm text-blue-950">Rp 1.150.000</p>
                        <p className="text-sm text-blue-950 text-opacity-70">10 Sept 2024 - 12 Sept 2024</p>
                    </div>
                    <div className="w-px h-full bg-gray-200 hidden lg:block" />
                    <hr className="border-gray-200" />
                    <ReviewSection isEditState={isEditState} />
                </div>
            </div>
        </div>
    );
};

export default ReviewedCard;