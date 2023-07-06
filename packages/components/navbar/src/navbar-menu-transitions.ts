import {Variants} from "framer-motion";

export const menuVariants: Variants = {
  enter: {
    height: "calc(100vh - var(--navbar-height) - 1px)",
    transition: {
      duration: 0.3,
      easings: "easeOut",
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.25,
      easings: "easeIn",
    },
  },
};
