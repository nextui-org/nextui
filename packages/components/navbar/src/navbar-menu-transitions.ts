import {TRANSITION_EASINGS} from "@nextui-org/framer-transitions";
import {Variants} from "framer-motion";

export const menuVariants: Variants = {
  enter: {
    height: "calc(100vh - var(--navbar-height) - 1px)",
    transition: {
      duration: 0.4,
      ease: TRANSITION_EASINGS.ease,
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.3,
      ease: TRANSITION_EASINGS.ease,
    },
  },
};
