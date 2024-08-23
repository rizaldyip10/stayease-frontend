"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useField } from "formik";
import {FC} from "react";

interface FormikCheckboxProps {
    name: string;
    label: string;
}

const FormikCheckbox: FC<FormikCheckboxProps> = ({ name, label }) => {
    const [field, _, helpers] = useField({ name, type: 'checkbox' });

    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={async (checked) => {
                    await helpers.setValue(checked);
                }}
            />
            <label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
        </div>
    );
};

export default FormikCheckbox;