import {Children, ReactNode, forwardRef} from "react";
import {AnimatePresence} from "framer-motion";
import {Overlay} from "@react-aria/overlays";

import {UsePopoverProps, usePopover} from "./use-popover";
import {PopoverProvider} from "./popover-context";

export interface PopoverProps extends Omit<UsePopoverProps, "ref"> {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children: ReactNode[];
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
  const {children, ...otherProps} = props;
  const context = usePopover({ref, ...otherProps});

  const [trigger, content] = Children.toArray(children);

  const overlay = <Overlay portalContainer={context.portalContainer}>{content}</Overlay>;

  return (
    <PopoverProvider value={context}>
      {trigger}
      {context.disableAnimation && context.isOpen ? (
        overlay
      ) : (
        <AnimatePresence>{context.isOpen ? overlay : null}</AnimatePresence>
      )}
    </PopoverProvider>
  );
});

Popover.displayName = "NextUI.Popover";

export default Popover;
