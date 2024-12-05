import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {DOMAttributes, ReactNode, useMemo, useRef} from "react";
import {RemoveScroll} from "react-remove-scroll";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-utils";
import {m, LazyMotion} from "framer-motion";
import {HTMLNextUIProps} from "@nextui-org/system";
import {getTransformOrigins} from "@nextui-org/aria-utils";
import {useDialog} from "@react-aria/dialog";
import * as React from "react";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps
  extends AriaDialogProps,
    Omit<HTMLNextUIProps, "children" | "role"> {
  children: ReactNode | ((titleProps: DOMAttributes<HTMLElement>) => ReactNode);
}

const domAnimation = () => import("@nextui-org/dom-animation").then((res) => res.default);

const PopoverContent = (props: PopoverContentProps) => {
  const {as, children, className, ...otherProps} = props;

  const {
    Component: OverlayComponent,
    isOpen,
    placement,
    backdrop,
    motionProps,
    disableAnimation,
    shouldBlockScroll,
    getPopoverProps,
    getDialogProps,
    getBackdropProps,
    getContentProps,
    isNonModal,
    onClose,
  } = usePopoverContext();

  const dialogRef = useRef(null);
  const {dialogProps: ariaDialogProps, titleProps} = useDialog({}, dialogRef);

  const Component = as || OverlayComponent || "div";

  const content = (
    <>
      {!isNonModal && <DismissButton onDismiss={onClose} />}
      {React.createElement(
        Component,
        getDialogProps({ref: dialogRef, ...ariaDialogProps, ...otherProps}),
        <div {...getContentProps()} className={className}>
          {typeof children === "function" ? children(titleProps) : children}
        </div>,
      )}
      <DismissButton onDismiss={onClose} />
    </>
  );

  const backdropContent = useMemo(() => {
    if (backdrop === "transparent") {
      return null;
    }

    if (disableAnimation) {
      return <div {...getBackdropProps()} />;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          animate="enter"
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.fade}
          {...(getBackdropProps() as HTMLMotionProps<"div">)}
        />
      </LazyMotion>
    );
  }, [backdrop, disableAnimation, getBackdropProps]);

  const contents = React.createElement(
    RemoveScroll as React.ComponentType<any>,
    {
      enabled: shouldBlockScroll && isOpen,
      removeScrollBar: false,
      key: null,
    },
    disableAnimation
      ? content
      : React.createElement(
          LazyMotion,
          {features: domAnimation},
          React.createElement(
            m.div,
            {
              key: null,
              animate: "enter",
              exit: "exit",
              initial: "initial",
              style: {
                ...getTransformOrigins(placement === "center" ? "top" : placement),
              },
              variants: TRANSITION_VARIANTS.scaleSpringOpacity,
              ...motionProps,
            },
            content,
          ),
        ),
  );

  return (
    <div {...getPopoverProps()}>
      {backdropContent}
      {contents}
    </div>
  );
};

PopoverContent.displayName = "NextUI.PopoverContent";

export default PopoverContent;
