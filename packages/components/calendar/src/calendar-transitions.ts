import {Variants} from "framer-motion";

export const transition = {
  x: {
    type: "spring",
    bounce: 0,
    duration: 0.25,
  },
  opacity: {
    easings: "ease",
    duration: 0.3,
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
