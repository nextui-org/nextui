export const animations = {
  animation: {
    "drip-expand": "drip-expand 420ms linear",
    "spinner-ease-spin": "spinner-spin 0.8s ease infinite",
    "spinner-linear-spin": "spinner-spin 0.8s linear infinite",
    "appearance-in": "appearance-in 250ms ease-out normal both",
    "appearance-out": "appearance-out 60ms ease-in normal both",
    "indeterminate-bar":
      "indeterminate-bar 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite normal none running",
  },
  keyframes: {
    shimmer: {
      "100%": {
        transform: "translateX(100%)",
      },
    },
    "spinner-spin": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
    "drip-expand": {
      "0%": {
        opacity: "0.2",
        transform: "scale(0)",
      },
      "100%": {
        opacity: "0",
        transform: "scale(2)",
      },
    },
    "appearance-in": {
      "0%": {
        opacity: "0",
        transform: "translateZ(0)  scale(0.95)",
      },
      "60%": {
        opacity: "0.75",
        /* Avoid blurriness */
        backfaceVisibility: "hidden",
        webkitFontSmoothing: "antialiased",
        transform: "translateZ(0) scale(1.05)",
      },
      "100%": {
        opacity: "1",
        transform: "translateZ(0) scale(1)",
      },
    },
    "appearance-out": {
      "0%": {
        opacity: "1",
        transform: "scale(1)",
      },
      "100%": {
        opacity: "0",
        transform: "scale(0.85)",
      },
    },
    "indeterminate-bar": {
      "0%": {
        transform: "translateX(-50%) scaleX(0.2)",
      },
      "100%": {
        transform: "translateX(100%) scaleX(1)",
      },
    },
  },
};
