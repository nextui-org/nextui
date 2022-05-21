import { Item, Section } from '@react-stately/collections';
import { DropdownTrigger } from './dropdown-trigger';
import DropdownMenu from './dropdown-menu';
import Dropdown from './dropdown';

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Section = Section;
Dropdown.Item = Item;

export default Dropdown;
