import { Field, useField } from "formik";
import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormikInputProps {
  label?: string;
  as?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  name: string;
  disabled?: boolean;
}

const FormikInput: FC<FormikInputProps> = ({ label, ...props }) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const [, meta] = useField(props.name);
  const { as, className, disabled, type, name, placeholder } = props;

  const isPassword = type == "password";
  const passwordType = isVisible ? "text" : "password";

  return (
    <div className="w-full flex flex-col gap-1">
      {label && <p>{label}</p>}
      <div className="relative">
        <Field
          as={as}
          className={cn(className, isPassword ? "relative" : "")}
          disabled={disabled}
          type={type == "password" ? passwordType : type}
          name={name}
          placeholder={placeholder}
        />
        {isPassword && (
          <Button
            variant="ghost"
            type="button"
            className="absolute h-full right-0 pr-3"
            onClick={() => setVisible(!isVisible)}
          >
            {isVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      {meta.error && meta.touched && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikInput;
