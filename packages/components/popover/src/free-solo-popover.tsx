/**
 * FreeSoloPopover
 *
 * This is a popover that is not tied to a trigger. It is used for the free solo
 * select component.
 *
 * @internal
 */

import * as React from "react";
import {DismissButton, Overlay} from "@react-aria/overlays";
import {forwardRef} from "@nextui-org/system";
import {HTMLMotionProps, motion} from "framer-motion";
import {mergeProps} from "@react-aria/utils";
import {getTransformOrigins} from "@nextui-org/aria-utils";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";

import {usePopover, UsePopoverProps, UsePopoverReturn} from "./use-popover";

export interface FreeSoloPopoverProps extends UsePopoverProps {
  children: React.ReactNode;
}

type FreeSoloPopoverWrapperProps = {
  children: React.ReactNode;
  disableAnimation: boolean;
  placement: UsePopoverReturn["placement"];
  motionProps?: UsePopoverProps["motionProps"];
} & React.HTMLAttributes<HTMLDivElement>;

const FreeSoloPopoverWrapper = ({
  children,
  motionProps,
  placement,
  disableAnimation,
  style = {},
  ...otherProps
}: FreeSoloPopoverWrapperProps) => {
  return disableAnimation ? (
    <div {...otherProps}>{children}</div>
  ) : (
    <motion.div
      animate="enter"
      exit="exit"
      initial="initial"
      style={{
        ...style,
        ...getTransformOrigins(placement === "center" ? "top" : placement),
      }}
      variants={TRANSITION_VARIANTS.scaleSpringOpacity}
      {...mergeProps(otherProps, motionProps)}
    >
      {children}
    </motion.div>
  );
};

const FreeSoloPopover = forwardRef<"div", FreeSoloPopoverProps>((props, ref) => {
  const {
    Component,
    state,
    children,
    placement,
    backdrop,
    showArrow,
    portalContainer,
    disableAnimation,
    motionProps,
    isNonModal,
    getPopoverProps,
    getBackdropProps,
    getDialogProps,
    getArrowProps,
  } = usePopover({
    ...props,
    ref,
  });

  const arrowContent = React.useMemo(() => {
    if (!showArrow) return null;

    return <span {...getArrowProps()} />;
  }, [showArrow, getArrowProps]);

  const backdropContent = React.useMemo(() => {
    if (backdrop === "transparent") {
      return null;
    }

    if (disableAnimation) {
      return <div {...getBackdropProps()} />;
    }

    return (
      <motion.div
        animate="enter"
        exit="exit"
        initial="exit"
        variants={TRANSITION_VARIANTS.fade}
        {...(getBackdropProps() as HTMLMotionProps<"div">)}
      />
    );
  }, [backdrop, disableAnimation, getBackdropProps]);

  return (
    <Overlay portalContainer={portalContainer}>
      {!isNonModal && backdropContent}
      <Component {...getPopoverProps()}>
        <FreeSoloPopoverWrapper
          disableAnimation={disableAnimation}
          motionProps={motionProps}
          placement={placement}
          tabIndex={-1}
          {...getDialogProps()}
        >
          {!isNonModal && <DismissButton onDismiss={state.close} />}
          {children}
          {arrowContent}
          <DismissButton onDismiss={state.close} />
        </FreeSoloPopoverWrapper>
      </Component>
    </Overlay>
  );
});

FreeSoloPopover.displayName = "NextUI.FreeSoloPopover";

export default FreeSoloPopover;
