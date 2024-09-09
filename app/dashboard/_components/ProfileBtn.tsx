import Image from "next/image";
import {LogOut, Settings} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const ProfileBtn = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
                <Image src="https://ui-avatars.com/api/?name=Rizaldy+Putra" alt="pp" className="w-6 h-6 rounded-full" width={24} height={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs text-blue-950">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
                    <Settings className="w-4 h-4 text-blue-950" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs flex items-center text-red-700 gap-1">
                    <LogOut className="w-4 h-4 text-red-700" />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileBtn;