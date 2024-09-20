import Image from "next/image";
import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

const ProfileBtn = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <Image
          src={
            session?.user.avatar ||
            "https://ui-avatars.com/api/?name=Rizaldy+Putra"
          }
          alt="pp"
          className="w-7 h-7 rounded-full"
          width={28}
          height={28}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs text-blue-950">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
          <Settings className="w-4 h-4 text-blue-950" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs flex items-center text-red-700 gap-1">
          <Button onClick={() => signOut()} variant="link">
            <LogOut className="w-4 h-4 text-red-700" />
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtn;
