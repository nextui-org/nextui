import {Variants} from "framer-motion";

export const menuVariants: Variants = {
  open: {
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.15,
      staggerChildren: 0.05,
    },
  },
  closed: {
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

export const menuItemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};
