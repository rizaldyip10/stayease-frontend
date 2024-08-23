"use client";

import { Input } from "@/components/ui/input";
import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";

interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    name: string;
    label: string;
}

const FormikInput: FC<FormikInputProps> = ({ name, label, id, ...props }) => {
    const [field, meta] = useField(name);

    return (
        <div className="space-y-2">
            <label htmlFor={name}>
                <Input
                    {...field}
                    {...props}
                    id={id}
                    placeholder={label}
                    className={`
                        ${meta.touched && meta.error ? 'border-red-500' : ''}
                        focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none
                        active:ring-0 active:ring-offset-0 active:outline-none
                    `}
                />
                {meta.touched && meta.error ? (
                    <div className="text-red-500 text-xs mt-1">{meta.error}</div>
                ) : null}
            </label>
        </div>
    )
}

export default FormikInput