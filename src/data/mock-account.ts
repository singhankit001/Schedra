import type { User } from "@/types/user";

/**
 * Local placeholder account for the sidebar footer — no authentication
 * exists yet (out of scope through Phase 3). Values mirror the reference
 * screenshot's own placeholder text ("Account" / "Starter Plan"), not a
 * real identity or the developer's own information.
 */
export const mockAccount: User = {
  id: "local-account",
  name: "Account",
  email: "account@meetplan.app",
  plan: "starter",
};
