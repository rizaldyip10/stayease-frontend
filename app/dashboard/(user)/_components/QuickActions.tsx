import React from "react";
import { MessageSquare, Search, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  actions: { icon: React.ReactNode; label: string }[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-blue-950">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) =>
          index === 0 ? (
            <Button
              key={index}
              className="w-full flex items-center justify-center bg-blue-950 hover:bg-gray-200 text-appgray hover:text-blue-950"
            >
              {action.icon}
              {action.label}
            </Button>
          ) : (
            <Button
              key={index}
              className="w-full flex items-center justify-center"
              variant="outline"
            >
              {action.icon}
              {action.label}
            </Button>
          ),
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
