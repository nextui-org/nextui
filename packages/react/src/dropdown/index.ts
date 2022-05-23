import { Section } from '@react-stately/collections';
import { DropdownTrigger } from './dropdown-trigger';
import DropdownMenu from './dropdown-menu';
import Dropdown from './dropdown';
import DropdownItemBase from './base/dropdown-item-base';

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Section = Section;
Dropdown.Item = DropdownItemBase;

export default Dropdown;
