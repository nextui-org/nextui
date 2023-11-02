const DEFAULT_TRANSITION_DURATION = "250ms";

export default {
  /**
   * Transition utilities
   */
  ".transition-all": {
    "transition-property": "all",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-background": {
    "transition-property": "background",
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
  ".transition-colors-opacity": {
    "transition-property":
      "color, background-color, border-color, text-decoration-color, fill, stroke, opacity",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-width": {
    "transition-property": "width",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-height": {
    "transition-property": "height",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-size": {
    "transition-property": "width, height",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-left": {
    "transition-property": "left",
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
  ".transition-transform-colors": {
    " transition-property":
      "transform, color, background, background-color, border-color, text-decoration-color, fill, stroke",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
  ".transition-transform-colors-opacity": {
    " transition-property":
      "transform, color, background, background-color, border-color, text-decoration-color, fill, stroke, opacity",
    "transition-timing-function": "ease",
    "transition-duration": DEFAULT_TRANSITION_DURATION,
  },
};
