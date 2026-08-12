import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Shared heading row for the second-tier route pages (`/meetings`,
 * `/calendar`, `/contacts`, ...) — same `text-heading`/`text-body-sm`
 * treatment already used for every dashboard section heading, so a new
 * page reads as part of the same app rather than a bolted-on template. */
export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    // `flex-wrap`: a safety net, not the common case — desktop/tablet never
    // need it (title+action already fit on one row at every validated
    // width), but it keeps a long title next to an action button from
    // ever forcing horizontal overflow on the narrowest phones instead of
    // just wrapping the action to its own line.
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-heading text-ink">{title}</h1>
        {description ? <p className="text-body-sm text-ink-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
