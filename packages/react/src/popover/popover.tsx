import React, {RefObject, ReactNode, RefAttributes, PropsWithoutRef} from "react";
import {OverlayContainer} from "@react-aria/overlays";

import {__DEV__} from "../utils/assertion";

import {usePopover, UsePopoverProps} from "./use-popover";
import {PopoverProvider} from "./popover-context";
import PopoverTrigger from "./popover-trigger";
import PopoverContent from "./popover-content";

export interface PopoverProps extends UsePopoverProps {
  /**
   * The content of the popover. It is usually the `Popover.Trigger`,
   * and `Popover.Content`
   */
  children: ReactNode[];
}

const Popover = React.forwardRef((props: PopoverProps, ref: RefObject<HTMLElement>) => {
  const {children, ...otherProps} = props;
  const context = usePopover({ref, ...otherProps});

  const [trigger, content] = React.Children.toArray(children);

  const mountOverlay = context.state.isOpen || !context.exited;

  return (
    <PopoverProvider value={context}>
      {trigger}
      {mountOverlay && <OverlayContainer>{content}</OverlayContainer>}
    </PopoverProvider>
  );
});

if (__DEV__) {
  Popover.displayName = "NextUI.Popover";
}

Popover.toString = () => ".nextui-popover";

type PopoverComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
};

export default Popover as PopoverComponent<HTMLElement, PopoverProps>;
