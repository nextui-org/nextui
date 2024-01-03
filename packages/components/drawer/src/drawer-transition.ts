import {TRANSITION_EASINGS} from "@nextui-org/framer-transitions";

export function genTransition(placement: string) {
  if (placement === "left" || placement === "right") {
    return {
      enter: {
        x: 0,
        transition: {
          x: {
            bounce: 0,
            duration: 0.3,
            ease: TRANSITION_EASINGS.ease,
          },
        },
      },
      exit: {
        x: placement === "left" ? "-100%" : "100%",
        transition: {
          x: {
            bounce: 0,
            duration: 0.3,
            ease: TRANSITION_EASINGS.ease,
          },
        },
      },
    };
  }

  return {
    enter: {
      y: 0,
      transition: {
        y: {
          bounce: 0,
          duration: 0.3,
          ease: TRANSITION_EASINGS.ease,
        },
      },
    },
    exit: {
      y: placement === "top" ? "-100%" : "100%",
      transition: {
        y: {
          bounce: 0,
          duration: 0.3,
          ease: TRANSITION_EASINGS.ease,
        },
      },
    },
  };
}
