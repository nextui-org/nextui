import {forwardRef} from "@nextui-org/system";
import {warn} from "@nextui-org/shared-utils";
import {cloneElement, Children, useMemo} from "react";
import {OverlayContainer} from "@react-aria/overlays";
import {AnimatePresence, motion} from "framer-motion";

import {UseTooltipProps, useTooltip} from "./use-tooltip";
import {scale} from "./tooltip-transition";
import {getOrigins} from "./utils";

export interface TooltipProps extends Omit<UseTooltipProps, "ref"> {}

const Tooltip = forwardRef<TooltipProps, "div">((props, ref) => {
  const {
    Component,
    children,
    content,
    isOpen,
    placement,
    disableAnimation,
    motionProps,
    getTriggerProps,
    getTooltipProps,
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

  const contentComponent = useMemo(() => {
    if (disableAnimation) {
      return <Component {...getTooltipProps()}>{content}</Component>;
    }

    const {className, ...otherTooltipProps} = getTooltipProps();

    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <div {...otherTooltipProps}>
            <motion.div
              animate="enter"
              exit="exit"
              initial="exit"
              style={{
                ...getOrigins(placement),
              }}
              variants={scale}
              {...motionProps}
            >
              <Component className={className}>{content}</Component>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }, [isOpen, content, disableAnimation, children, motionProps, getTooltipProps]);

  return (
    <>
      {trigger}
      <OverlayContainer>
        {/* <CSSTransition {...transitionProps}>
            <Component {...getTooltipProps()}>{content}</Component>
          </CSSTransition> */}
        {contentComponent}
      </OverlayContainer>
    </>
  );
});

Tooltip.displayName = "NextUI.Tooltip";

export default Tooltip;
