"use client"

import { useField } from "formik"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {FC} from "react";

interface Option {
    value: string;
    label: string;
}

interface FormikSelectProps {
    name: string;
    label?: string;
    options: Option[];
    placeholder?: string;
}

const FormikSelect: FC<FormikSelectProps> = ({ name, label, options, placeholder = "Select an option" }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <div className="space-y-2">
            {
                label &&
                    <label htmlFor={name} className="text-sm font-medium">
                        {label}
                    </label>
            }
            <Select
                onValueChange={(value) => helpers.setValue(value)}
                defaultValue={field.value}
            >
                <SelectTrigger className={`w-full ${meta.touched && meta.error ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs mt-1">{meta.error}</div>
            ) : null}
        </div>
    )
}

export default FormikSelect