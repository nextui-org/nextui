import {TRANSITION_EASINGS} from "@nextui-org/framer-utils";

export const scaleInOut = {
  enter: {
    scale: "var(--scale-enter)",
    y: "var(--slide-enter)",
    opacity: 1,
    transition: {
      scale: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
      opacity: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
      y: {
        type: "spring",
        bounce: 0,
        duration: 0.6,
      },
    },
  },
  exit: {
    scale: "var(--scale-exit)",
    y: "var(--slide-exit)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: TRANSITION_EASINGS.ease,
    },
  },
};
