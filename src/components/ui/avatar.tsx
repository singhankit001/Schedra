import Image from "next/image";
import { cn } from "@/lib/utils";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "offline";

export interface AvatarProps {
  src?: string;
  /** Accessible description of the person. Required even when only
   * initials are shown, so screen readers announce who the avatar
   * represents. */
  alt: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

// Sizes map to components.md: sm = 24px (attendee stacks), md = 32px
// (sidebar account row), lg = 40px (header user avatar).
const sizeConfig: Record<AvatarSize, { box: string; text: string; px: number }> = {
  sm: { box: "h-6 w-6", text: "text-2xs", px: 24 },
  md: { box: "h-8 w-8", text: "text-xs", px: 32 },
  lg: { box: "h-10 w-10", text: "text-sm", px: 40 },
};

export function Avatar({ src, alt, initials, size = "md", status, className }: AvatarProps) {
  const { box, text, px } = sizeConfig[size];

  return (
    <span className={cn("relative inline-flex shrink-0", box, className)}>
      <span
        className={cn(
          "bg-brand-100 text-brand-800 flex h-full w-full items-center justify-center overflow-hidden rounded-full font-semibold",
          text,
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={px}
            height={px}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </span>
      {status ? (
        <span
          aria-hidden="true"
          className={cn(
            "ring-surface absolute right-0 bottom-0 h-2 w-2 rounded-full ring-2",
            status === "online" ? "bg-brand-600" : "bg-ink-muted",
          )}
        />
      ) : null}
    </span>
  );
}
