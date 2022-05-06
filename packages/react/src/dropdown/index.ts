import { Item, Section } from '@react-stately/collections';
import Popover from '../popover';
import Dropdown from './dropdown';

Dropdown.Trigger = Popover.Trigger;
Dropdown.Content = Popover.Content;
Dropdown.Section = Section;
Dropdown.Item = Item;

export default Dropdown;
