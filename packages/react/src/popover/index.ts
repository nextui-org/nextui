import Popover from "./popover";
import PopoverTrigger from "./popover-trigger";
import PopoverContent from "./popover-content";

export type {PopoverProps} from "./popover";
export type {PopoverPlacement} from "./utils";
export {StyledPopoverContent as StyledPopoverContent} from "./popover.styles";

Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;

export default Popover;
