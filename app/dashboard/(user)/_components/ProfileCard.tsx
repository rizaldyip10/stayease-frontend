import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { UserProfile } from "@/services/profileService";

interface ProfileCardProps {
  className?: string;
  user: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className, user }) => {
  const fullName = user.firstName + " " + (user.lastName ?? "");
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-blue-950">My Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user?.avatarUrl} alt={user.firstName} />
          <AvatarFallback>
            {user.firstName.charAt(0) + user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold text-blue-950">{fullName}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
        <Link href="/profile">
          <Button className="mt-4 bg-blue-950 hover:bg-appgray text-appgray hover:text-blue-950">
            Edit Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
