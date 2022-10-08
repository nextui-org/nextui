import {keyframes} from "@nextui-org/system";

export const expand = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.25)",
  },
  "30%": {
    opacity: 1,
  },
  "80%": {
    opacity: 0.5,
  },
  "100%": {
    transform: "scale(28)",
    opacity: 0,
  },
});
