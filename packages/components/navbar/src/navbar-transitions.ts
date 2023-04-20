import {TRANSITION_EASINGS} from "@nextui-org/framer-transitions";
import {Variants} from "framer-motion";

export const variants: Variants = {
  visible: {
    y: 0,
    transition: {
      ease: TRANSITION_EASINGS.easeOut,
    },
  },
  hidden: {
    y: "-100%",
    transition: {
      ease: TRANSITION_EASINGS.easeIn,
    },
  },
};
