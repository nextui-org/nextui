import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {DOMAttributes, ReactNode, useMemo, useRef} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {FocusScope} from "@react-aria/focus";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {motion} from "framer-motion";
import {getTransformOrigins} from "@nextui-org/aria-utils";
import {useDialog} from "@react-aria/dialog";
import {mergeProps} from "@react-aria/utils";
import {FocusableElement} from "@react-types/shared";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps extends AriaDialogProps {
  children: ReactNode | ((titleProps: DOMAttributes<FocusableElement>) => ReactNode);
}

const PopoverContent = forwardRef<PopoverContentProps, "section">((props, _) => {
  const {as, children, ...otherProps} = props;

  const {
    Component: OverlayComponent,
    placement,
    showArrow,
    motionProps,
    backdropVariant,
    disableAnimation,
    getPopoverProps,
    getArrowProps,
    getDialogProps,
    getBackdropProps,
    onClose,
  } = usePopoverContext();

  const Component = as || OverlayComponent || "div";

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
        <FocusScope contain restoreFocus>
          {typeof children === "function" ? children(titleProps) : children}
        </FocusScope>
        {arrowContent}
      </Component>
      <DismissButton onDismiss={onClose} />
    </>
  );

  const backdrop = useMemo(() => {
    if (backdropVariant === "transparent") {
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
  }, [backdropVariant, disableAnimation, getBackdropProps]);

  return (
    <div {...getPopoverProps()}>
      {backdrop}
      {disableAnimation ? (
        content
      ) : (
        <motion.div
          animate="enter"
          exit="exit"
          initial="exit"
          style={{
            ...getTransformOrigins(placement),
          }}
          variants={TRANSITION_VARIANTS.scaleSpring}
          {...motionProps}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
});

PopoverContent.displayName = "NextUI.PopoverContent";

export default PopoverContent;
