import {keyframes} from "@nextui-org/react";

export const levitating = keyframes({
  "0%": {
    transform: "translateY(0)",
  },
  "30%": {
    transform: "translateY(-10px)",
  },
  "50%": {
    transform: "translateY(4px)",
  },
  "70%": {
    transform: "translateY(-15px)",
  },
  "100%": {
    transform: "translateY(0)",
  },
});

export const appears = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const pulse = keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "50%": {
    transform: "scale(1.2)",
  },
  "100%": {
    transform: "scale(1)",
  },
});

export const growCircles = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(1)",
  },
  "50%": {
    opacity: 1,
    transform: "scale(1.3)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(1.295)",
  },
});

export const growCirclesWithoutDisappear = keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "50%": {
    transform: "scale(1.2)",
  },
  "100%": {
    transform: "scale(1)",
  },
});

export const pulseWave = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.1)",
  },
  "50%": {
    opacity: 1,
    transform: "scale(0.5)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(1.0)",
  },
});
