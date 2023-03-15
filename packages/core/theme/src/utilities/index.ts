const DEFAULT_TRANSITION_DURATION = "250ms";

export const utilities = {
  /**
   * Custom utilities
   */
  ".leading-inherit": {
    "line-height": "inherit",
  },
  ".bg-img-inherit": {
    "background-image": "inherit",
  },
  ".bg-clip-inherit": {
    "background-clip": "inherit",
  },
  ".text-fill-inherit": {
    "-webkit-text-fill-color": "inherit",
  },
  ".transition-background": {
    "transition-property": "background",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  /**
   * Tailwind utilities
   */
  ".transition-all": {
    "transition-property": "all",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition": {
    "transition-property":
      "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-colors": {
    "transition-property":
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-opacity": {
    "transition-property": "opacity",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-width": {
    "transition-property": "width",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-shadow": {
    "transition-property": "box-shadow",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-transform": {
    "transition-property": "transform",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-transform-opacity": {
    "transition-property": "transform, opacity",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-transform-background": {
    "transition-property": "transform, background",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
};
