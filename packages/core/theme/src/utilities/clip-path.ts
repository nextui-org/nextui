export default {
  /**
   * Clip Path utilities
   */
  ".clip-path-popover-top": {
    "clip-path":
      "polygon(calc(100% + 5px) -5px,calc(100% + 5px) calc(100% + 5px),-5px calc(100% + 5px))",
  },
  ".clip-path-popover-bottom": {
    "clip-path": "polygon(calc(100% + 5px) -5px,-5px -5px,-5px calc(100% + 5px))",
  },
  ".clip-path-popover-left": {
    "clip-path": "polygon(-5px -5px,calc(100% + 5px) -5px,calc(100% + 5px) calc(100% + 5px))",
  },
  ".clip-path-popover-right": {
    "clip-path": "polygon(-5px -5px,-5px calc(100% + 5px),calc(100% + 5px) calc(100% + 5px))",
  },
};
