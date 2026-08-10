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
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-heading text-ink">{title}</h1>
        {description ? <p className="text-body-sm text-ink-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
