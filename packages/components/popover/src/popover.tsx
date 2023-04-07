import {forwardRef} from "@nextui-org/system";
import {OverlayContainer} from "@react-aria/overlays";
import {Children, ReactNode} from "react";

import {UsePopoverProps, usePopover} from "./use-popover";
import {PopoverProvider} from "./popover-context";

export interface PopoverProps extends Omit<UsePopoverProps, "ref"> {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `Popover.Content`
   */
  children: ReactNode[];
}

const Popover = forwardRef<PopoverProps, "div">((props, ref) => {
  const {children, ...otherProps} = props;
  const context = usePopover({ref, ...otherProps});

  const [trigger, content] = Children.toArray(children);

  const mountOverlay = context.isOpen;

  return (
    <PopoverProvider value={context}>
      {trigger}
      {mountOverlay && <OverlayContainer>{content}</OverlayContainer>}
    </PopoverProvider>
  );
});

Popover.displayName = "NextUI.Popover";

export default Popover;
