import type { SelectHTMLAttributes } from "react";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  /** Optional non-selectable placeholder shown first. */
  placeholder?: string;
};

/**
 * Compact, brand-styled native <select>. Native = accessible + mobile-friendly,
 * and replaces pill overload with a tidy dropdown.
 */
export default function Select({
  options,
  placeholder,
  className = "",
  ...rest
}: SelectProps) {
  return (
    <select className={`lf-select ${className}`} {...rest}>
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
