import type { Transition, Variants } from "framer-motion";

/**
 * Shared, calm motion primitives for Schedra.
 *
 * The reference is a low-motion, premium SaaS interface — nothing in the
 * screenshot implies bold or bouncy animation. This file only defines the
 * *vocabulary* (durations, easing, a couple of restrained variants) for
 * future feature components to opt into; no design-system primitive
 * (Button, Card, ...) consumes Framer Motion itself — their hover/focus
 * feedback is plain CSS `transition-colors`, which is already inert under
 * `prefers-reduced-motion` via the global rule in globals.css.
 *
 * Anything built on top of this that animates layout/position (not just
 * opacity) should also gate itself with `useReducedMotion` below.
 */

export const MOTION_DURATION = {
  fast: 0.12,
  base: 0.18,
  slow: 0.24,
} as const;

/** Gentle ease-out — no overshoot, no bounce. */
export const MOTION_EASE: Transition["ease"] = [0.4, 0, 0.2, 1];

export const fadeTransition: Transition = {
  duration: MOTION_DURATION.base,
  ease: MOTION_EASE,
};

/** Plain opacity fade — the calmest possible entrance. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: fadeTransition },
};

/** Fade combined with a 4px rise — for list rows / cards entering, kept
 * subtle enough to match the reference's restrained motion language. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: fadeTransition },
};

export { useReducedMotion } from "framer-motion";
