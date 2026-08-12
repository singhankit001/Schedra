import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { mockTeam } from "@/data/mock-team";
import { getInitials } from "@/lib/utils";

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Team" description={`${mockTeam.length} people on your team`} />

      <Card role="region" aria-label="Team members" className="flex flex-col">
        <ul className="flex flex-col">
          {mockTeam.map((member, index) => (
            <li
              key={member.id}
              className={`flex items-center gap-3 py-3 ${index === mockTeam.length - 1 ? "" : "border-border-divider border-b"}`}
            >
              <Avatar alt={member.name} initials={getInitials(member.name)} size="md" />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-body text-ink truncate font-medium">{member.name}</p>
                <p className="text-caption text-ink-muted truncate">{member.email}</p>
              </div>
              <Badge className="shrink-0" variant={member.role === "Owner" ? "brand" : "neutral"}>
                {member.role}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
