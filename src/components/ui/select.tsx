import { forwardRef, useId } from "react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hideLabel?: boolean;
  error?: string;
  wrapperClassName?: string;
  children: ReactNode;
}

/**
 * Native `<select>` styled to match `Input`'s exact recipe (44px height,
 * `rounded-sm`, same border/focus tokens) — a native element rather than
 * a custom listbox, since a real `<select>` already gives correct
 * keyboard/screen-reader behavior for free and this app has no need for
 * multi-select or rich option content.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    hideLabel = false,
    error,
    id,
    className,
    wrapperClassName,
    children,
    disabled,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label ? (
        <label
          htmlFor={selectId}
          className={cn("text-body text-ink font-medium", hideLabel && "sr-only")}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            "border-border bg-surface text-body text-ink h-11 w-full appearance-none rounded-sm border px-4 pr-9",
            "focus:ring-offset-app focus:ring-2 focus:ring-offset-2 focus:outline-none",
            hasError ? "border-danger focus:ring-danger" : "focus:ring-brand-800",
            disabled && "cursor-not-allowed opacity-60",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="text-ink-muted pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
          aria-hidden="true"
        />
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-caption text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
});
