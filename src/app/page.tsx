import { redirect } from "next/navigation";

// No public marketing page exists yet — the app's single entry point is the
// dashboard. Revisit once unauthenticated/marketing routes are needed.
export default function RootPage() {
  redirect("/dashboard");
}
