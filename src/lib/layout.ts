/**
 * Structural layout constants mirrored from visual-spec/layout.md.
 *
 * These values are the single source of truth referenced by the shell
 * components' Tailwind classes (see components/layout/*). Keep in sync with
 * the spec — if a value here changes, the corresponding class must change
 * too (e.g. `sidebarWidthPx` <-> the `--spacing-sidebar` token in
 * globals.css <-> the `w-sidebar` utility used by SidebarShell).
 */
export const LAYOUT = {
  shellMarginPx: 16,
  shellRadiusPx: 24,
  sidebarWidthPx: 264,
  contentPaddingPx: 32,
  columnGapPx: 24,
  colLeftWidthPx: 776,
  colRightWidthPx: 376,
} as const;
