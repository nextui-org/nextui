/**
 * Part of this code is taken from @chakra-ui/system ❤️
 */

import {warn, isNumeric} from "@nextui-org/shared-utils";
import {AnimatePresence, HTMLMotionProps, motion, Variants as _Variants} from "framer-motion";
import {forwardRef, useEffect, useState} from "react";

import {TRANSITION_EASINGS, Variants, WithTransitionConfig, withDelay} from "./transition-utils";

export interface CollapseTransitionOptions {
  /**
   * If `true`, the opacity of the content will be animated
   * @default true
   */
  animateOpacity?: boolean;
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  startingHeight?: number;
  /**
   * The height you want the content in its expanded state.
   * @default "auto"
   */
  endingHeight?: number | string;
  /**
   * The y-axis offset you want the content in its collapsed state.
   * @default 10
   */
  startingY?: number;
  /**
   * The y-axis offset you want the content in its expanded state.
   * @default 0
   */
  endingY?: number;
}

const defaultTransitions = {
  exit: {
    height: {
      duration: 0.2,
      ease: TRANSITION_EASINGS.ease,
    },
    opacity: {
      duration: 0.3,
      ease: TRANSITION_EASINGS.ease,
    },
  },
  enter: {
    height: {
      duration: 0.4,
      ease: TRANSITION_EASINGS.softSpring,
    },
    opacity: {
      duration: 0.8,
      ease: TRANSITION_EASINGS.ease,
    },
    y: {
      duration: 0.5,
      ease: TRANSITION_EASINGS.ease,
    },
  },
};

const variants: Variants<CollapseTransitionOptions> = {
  enter: ({animateOpacity, endingHeight, endingY, transition, transitionEnd, delay}) => ({
    ...(animateOpacity && {opacity: 1}),
    y: endingY,
    height: endingHeight,
    transitionEnd: transitionEnd?.enter,
    transition: transition?.enter ?? withDelay.enter(defaultTransitions.enter, delay),
  }),
  exit: ({animateOpacity, startingHeight, transition, startingY, transitionEnd, delay}) => ({
    ...(animateOpacity && {opacity: isNumeric(startingHeight) ? 1 : 0}),
    y: startingY,
    height: startingHeight,
    transitionEnd: transitionEnd?.exit,
    transition: transition?.exit ?? withDelay.exit(defaultTransitions.exit, delay),
  }),
};

export type ICollapseTransition = CollapseTransitionProps;

export interface CollapseTransitionProps
  extends WithTransitionConfig<HTMLMotionProps<"div">>,
    CollapseTransitionOptions {}

export const CollapseTransition = forwardRef<HTMLDivElement, CollapseTransitionProps>(
  (props, ref) => {
    const {
      in: isOpen,
      unmountOnExit,
      animateOpacity = true,
      startingHeight = 0,
      endingHeight = "auto",
      startingY = 10,
      endingY = 0,
      style,
      className,
      transition,
      transitionEnd,
      ...rest
    } = props;

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setMounted(true);
      });

      return () => clearTimeout(timeout);
    }, []);

    /**
     * Warn 🚨: `startingHeight` and `unmountOnExit` are mutually exclusive
     *
     * If you specify a starting height, the collapsed needs to be mounted
     * for the height to take effect.
     */

    if (Boolean(startingHeight > 0 && unmountOnExit)) {
      warn(
        `startingHeight and unmountOnExit are mutually exclusive. You can't use them together`,
        "FramerTransitions - Collapse",
      );
    }

    const hasStartingHeight = parseFloat(startingHeight.toString()) > 0;

    const custom = {
      startingHeight,
      endingHeight,
      startingY,
      endingY,
      animateOpacity,
      transition: !mounted ? {enter: {duration: 0}} : transition,
      transitionEnd: {
        enter: transitionEnd?.enter,
        exit: unmountOnExit
          ? transitionEnd?.exit
          : {
              ...transitionEnd?.exit,
              display: hasStartingHeight ? "block" : "none",
            },
      },
    };

    const show = unmountOnExit ? isOpen : true;
    const animate = isOpen || unmountOnExit ? "enter" : "exit";

    return (
      <AnimatePresence custom={custom} initial={false}>
        {show && (
          <motion.div
            ref={ref}
            {...rest}
            animate={animate}
            className={className}
            custom={custom}
            exit="exit"
            initial={unmountOnExit ? "exit" : false}
            style={{
              overflow: "hidden",
              display: "block",
              ...style,
            }}
            variants={variants as _Variants}
          />
        )}
      </AnimatePresence>
    );
  },
);

CollapseTransition.displayName = "NextUI.CollapseTransition";
