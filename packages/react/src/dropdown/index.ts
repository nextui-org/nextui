import { Section } from '@react-stately/collections';
import DropdownItemBase from './base/dropdown-item-base';
import DropdownTrigger from './dropdown-trigger';
import DropdownMenu from './dropdown-menu';
import DropdownButton from './dropdown-button';
import Dropdown from './dropdown';

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Section = Section;
Dropdown.Item = DropdownItemBase;
Dropdown.Button = DropdownButton;

export default Dropdown;
