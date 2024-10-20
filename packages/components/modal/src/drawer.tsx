import {ReactNode, useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {TRANSITION_EASINGS} from "@nextui-org/framer-transitions";
import {drawer} from "@nextui-org/theme";
import {clsx} from "@nextui-org/shared-utils";

import Modal from "./modal";
import {UseModalProps} from "./use-modal";

export type DrawerProps = Omit<UseModalProps, "placement" | "scrollBehavior"> & {
  /**
   * The content of the modal. Usually the ModalContent
   */
  children: ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  scrollBehavior?: "inside" | "outside";
};

const Drawer = forwardRef<"div", DrawerProps>(
  (
    {
      className,
      classNames,
      placement = "right",
      scrollBehavior = "inside",
      size = "md",
      motionProps: drawerMotionProps,
      children,
      ...props
    },
    ref,
  ) => {
    const motionProps = useMemo(() => {
      if (drawerMotionProps !== void 0) return drawerMotionProps;

      const key = placement === "left" || placement === "right" ? "x" : "y";

      return {
        variants: {
          enter: {
            [key]: 0,
            transition: {
              [key]: {
                bounce: 0,
                duration: 0.3,
                ease: TRANSITION_EASINGS.ease,
              },
            },
          },
          exit: {
            [key]: placement === "top" || placement === "left" ? "-100%" : "100%",
            transition: {
              [key]: {
                bounce: 0,
                duration: 0.6,
                ease: TRANSITION_EASINGS.ease,
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

    const base = slots.base({class: clsx(baseStyles, {})});

    return (
      <Modal
        ref={ref}
        {...props}
        classNames={{
          ...classNames,
          base: base,
        }}
        motionProps={motionProps}
        scrollBehavior={scrollBehavior}
        size={size}
      >
        {children}
      </Modal>
    );
  },
);

Drawer.displayName = "NextUI.Drawer";

export default Drawer;
