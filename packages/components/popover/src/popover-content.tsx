import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {DOMAttributes, ReactNode, useMemo, useRef} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {motion} from "framer-motion";
import {getTransformOrigins} from "@nextui-org/aria-utils";
import {useDialog} from "@react-aria/dialog";
import {mergeProps} from "@react-aria/utils";
import {RemoveScroll} from "react-remove-scroll";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps extends AriaDialogProps {
  children: ReactNode | ((titleProps: DOMAttributes<HTMLElement>) => ReactNode);
}

const PopoverContent = forwardRef<PopoverContentProps, "section">((props, _) => {
  const {as, children, ...otherProps} = props;

  const {
    Component: OverlayComponent,
    placement,
    showArrow,
    motionProps,
    backdrop,
    disableAnimation,
    shouldBlockScroll,
    getPopoverProps,
    getArrowProps,
    getDialogProps,
    getBackdropProps,
    onClose,
  } = usePopoverContext();

  const Component = as || OverlayComponent || "section";

  const dialogRef = useRef(null);
  const {dialogProps, titleProps} = useDialog(
    {
      role: "dialog",
    },
    dialogRef,
  );

  const arrowContent = useMemo(() => {
    if (!showArrow) return null;

    return <span {...getArrowProps()} />;
  }, [showArrow, getArrowProps]);

  const content = (
    <>
      <DismissButton onDismiss={onClose} />
      <Component {...getDialogProps(mergeProps(dialogProps, otherProps))} ref={dialogRef}>
        {typeof children === "function" ? children(titleProps) : children}
        {arrowContent}
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
    <div {...getPopoverProps()}>
      {backdropContent}
      <RemoveScroll forwardProps enabled={shouldBlockScroll} removeScrollBar={false}>
        {disableAnimation ? (
          content
        ) : (
          <motion.div
            animate="enter"
            exit="exit"
            initial="exit"
            style={{
              ...getTransformOrigins(placement === "center" ? "top" : placement),
            }}
            variants={TRANSITION_VARIANTS.scaleSpring}
            {...motionProps}
          >
            {content}
          </motion.div>
        )}
      </RemoveScroll>
    </div>
  );
});

PopoverContent.displayName = "NextUI.PopoverContent";

export default PopoverContent;
