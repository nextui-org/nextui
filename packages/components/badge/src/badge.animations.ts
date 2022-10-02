import {keyframes} from "@nextui-org/system";

export const pointAnimation = keyframes({
  "0%": {
    opacity: 1,
  },
  "50%": {
    opacity: "0.4",
    transform: "scale(0.5)",
  },
  "100%": {
    opacity: 1,
  },
});

export const appearanceInTopRight = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.2) translate(50%, -50%)",
  },
  "60%": {
    opacity: 0.75,
    transform: "scale(1.2) translate(50%, -50%)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1) translate(50%, -50%)",
  },
});

export const appearanceOutTopRight = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1) translate(50%, -50%)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.2) translate(50%, -50%)",
  },
});

export const appearanceInTopLeft = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.2) translate(-50%, -50%)",
  },
  "60%": {
    opacity: 0.75,
    transform: "scale(1.2) translate(-50%, -50%)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1) translate(-50%, -50%)",
  },
});

export const appearanceOutTopLeft = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1) translate(-50%, -50%)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.2) translate(-50%, -50%)",
  },
});

export const appearanceInBottomRight = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.2) translate(50%, 50%)",
  },
  "60%": {
    opacity: 0.75,
    transform: "scale(1.2) translate(50%, 50%)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1) translate(50%, 50%)",
  },
});

export const appearanceOutBottomRight = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1) translate(50%, 50%)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.2) translate(50%, 50%)",
  },
});

export const appearanceInBottomLeft = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.2) translate(-50%, 50%)",
  },
  "60%": {
    opacity: 0.75,
    transform: "scale(1.2) translate(-50%, 50%)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1) translate(-50%, 50%)",
  },
});

export const appearanceOutBottomLeft = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1) translate(-50%, 50%)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.2) translate(-50%, 50%)",
  },
});
