import { Section } from '@react-stately/collections';
import DropdownItemBase from './base/dropdown-item-base';
import DropdownTrigger from './dropdown-trigger';
import DropdownMenu from './dropdown-menu';
import DropdownButton from './dropdown-button';
import Dropdown from './dropdown';

Dropdown.Trigger = DropdownTrigger;
Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Section = Section;
Dropdown.Item = DropdownItemBase;

// export styled components
export {
  StyledDropdownMenu,
  StyledDropdownItem,
  StyledDropdownItemIconWrapper,
  StyledDropdownItemKbd,
  StyledDropdownItemContentWrapper,
  StyledDropdownItemContent,
  StyledDropdownItemDescription,
  StyledDropdownSectionWrapper,
  StyledDropdownSection,
  StyledDropdownSectionTitle
} from './dropdown.styles';

// export types
export type {
  DropdownItemVariantsProps,
  StyledDropdownItemDescriptionProps
} from './dropdown.styles';

export type { DropdownProps } from './dropdown';
export type { DropdownMenuProps } from './dropdown-menu';
export type { DropdownItemProps } from './dropdown-item';
export type { DropdownButtonProps } from './dropdown-button';
export type { DropdownSectionProps } from './dropdown-section';

export default Dropdown;
