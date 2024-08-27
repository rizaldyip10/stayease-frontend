import React from 'react';
import MenuRoutes from "@/app/(user)/profile/_components/MenuRoutes";

const UserMenu = () => {
    return (
        <div className="w-64 absolute bg-white hidden lg:flex flex-col gap-3 p-5 border border-gray-200 rounded-md">
            <h1 className="text-blue-950 font-semibold">My Profile</h1>
            <div className="flex gap-2 w-full border-b border-gray-200 pb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white">
                    U
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-sm text-blue-950 font-medium">Wawan Uhuy</h1>
                    <p className="text-xs text-blue-950 text-opacity-50">Joined since 2024</p>
                </div>
            </div>
            <MenuRoutes />
        </div>
    );
};

export default UserMenu;