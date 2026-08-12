"use client";

import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/dashboard/page-header";
import { getAllContacts, useAppStore } from "@/stores/app-store";
import { getInitials } from "@/lib/utils";

/**
 * Contacts — every unique attendee across every meeting (`getAllContacts`,
 * deduped by email). There's no separate contacts CRUD in this app; a
 * contact only exists because they've been invited to something, so this
 * list is a real, derived view rather than a second, independently
 * maintained dataset that could drift from the meetings themselves.
 */
export default function ContactsPage() {
  const meetings = useAppStore((state) => state.meetings);
  const contacts = getAllContacts(meetings);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Contacts"
        description={`${contacts.length} contact${contacts.length === 1 ? "" : "s"} from your meetings`}
      />

      <Card role="region" aria-label="Contacts" className="flex flex-col">
        {contacts.length === 0 ? (
          <p className="text-body-sm text-ink-muted py-6 text-center">
            Contacts appear here once you have meetings with participants.
          </p>
        ) : (
          <ul className="flex flex-col">
            {contacts.map((contact, index) => (
              <li
                key={contact.email}
                className={`flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-3 ${index === contacts.length - 1 ? "" : "border-border-divider border-b"}`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar alt={contact.name} initials={getInitials(contact.name)} size="md" />
                  <div className="flex min-w-0 flex-1 flex-col sm:flex-none">
                    <p className="text-body text-ink font-medium">{contact.name}</p>
                    {contact.company ? (
                      <p className="text-caption text-ink-muted">{contact.company}</p>
                    ) : null}
                  </div>
                </div>
                {/* A fixed-width, non-shrinking email link next to the
                    avatar+name block overflowed at phone widths once
                    names + a long email address couldn't both fit on one
                    row. Stacked below the name on mobile (indented under
                    the avatar), back to inline from `sm` up — same fix
                    shape as the Availability page's day rows. */}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-body-sm text-brand-800 focus-visible:ring-brand-800 ml-11 flex min-w-0 items-center gap-1.5 rounded-xs hover:underline focus-visible:ring-2 focus-visible:outline-none sm:ml-0 sm:max-w-56 sm:shrink-0"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 truncate">{contact.email}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
