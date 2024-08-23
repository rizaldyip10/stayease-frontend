import React from 'react';
import GuestsDialog from "@/app/(user)/book/_components/GuestsDialog";
import { useFormikContext } from 'formik';

const GuestInfo = () => {
    const { values } = useFormikContext<{
        totalAdults: number;
        totalChildren: number;
        totalInfants: number;
    }>();

    const totalGuests = values.totalAdults + values.totalChildren + values.totalInfants;

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-blue-950 text-sm">Guests</h1>
            <div className="w-full flex justify-between">
                <p>{totalGuests} Guests</p>
                <GuestsDialog />
            </div>
        </div>
    );
};

export default GuestInfo;