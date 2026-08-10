# MeetPlan — Color Specification

All colors sampled visually from the reference screenshot. Hex values are
best-fit approximations from a static raster image — confirm against brand
tokens if a design system exists before finalizing.

## 19. Background colors
| Token | Hex (approx) | Usage |
|---|---|---|
| `bg-canvas` | `#0B1F14` | Outermost window/frame background (16px margin around shell) |
| `bg-app` | `#F8F5EF` | Main content panel background (warm off-white/cream) |
| `bg-sidebar` | `#0E2A1D` | Sidebar background (deep forest green, near-black) |

## 20. Surface colors
| Token | Hex (approx) | Usage |
|---|---|---|
| `surface-card` | `#FFFFFF` | Stat cards, meeting list container, meeting-type cards, calendar widget, header search input |
| `surface-card-alt` | `#FCFAF6` | Slight-tint surfaces / hover states (subtle, if present) |
| `surface-banner` | `#F3ECDD` → `#F6E7D9` | Welcome banner background, soft warm gradient (cream → light peach) |
| `surface-nav-active` | `#1D3E2C` | Active sidebar nav-item pill (lighter than sidebar bg) |
| `surface-schedule-item` | `#FFFFFF` | Individual "Today's Schedule" event cards |

## 21. Primary green
| Token | Hex (approx) | Usage |
|---|---|---|
| `green-900` (sidebar bg) | `#0E2A1D` | Sidebar surface |
| `green-800` (brand/primary) | `#163C2C` | "MeetPlan" logo text, primary CTA buttons ("New Meeting", "Upgrade Now"), selected calendar date fill, active nav pill accent |
| `green-600` (success/trend) | `#2F8F5B` | Positive trend text ("↑ 12% vs yesterday", etc.), online-status dot |
| `green-100` (tint) | `#E4EFE7` | Icon badge background for "Hours Booked" stat, subtle green tints |

## 22. Accent colors
| Token | Hex (approx) | Usage |
|---|---|---|
| `orange-400` | `#F0A15C` | "Pending Invitations" icon badge bg, "Revenue" icon badge bg, wave emoji tone |
| `orange-100` | `#FBEADA` | Lighter orange tints on icon badges |
| `blue-400` | `#4C8DF5` | "Product Demo" video-call provider icon (Zoom-style), "Quick Demo" meeting-type icon badge tint |
| `purple-400` | `#6C6FD0` | MS Teams provider icon accent |
| `pink-100` | `#F6DDE0` | Skyline illustration building fill (banner) |
| `sage-300` | `#A9C3A6` | Skyline illustration tree fills (banner) |

## 23. Border colors
| Token | Hex (approx) | Usage |
|---|---|---|
| `border-subtle` | `#ECE7DC` | 1px card borders on white surfaces against cream bg |
| `border-divider` | `#EFEAE0` | Hairline row dividers inside Upcoming Meetings list |
| `border-focus` (implied) | `#163C2C` | Likely focus ring color for inputs (not directly visible, inferred from brand green) |

## Shadows (25)
- Card elevation (stat cards, meeting rows container, calendar,
  meeting-type cards): soft, low-contrast —
  `0 1px 2px rgba(20, 30, 20, 0.04), 0 4px 12px rgba(20, 30, 20, 0.03)`.
- App shell: `0 20px 60px rgba(0, 0, 0, 0.25)` against the dark canvas.
- No hard/high-contrast shadows anywhere in the reference — everything
  reads as flat/near-flat with minimal elevation.

## Notes
- Overall palette is warm, muted, and low-saturation: cream/off-white
  base, deep forest green as the singular brand/primary color, and a small
  set of pastel accents (peach/orange, sage green, dusty pink, soft blue)
  reserved for icon badges and illustration only — never for large
  surfaces or body text.
- Text colors: primary text near-black/charcoal `#1B1F1C`, secondary/muted
  text warm gray `#8A8478`, link/action text uses brand green `#163C2C`.
