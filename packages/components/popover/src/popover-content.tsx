import {ReactNode, useMemo, useCallback} from "react";
import {OverlayContainer, DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {forwardRef} from "@nextui-org/system";
import {AnimatePresence, motion} from "framer-motion";
import {getTransformOrigins} from "@nextui-org/aria-utils";
import {clsx} from "@nextui-org/shared-utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps {
  children: ReactNode;
}

const PopoverContent = forwardRef<PopoverContentProps, "div">((props, ref) => {
  const {children, as, className: classNameProp, ...otherProps} = props;

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

  const {className, ...otherPopoverProps} = getPopoverProps(otherProps, ref);

  const arrowContent = useMemo(() => {
    if (!showArrow) return null;

    return <span {...getArrowProps()} />;
  }, [showArrow, getArrowProps]);

  const ContentWrapper = useCallback(
    ({children}: {children: ReactNode}) => {
      return (
        <Component className={clsx(className, classNameProp)}>
          <DismissButton onDismiss={onClose} />
          {children}
          {arrowContent}
          <DismissButton onDismiss={onClose} />
        </Component>
      );
    },
    [Component, className, classNameProp, arrowContent, onClose],
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
        <OverlayContainer>
          <ContentWrapper {...otherPopoverProps}>{children}</ContentWrapper>;
        </OverlayContainer>
      ) : (
        <AnimatePresence initial={false}>
          {isOpen ? <OverlayContainer>{animatedContent}</OverlayContainer> : null}
        </AnimatePresence>
      )}
    </>
  );
});

PopoverContent.displayName = "NextUI.PopoverContent";

export default PopoverContent;
