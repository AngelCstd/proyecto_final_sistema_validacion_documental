import type { SelectHTMLAttributes, ReactNode } from "react";
import { Label } from "@/components/atoms/Label";
import { Select } from "@/components/atoms/Select";
import { FieldError } from "@/components/atoms/FieldError";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  error?: string | null;
  children: ReactNode;
};

export function SelectField({
  label,
  id,
  error,
  children,
  ...selectProps
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} name={id} {...selectProps}>
        {children}
      </Select>
      <FieldError message={error} />
    </div>
  );
}
