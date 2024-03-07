import {Variants} from "framer-motion";

export const transition = {
  x: {
    type: "spring",
    bounce: 0,
    duration: 0.3,
  },
  opacity: {
    easings: "ease",
    duration: 0.65,
  },
};

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: `${direction * 100}%`,
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: `${direction * -100}%`,
    opacity: 0,
  }),
};
