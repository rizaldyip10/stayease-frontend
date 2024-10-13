import React from 'react';

const SpecialRequestSection = () => {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-blue-500 bg-opacity-20 rounded-md p-2">
                <h1>Special Request</h1>
            </div>
            <div className="w-full flex flex-col gap-2 text-blue-950">
                <p>Check-in Time: 13:30</p>
                <p>Check-out Time: 13:00</p>
                <p>Smoking-room: No</p>
                <p>Other: No</p>
            </div>
        </div>
    );
};

export default SpecialRequestSection;