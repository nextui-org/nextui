import type {ModalProps} from "@nextui-org/modal";

import {drawer} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useCallback, useMemo} from "react";
import {TRANSITION_EASINGS} from "@nextui-org/framer-utils";
import {clsx, isEmpty} from "@nextui-org/shared-utils";
import {PropGetter} from "@nextui-org/system";

interface Props extends Omit<ModalProps, "placement" | "scrollBehavior" | "children"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The placement of the drawer.
   */
  placement?: "top" | "right" | "bottom" | "left";
  /**
   * The scroll behavior of the drawer.
   */
  scrollBehavior?: "inside" | "outside";
}

export type UseDrawerProps = Props;

export function useDrawer(originalProps: UseDrawerProps) {
  const {
    ref,
    className,
    classNames,
    placement = "right",
    scrollBehavior = "inside",
    size = "md",
    motionProps: drawerMotionProps,
    ...otherProps
  } = originalProps;

  const domRef = useDOMRef(ref);

  const motionProps = useMemo(() => {
    if (!isEmpty(drawerMotionProps)) return drawerMotionProps;

    const key = placement === "left" || placement === "right" ? "x" : "y";

    return {
      variants: {
        enter: {
          [key]: 0,
          transition: {
            [key]: {
              duration: 0.2,
              ease: TRANSITION_EASINGS.easeOut,
            },
          },
        },
        exit: {
          [key]: placement === "top" || placement === "left" ? "-100%" : "100%",
          transition: {
            [key]: {
              duration: 0.1,
              ease: TRANSITION_EASINGS.easeIn,
            },
          },
        },
      },
    };
  }, [placement, drawerMotionProps]);

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      drawer({
        size,
        placement,
      }),
    [size, placement],
  );

  const getModalProps = useCallback<PropGetter>(() => {
    return {
      classNames: {
        ...classNames,
        base: slots.base({class: baseStyles}),
      },
      motionProps,
      scrollBehavior,
      size,
      ...otherProps,
    };
  }, [baseStyles, classNames, motionProps, scrollBehavior, size, otherProps]);

  return {domRef, getModalProps};
}

export type UseDrawerReturn = ReturnType<typeof useDrawer>;
