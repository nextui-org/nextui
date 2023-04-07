import {ReactNode, useMemo, useCallback} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {FocusScope} from "@react-aria/focus";
import {motion} from "framer-motion";
import {getTransformOrigins} from "@nextui-org/aria-utils";

import {usePopoverContext} from "./popover-context";

export interface PopoverContentProps {
  children: ReactNode;
}

const PopoverContent = forwardRef<PopoverContentProps, "section">((props, _) => {
  const {as, children, ...otherProps} = props;

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

  const {style, className, ...otherPopoverProps} = getPopoverProps(otherProps);

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
    [Component, className, onClose, arrowContent],
  );

  const visibility = useMemo(() => {
    if (disableAnimation) return isOpen ? "visible" : "hidden";

    return "visible";
  }, [disableAnimation, isOpen]);

  return (
    <div
      {...otherPopoverProps}
      style={{
        ...style,
        visibility,
        outline: "none",
      }}
    >
      {disableAnimation ? (
        <ContentWrapper>{children}</ContentWrapper>
      ) : (
        <motion.div
          animate={isOpen ? "enter" : "exit"}
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
      )}
    </div>
  );
});

PopoverContent.displayName = "NextUI.PopoverContent";

export default PopoverContent;
