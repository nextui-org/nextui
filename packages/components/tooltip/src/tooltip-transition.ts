import {Variants} from "framer-motion";

export const scale: Variants = {
  exit: {
    scale: 0.6,
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.15,
        easings: "easeInOut",
      },
      scale: {
        duration: 0.2,
        easings: "easeInOut",
      },
    },
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: {
        easings: "easeOut",
        duration: 0.2,
      },
      scale: {
        type: "spring",
        stiffness: 800,
        damping: 35,
      },
    },
  },
};
