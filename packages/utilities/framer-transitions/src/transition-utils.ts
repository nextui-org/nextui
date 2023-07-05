/**
 * Part of this code is taken from @chakra-ui/system ❤️
 */

import type {Target, TargetAndTransition, Transition} from "framer-motion";

export type TransitionProperties = {
  /**
   * Custom `transition` definition for `enter` and `exit`
   */
  transition?: TransitionConfig;
  /**
   * Custom `transitionEnd` definition for `enter` and `exit`
   */
  transitionEnd?: TransitionEndConfig;
  /**
   * Custom `delay` definition for `enter` and `exit`
   */
  delay?: number | DelayConfig;
};

type TargetResolver<P = {}> = (props: P & TransitionProperties) => TargetAndTransition;

type Variant<P = {}> = TargetAndTransition | TargetResolver<P>;

export type Variants<P = {}> = {
  enter: Variant<P>;
  exit: Variant<P>;
  initial?: Variant<P>;
};

type WithMotionState<P> = Partial<Record<"enter" | "exit", P>>;

export type TransitionConfig = WithMotionState<Transition>;

export type TransitionEndConfig = WithMotionState<Target>;

export type DelayConfig = WithMotionState<number>;

export const TRANSITION_EASINGS = {
  ease: [0.36, 0.66, 0.4, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: [0.155, 1.105, 0.295, 1.12],
  springOut: [0.57, -0.15, 0.62, 0.07],
  softSpring: [0.16, 1.11, 0.3, 1.02],
} as const;

export const TRANSITION_VARIANTS = {
  scaleSpring: {
    initial: {
      opacity: 0,
      transform: "scale(0.6)",
    },
    enter: {
      opacity: 1,
      transform: "scale(1)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transform: "scale(0.3)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      },
    },
  },
  scaleSpringFast: {
    enter: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        ease: TRANSITION_EASINGS.spring,
        duration: 0.3,
      },
    },
    exit: {
      transform: "scale(0.6)",
      opacity: 0,
      transition: {
        type: "easeOut",
        duration: 0.2,
      },
    },
  },
  scale: {
    enter: {scale: 1},
    exit: {scale: 0.95},
  },
  scaleFadeIn: {
    enter: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: TRANSITION_EASINGS.easeIn,
      },
    },
    exit: {
      transform: "scale(0.95)",
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: TRANSITION_EASINGS.easeOut,
      },
    },
  },
  scaleInOut: {
    enter: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
    },
    exit: {
      transform: "scale(1.03)",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: TRANSITION_EASINGS.ease,
      },
    },
  },
  fade: {
    enter: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: TRANSITION_EASINGS.ease,
      },
    },
  },
  pushLeft: {
    enter: {x: "100%"},
    exit: {x: "-30%"},
  },
  pushRight: {
    enter: {x: "-100%"},
    exit: {x: "30%"},
  },
  pushUp: {
    enter: {y: "100%"},
    exit: {y: "-30%"},
  },
  pushDown: {
    enter: {y: "-100%"},
    exit: {y: "30%"},
  },
  slideLeft: {
    position: {left: 0, top: 0, bottom: 0, width: "100%"},
    enter: {x: 0, y: 0},
    exit: {x: "-100%", y: 0},
  },
  slideRight: {
    position: {right: 0, top: 0, bottom: 0, width: "100%"},
    enter: {x: 0, y: 0},
    exit: {x: "100%", y: 0},
  },
  slideUp: {
    position: {top: 0, left: 0, right: 0, maxWidth: "100vw"},
    enter: {x: 0, y: 0},
    exit: {x: 0, y: "-100%"},
  },
  slideDown: {
    position: {bottom: 0, left: 0, right: 0, maxWidth: "100vw"},
    enter: {x: 0, y: 0},
    exit: {x: 0, y: "100%"},
  },
};

export type SlideDirection = "top" | "left" | "bottom" | "right";

export function getSlideTransition(options?: {direction?: SlideDirection}) {
  const side = options?.direction ?? "right";

  switch (side) {
    case "right":
      return TRANSITION_VARIANTS.slideRight;
    case "left":
      return TRANSITION_VARIANTS.slideLeft;
    case "bottom":
      return TRANSITION_VARIANTS.slideDown;
    case "top":
      return TRANSITION_VARIANTS.slideUp;
    default:
      return TRANSITION_VARIANTS.slideRight;
  }
}

export const TRANSITION_DEFAULTS = {
  enter: {
    duration: 0.2,
    ease: TRANSITION_EASINGS.easeOut,
  },
  exit: {
    duration: 0.1,
    ease: TRANSITION_EASINGS.easeIn,
  },
} as const;

export type WithTransitionConfig<P extends object> = Omit<P, "transition"> &
  TransitionProperties & {
    /**
     * If `true`, the element will unmount when `in={false}` and animation is done
     */
    unmountOnExit?: boolean;
    /**
     * Show the component; triggers when enter or exit states
     */
    in?: boolean;
  };

export const withDelay = {
  enter: (
    transition: Transition,
    delay?: number | DelayConfig,
  ): Transition & {delay: number | undefined} => ({
    ...transition,
    delay: typeof delay === "number" ? delay : delay?.["enter"],
  }),
  exit: (
    transition: Transition,
    delay?: number | DelayConfig,
  ): Transition & {delay: number | undefined} => ({
    ...transition,
    delay: typeof delay === "number" ? delay : delay?.["exit"],
  }),
};
