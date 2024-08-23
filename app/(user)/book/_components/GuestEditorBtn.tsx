"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { FC } from "react";
import { useField } from "formik";

interface GuestEditorBtnProps {
    label: string;
    description: string;
    name: string;
}

const GuestEditorBtn: FC<GuestEditorBtnProps> = ({ label, description, name }) => {
    const [field, , helpers] = useField(name);

    const increment = async () => {
        await helpers.setValue(field.value + 1);
    };

    const decrement = async () => {
        if (field.value > 0) {
            await helpers.setValue(field.value - 1);
        }
    };

    return (
        <div className="w-full flex justify-between">
            <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-blue-950">{label}</h1>
                <p className="text-sm">{description}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    type="button"
                    className="border-blue-950 p-2 rounded-full w-8 h-8"
                    disabled={name === "totalAdults" && field.value === 1}
                    onClick={decrement}
                >
                    <Minus />
                </Button>
                <h1>{field.value}</h1>
                <Button
                    variant="outline"
                    type="button"
                    className="border-blue-950 p-2 rounded-full w-8 h-8"
                    onClick={increment}
                >
                    <Plus />
                </Button>
            </div>
        </div>
    );
};

export default GuestEditorBtn;