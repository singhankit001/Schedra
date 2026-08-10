import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Renders the label visually hidden but still available to screen
   * readers (e.g. for a search field labeled by placeholder alone). */
  hideLabel?: boolean;
  leadingIcon?: ReactNode;
  trailingSlot?: ReactNode;
  /** Validation message. Presence alone marks the field invalid (sets
   * `aria-invalid` + `aria-describedby`) and switches the border/ring to
   * the danger token — pass a non-empty string to also render the message. */
  error?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hideLabel = false,
    leadingIcon,
    trailingSlot,
    error,
    id,
    className,
    wrapperClassName,
    disabled,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label ? (
        <label
          htmlFor={inputId}
          className={cn("text-body text-ink font-medium", hideLabel && "sr-only")}
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          "border-border bg-surface flex h-11 items-center gap-2 rounded-sm border px-4",
          "focus-within:ring-offset-app focus-within:ring-2 focus-within:ring-offset-2",
          hasError ? "border-danger focus-within:ring-danger" : "focus-within:ring-brand-800",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        {leadingIcon ? (
          <span className="text-ink-muted" aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : ariaDescribedBy}
          className={cn(
            "text-body text-ink placeholder:text-ink-muted h-full flex-1 bg-transparent outline-none",
            className,
          )}
          {...props}
        />
        {trailingSlot}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-caption text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
});
