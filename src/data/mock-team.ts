export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

/** Placeholder team roster for the `/team` page — same non-real,
 * non-personal placeholder convention as `mock-account.ts`. */
export const mockTeam: TeamMember[] = [
  { id: "team-1", name: "Account", email: "account@schedra.app", role: "Owner" },
  { id: "team-2", name: "Morgan Lee", email: "morgan.lee@schedra.app", role: "Admin" },
  { id: "team-3", name: "Casey Kim", email: "casey.kim@schedra.app", role: "Member" },
];
