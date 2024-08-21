import Image from "next/image";
import {CircleUserRound, LogOut, Settings} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const ProfileBtn = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center lg:hidden">
                <CircleUserRound className="w-7 h-7 rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
                    Login
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
                    Register
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileBtn;