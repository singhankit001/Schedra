# features/

Feature-oriented modules live here — one directory per product feature
(e.g. `features/meetings/`, `features/availability/`), each owning its own
components, hooks, and queries that aren't reused elsewhere.

Nothing has been built yet: this phase only establishes the convention.
Cross-feature primitives belong in `components/ui`, structural layout in
`components/layout`, and shared domain types in `types/`.
