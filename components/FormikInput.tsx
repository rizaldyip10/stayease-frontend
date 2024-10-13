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

  const [field, meta] = useField(props.name);
  const { as, className, disabled, type, name, placeholder } = props;

  const isPassword = type === "password";
  const passwordType = isVisible ? "text" : "password";

  return (
    <div className="form-input w-full flex flex-col gap-1">
      {label && <p>{label}</p>}
      <div className="relative">
        <Field
          as={as}
          className={cn(className, isPassword ? "pr-10" : "", "w-full")}
          disabled={disabled}
          type={isPassword ? passwordType : type}
          name={name}
          placeholder={placeholder}
        />
        {isPassword && (
          <Button
            variant="ghost"
            type="button"
            className="absolute h-full inset-y-0 right-0 px-3 flex items-center"
            onClick={() => setVisible(!isVisible)}
            tabIndex={-1}
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
        <div className="error-container max-w-[200px] min-h-[20px]">
          <p className="text-red-500 text-xs break-words">{meta.error}</p>
        </div>
      )}
    </div>
  );
};

export default FormikInput;
