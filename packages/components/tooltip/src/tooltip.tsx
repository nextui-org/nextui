import {forwardRef} from "@nextui-org/system";
import {warn, __DEV__} from "@nextui-org/shared-utils";
import {cloneElement, Children} from "react";
import {OverlayContainer} from "@react-aria/overlays";
import {CSSTransition} from "@nextui-org/react-utils";

import {UseTooltipProps, useTooltip} from "./use-tooltip";

export interface TooltipProps extends Omit<UseTooltipProps, "ref"> {}

const Tooltip = forwardRef<TooltipProps, "div">((props, ref) => {
  const {
    Component,
    children,
    content,
    mountOverlay,
    transitionProps,
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

  return (
    <>
      {trigger}
      {mountOverlay && (
        <OverlayContainer>
          <CSSTransition {...transitionProps}>
            <Component {...getTooltipProps()}>{content}</Component>
          </CSSTransition>
        </OverlayContainer>
      )}
    </>
  );
});

if (__DEV__) {
  Tooltip.displayName = "NextUI.Tooltip";
}

export default Tooltip;
