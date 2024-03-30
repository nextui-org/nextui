import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {DOMAttributes, ReactNode, useMemo, useRef, useCallback, ReactElement} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {m, domAnimation, LazyMotion} from "framer-motion";
import {useDialog} from "@react-aria/dialog";
import {mergeProps} from "@react-aria/utils";
import {HTMLNextUIProps} from "@nextui-org/system";
import {RemoveScroll} from "react-remove-scroll";
import {getTransformOrigins} from "@nextui-org/aria-utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps
  extends AriaDialogProps,
    Omit<HTMLNextUIProps, "children" | "role"> {
  children: ReactNode | ((titleProps: DOMAttributes<HTMLElement>) => ReactNode);
}

const PopoverContent = forwardRef<"div", PopoverContentProps>((props, _) => {
  const {as, children, className, ...otherProps} = props;

  const {
    Component: OverlayComponent,
    isOpen,
    placement,
    motionProps,
    backdrop,
    disableAnimation,
    shouldBlockScroll,
    getPopoverProps,
    getDialogProps,
    getBackdropProps,
    getContentProps,
    isNonModal,
    onClose,
  } = usePopoverContext();

  const Component = as || OverlayComponent || "div";

  const dialogRef = useRef(null);
  const {dialogProps, titleProps} = useDialog({}, dialogRef);

  // Not needed in the popover context, the popover role comes from getPopoverProps
  delete dialogProps.role;

  const content = (
    <>
      {!isNonModal && <DismissButton onDismiss={onClose} />}
      <Component {...getDialogProps(mergeProps(dialogProps, otherProps))} ref={dialogRef}>
        <div {...getContentProps({className})}>
          {typeof children === "function" ? children(titleProps) : children}
        </div>
      </Component>
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

  const RemoveScrollWrapper = useCallback(
    ({children}: {children: ReactElement}) => {
      return (
        <RemoveScroll forwardProps enabled={shouldBlockScroll && isOpen} removeScrollBar={false}>
          {children}
        </RemoveScroll>
      );
    },
    [shouldBlockScroll, isOpen],
  );

  const contents = disableAnimation ? (
    <RemoveScrollWrapper>{content}</RemoveScrollWrapper>
  ) : (
    <LazyMotion features={domAnimation}>
      <RemoveScrollWrapper>
        <m.div
          animate="enter"
          exit="exit"
          initial="initial"
          style={{
            ...getTransformOrigins(placement === "center" ? "top" : placement),
          }}
          variants={TRANSITION_VARIANTS.scaleSpringOpacity}
          {...motionProps}
        >
          {content}
        </m.div>
      </RemoveScrollWrapper>
    </LazyMotion>
  );

  return (
    <div {...getPopoverProps()}>
      {backdropContent}
      {contents}
    </div>
  );
});

PopoverContent.displayName = "NextUI.PopoverContent";

export default PopoverContent;
