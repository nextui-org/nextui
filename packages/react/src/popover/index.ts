import Popover from './popover';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

export type { PopoverProps } from './popover';
export type { PopoverPlacement } from './utils';
export { StyledPopoverContent as StyledPopover } from './popover.styles';

Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;

export default Popover;
