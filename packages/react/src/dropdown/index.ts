import { Item, Section } from '@react-stately/collections';
import Popover from '../popover';
import Dropdown from './dropdown';
import DropdownContent from './dropdown-content';

Dropdown.Trigger = Popover.Trigger;
Dropdown.Content = DropdownContent;
Dropdown.Section = Section;
Dropdown.Item = Item;

export default Dropdown;
