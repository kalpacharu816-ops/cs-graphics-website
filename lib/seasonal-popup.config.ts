/**
 * Seasonal Popup — edit this file to customize every visit popup.
 * Set `enabled: false` to disable globally.
 */

export type PopupType = "seasonal" | "offer" | "announcement" | "event";

export const seasonalPopupConfig = {
  /** Master switch */
  enabled: true,

  /** Delay before popup appears (ms) */
  showDelayMs: 2200,

  /** Auto-close after N ms (0 = disabled) */
  autoCloseMs: 0,

  /** Fade-out duration on close (ms) */
  exitDurationMs: 500,

  type: "offer" as PopupType,

  eyebrow: "Limited Time",
  title: "Studio Refresh Sale",
  description:
    "Book any thumbnail bundle this season and receive a complimentary stream overlay pack. Premium slots — first come, first served.",

  /** Optional badge next to eyebrow */
  badge: "NEW",

  /** Optional image path (leave empty to hide) */
  image: "",

  cta: {
    label: "Claim Offer",
    href: "/#contact",
  },

  secondaryLabel: "Maybe later",
} as const;
