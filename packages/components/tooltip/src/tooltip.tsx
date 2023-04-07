import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";
import {OverlayContainer} from "@react-aria/overlays";
import {AnimatePresence, motion} from "framer-motion";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {warn} from "@nextui-org/shared-utils";
import {Children, cloneElement} from "react";
import {getTransformOrigins} from "@nextui-org/aria-utils";

import {UseTooltipProps, useTooltip} from "./use-tooltip";

export interface TooltipProps extends Omit<UseTooltipProps, "ref" | "disableTriggerFocus"> {}

const Tooltip = forwardRef<TooltipProps, "div">((props, ref) => {
  const {
    Component,
    children,
    content,
    isOpen,
    placement,
    disableAnimation,
    motionProps,
    showArrow,
    getTriggerProps,
    getTooltipProps,
    getArrowProps,
  } = useTooltip({
    ref,
    ...props,
  });

  let trigger: React.ReactElement;

  try {
    /**
     * Ensure tooltip has only one child node
     */
    const child = Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };

    trigger = cloneElement(child, getTriggerProps(child.props, child.ref));
  } catch (error) {
    trigger = <span />;
    warn("Tooltip must have only one child node. Please, check your code.");
  }

  const arrowContent = useMemo(() => {
    if (!showArrow) return null;

    return <span {...getArrowProps()} />;
  }, [showArrow, getArrowProps]);

  const animatedContent = useMemo(() => {
    const {className, ...otherTooltipProps} = getTooltipProps();

    return (
      <div {...otherTooltipProps}>
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
          <Component className={className}>
            {content}
            {arrowContent}
          </Component>
        </motion.div>
      </div>
    );
  }, [getTooltipProps, placement, motionProps, Component, content, arrowContent]);

  return (
    <>
      {trigger}
      {disableAnimation && isOpen ? (
        <OverlayContainer>
          <Component {...getTooltipProps()}>
            {content}
            {arrowContent}
          </Component>
        </OverlayContainer>
      ) : (
        <AnimatePresence initial={false}>
          {isOpen ? <OverlayContainer>{animatedContent}</OverlayContainer> : null}
        </AnimatePresence>
      )}
    </>
  );
});

Tooltip.displayName = "NextUI.Tooltip";

export default Tooltip;
