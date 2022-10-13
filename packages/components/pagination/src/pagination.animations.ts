import {keyframes} from "@nextui-org/system";

export const scale = keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "60%": {
    transform: "scale($$paginationScaleTransform)",
  },
  "100%": {
    transform: "scale(1)",
  },
});
