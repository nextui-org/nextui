import {keyframes} from "@nextui-org/system";

export const blink = keyframes({
  "0%": {
    opacity: "0.2",
  },
  "20%": {
    opacity: 1,
  },
  "100%": {
    opacity: "0.2",
  },
});

export const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const points = keyframes({
  "0%": {
    transform: "translate(0px, 0px)",
  },
  "50%": {
    transform: "translate(0, calc(-$$loadingSize * 1.4))",
  },
  "100%": {
    transform: "translate(0px, 0px)",
  },
});
