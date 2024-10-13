"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {User} from "lucide-react";
import {UsersDiffType} from "@/constants/Reports";
import {FC} from "react";

interface UserCardProps {
    usersDiff: UsersDiffType;
}

const UsersCard: FC<UserCardProps> = ({ usersDiff }) => {
    let diff;
    if (usersDiff.usersDiffPercent >= 0) {
        diff = `+ ${usersDiff.usersDiffPercent}`;
    } else {
        diff = `${usersDiff.usersDiffPercent}`;
    }
    return (
        <Card className="text-blue-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Users
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground text-blue-950" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{ usersDiff.usersThisMonth }</div>
                <p className="text-xs text-muted-foreground">
                    { diff }% from last month
                </p>
            </CardContent>
        </Card>
    );
};

export default UsersCard;