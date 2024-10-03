"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FC } from "react";
import RateSettingDialog from "@/app/dashboard/rates/_components/setting/RateSettingDialog";
import { MdEditNote } from "react-icons/md";

interface RateTableHeaderProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RateTableHeaders: FC<RateTableHeaderProps> = ({ value, onChange }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <RateSettingDialog
          isEditing={false}
          trigger={
            <Button className="bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950 w-full md:w-auto">
              <MdEditNote className="mr-2 h-4 w-4 text-bold" /> Set / Edit Rate
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
