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
                <Image src="https://ui-avatars.com/api/?name=Rizaldy+Putra" alt="pp" className="w-7 h-7 rounded-full" width={28} height={28} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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