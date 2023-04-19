import {Variants} from "framer-motion";

export const menuVariants: Variants = {
  open: {
    transition: {staggerChildren: 0.07, delayChildren: 0.15},
  },
  closed: {
    transition: {staggerChildren: 0.05, staggerDirection: -1},
  },
};

export const menuItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
};
