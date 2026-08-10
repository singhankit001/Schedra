"use client";

import { useEffect } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useAppStore, type ToastVariant } from "@/stores/app-store";
import { cn } from "@/lib/utils";

const VARIANT_ICON: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
};

const VARIANT_COLOR: Record<ToastVariant, string> = {
  success: "text-brand-600",
  info: "text-accent-blue",
  error: "text-danger",
};

const AUTO_DISMISS_MS = 3000;

function ToastItem({
  id,
  message,
  variant,
}: {
  id: string;
  message: string;
  variant: ToastVariant;
}) {
  const dismissToast = useAppStore((state) => state.dismissToast);
  const Icon = VARIANT_ICON[variant];

  useEffect(() => {
    const timer = window.setTimeout(() => dismissToast(id), AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [id, dismissToast]);

  return (
    <div
      role="status"
      className="border-border bg-surface shadow-card flex w-80 items-start gap-3 rounded-md border p-3"
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", VARIANT_COLOR[variant])} aria-hidden="true" />
      <p className="text-body-sm text-ink flex-1">{message}</p>
      <button
        type="button"
        onClick={() => dismissToast(id)}
        aria-label="Dismiss notification"
        className="text-ink-muted hover:text-ink focus-visible:ring-brand-800 focus-visible:ring-offset-surface shrink-0 rounded-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * Global toast stack, mounted once in the root layout. Reads directly
 * from `useAppStore` so any action anywhere (`showToast(...)`) surfaces
 * here with no prop drilling. `aria-live="polite"` region so screen
 * readers announce new toasts without interrupting.
 */
export function Toaster() {
  const toasts = useAppStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-4 z-[60] flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem id={toast.id} message={toast.message} variant={toast.variant} />
        </div>
      ))}
    </div>
  );
}
