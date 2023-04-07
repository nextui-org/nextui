import type {AriaDialogProps} from "@react-aria/dialog";

import {ReactNode, useMemo, useRef} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {motion} from "framer-motion";
import {getTransformOrigins} from "@nextui-org/aria-utils";
import {useDialog} from "@react-aria/dialog";
import {mergeProps} from "@react-aria/utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps extends AriaDialogProps {
  children: ReactNode;
}

const PopoverContent = forwardRef<PopoverContentProps, "section">((props, _) => {
  const {as, children, ...otherProps} = props;

  const {
    Component: OverlayComponent,
    placement,
    showArrow,
    motionProps,
    disableAnimation,
    getPopoverProps,
    getArrowProps,
    getDialogProps,
    onClose,
  } = usePopoverContext();

  const Component = as || OverlayComponent || "div";

  const dialogRef = useRef(null);
  const {dialogProps} = useDialog(
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
        {children}
        {arrowContent}
      </Component>
      <DismissButton onDismiss={onClose} />
    </>
  );

  return (
    <div {...getPopoverProps()}>
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
