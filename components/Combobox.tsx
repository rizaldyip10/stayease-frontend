"use client";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface ComboboxProps {
  choices: {
    value: string;
    label: string;
  }[];
  onSelect: (value: string) => void;
}

const Combobox: React.FC<ComboboxProps> = ({ choices, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    onSelect(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full text-left font-normal flex justify-between"
        >
          {value
            ? choices.find((choice) => choice.value === value)?.label
            : "Select choice..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search choice..." className="h-9" />
          <CommandList>
            <CommandEmpty>No choice found.</CommandEmpty>
            <CommandGroup>
              {choices.map((choice) => (
                <CommandItem
                  key={choice.value}
                  value={choice.value}
                  onSelect={handleSelect}
                >
                  {choice.label}
                  {/*<CheckIcon*/}
                  {/*  className={cn(*/}
                  {/*    "ml-auto h-4 w-4",*/}
                  {/*    value === choice.value ? "opacity-100" : "opacity-0",*/}
                  {/*  )}*/}
                  {/*/>*/}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
