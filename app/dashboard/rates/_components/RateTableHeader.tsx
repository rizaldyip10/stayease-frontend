"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FC } from "react";
import { useRouter } from "next/navigation";
import RateSettingDialog from "@/app/dashboard/rates/_components/setting/RateSettingDialog";
import { Plus } from "lucide-react";

interface RateTableHeaderProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RateTableHeaders: FC<RateTableHeaderProps> = ({ value, onChange }) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <RateSettingDialog
          isEditing={false}
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Set New Rate
            </Button>
          }
        />
      </div>
      <Input
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="md:max-w-96"
      />
    </div>
  );
};

export default RateTableHeaders;
