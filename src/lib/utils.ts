type ClassValue = string | number | boolean | null | undefined | ClassValue[];

/**
 * Minimal class-name combiner: joins truthy values, flattens arrays, and
 * drops falsy ones. Deliberately dependency-free (no clsx/tailwind-merge) —
 * the design tokens are namespaced enough that class conflicts requiring a
 * merge resolver are not expected at this stage.
 */
export function cn(...inputs: ClassValue[]): string {
  const flatten = (values: ClassValue[]): string[] =>
    values.flatMap((value) => {
      if (Array.isArray(value)) return flatten(value);
      if (typeof value === "string" && value.length > 0) return [value];
      return [];
    });

  return flatten(inputs).join(" ");
}

/**
 * Derives avatar-fallback initials from a full name: two letters (first +
 * last name) for multi-word names, first two letters for a single word.
 * Used wherever a person is shown without an avatar image (attendee
 * stacks, account rows) so initials logic isn't duplicated per call site.
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
