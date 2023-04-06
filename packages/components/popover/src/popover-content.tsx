import {ReactNode, useMemo, useCallback} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {FocusScope} from "@react-aria/focus";
import {AnimatePresence, motion} from "framer-motion";
import {getTransformOrigins} from "@nextui-org/aria-utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps {
  children: ReactNode;
}

const PopoverContent = forwardRef<PopoverContentProps, "section">((props, _) => {
  const {as, children} = props;

  const {
    Component: OverlayComponent,
    isOpen,
    placement,
    showArrow,
    motionProps,
    disableAnimation,
    getPopoverProps,
    getArrowProps,
    onClose,
  } = usePopoverContext();

  const Component = as || OverlayComponent || "div";

  const {className, ...otherPopoverProps} = getPopoverProps();

  const arrowContent = useMemo(() => {
    if (!showArrow) return null;

    return <span {...getArrowProps()} />;
  }, [showArrow, getArrowProps]);

  const ContentWrapper = useCallback(
    ({children}: {children: ReactNode}) => {
      return (
        <FocusScope restoreFocus>
          <Component className={className}>
            <DismissButton onDismiss={onClose} />
            {children}
            {arrowContent}
            <DismissButton onDismiss={onClose} />
          </Component>
        </FocusScope>
      );
    },
    [Component, disableAnimation, className, arrowContent, onClose],
  );

  const animatedContent = useMemo(() => {
    return (
      <div {...otherPopoverProps}>
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
          <ContentWrapper>{children}</ContentWrapper>
        </motion.div>
      </div>
    );
  }, [otherPopoverProps, placement, motionProps, ContentWrapper, children]);

  return (
    <>
      {disableAnimation && isOpen ? (
        <ContentWrapper>{children}</ContentWrapper>
      ) : (
        <AnimatePresence initial={false}>{isOpen ? animatedContent : null}</AnimatePresence>
      )}
    </>
  );
});

PopoverContent.displayName = "NextUI.PopoverContent";

export default PopoverContent;
