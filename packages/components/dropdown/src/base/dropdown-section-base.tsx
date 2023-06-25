import type {DropdownSectionSlots, SlotsToClasses} from "@nextui-org/theme";

import {BaseSection, SectionProps} from "@nextui-org/aria-utils";
import {DividerProps} from "@nextui-org/divider";

import {DropdownItemProps} from "../dropdown-item";

export interface DropdownSectionBaseProps<T extends object = {}> extends SectionProps<"ul", T> {
  /**
   * The dropdown section classNames.
   */
  classNames?: SlotsToClasses<DropdownSectionSlots>;
  /**
   * The dropdown items classNames.
   */
  itemClasses?: DropdownItemProps["classNames"];
  /**
   * Shows a divider between sections
   * @default false
   */
  showDivider?: boolean;
  /**
   * The divider props
   */
  dividerProps?: DividerProps;
}

const DropdownSectionBase = BaseSection as (props: DropdownSectionBaseProps) => JSX.Element;

export default DropdownSectionBase;
