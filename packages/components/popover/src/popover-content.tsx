import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {DOMAttributes, ReactNode, useMemo, useRef} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-utils";
import {m, domAnimation, LazyMotion} from "framer-motion";
import {HTMLNextUIProps} from "@nextui-org/system";
import {RemoveScroll} from "react-remove-scroll";
import {getTransformOrigins} from "@nextui-org/aria-utils";
import {useDialog} from "@react-aria/dialog";

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
  const dialogProps = getDialogProps({
    ref: dialogRef,
    ...ariaDialogProps,
    ...otherProps,
  });

  const Component = as || OverlayComponent || "div";

  const content = (
    <>
      {!isNonModal && <DismissButton onDismiss={onClose} />}
      <Component {...dialogProps}>
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

  const contents = (
    <RemoveScroll enabled={shouldBlockScroll && isOpen} removeScrollBar={false}>
      {disableAnimation ? (
        content
      ) : (
        <LazyMotion features={domAnimation}>
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
        </LazyMotion>
      )}
    </RemoveScroll>
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
