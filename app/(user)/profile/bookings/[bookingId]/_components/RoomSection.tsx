import React from 'react';

const RoomSection = () => {
    return (
        <div className="w-full flex flex-col gap-3 text-sm text-blue-950">
            <div className="w-full bg-blue-500 bg-opacity-20 rounded-md p-2">
                <h1>Rooms</h1>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-950">
                <div className="w-full flex flex-col gap-1">
                    <h1>Twin Superior Bedroom</h1>
                    <p>Price: Rp 800.000</p>
                    <p>Description: A spacious suite with a beautiful sea view and modern amenities.</p>
                    <p>Capacity: 2 people</p>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <h1>Twin Superior Bedroom</h1>
                    <p>Price: Rp 800.000</p>
                    <p>Description: A spacious suite with a beautiful sea view and modern amenities.</p>
                    <p>Capacity: 2 people</p>
                </div>
            </div>
        </div>
    );
};

export default RoomSection;