"use client";

import { Input } from "@/components/ui/input";
import { useField } from "formik";
import {FC, InputHTMLAttributes, useState} from "react";
import {Button} from "@/components/ui/button";
import {Eye, EyeOff} from "lucide-react";

interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    name: string;
    label: string;
}

const FormikInput: FC<FormikInputProps> = ({ name, label, id, ...props }) => {
    const [field, meta] = useField(name);
    const [isVisible, setVisible] = useState<boolean>(false);

    const type = props.type;
    const isPassword = type === "password";
    const passwordType = isVisible ? 'text' : 'password';
    return (
        <div className="space-y-2">
            <label htmlFor={name}>
                <div className="relative">
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
                        type={type == "password" ? passwordType : type}
                    />
                    {
                        isPassword &&
                            <Button
                                variant="ghost"
                                type="button"
                                className="absolute h-full right-0 pr-3"
                                onClick={() => setVisible(!isVisible)}
                            >
                                { isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" /> }
                            </Button>
                    }
                </div>
                {meta.touched && meta.error ? (
                    <div className="text-red-500 text-xs mt-1">{meta.error}</div>
                ) : null}
            </label>
        </div>
    )
}

export default FormikInput