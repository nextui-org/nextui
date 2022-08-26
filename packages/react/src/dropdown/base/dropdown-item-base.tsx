import {ReactNode} from "react";
import {Item} from "@react-stately/collections";
import {ItemProps} from "@react-types/shared";

import {SimpleColors, NormalWeights, DropdownVariants} from "../../utils/prop-types";
import {CSS} from "../../theme/stitches.config";

export type DropdownItemBaseProps<T = object> = ItemProps<T> & {
  as?: keyof JSX.IntrinsicElements;
  css?: CSS;
  color?: SimpleColors;
  variant?: DropdownVariants;
  textColor?: SimpleColors;
  withDivider?: boolean;
  dividerWeight?: NormalWeights;
  command?: string;
  description?: string;
  icon?: ReactNode;
  /**
   * Whether the item description should be truncated or not.
   */
  showFullDescription?: boolean;
  className?: string;
};

const DropdownItem = Item as (props: DropdownItemBaseProps) => JSX.Element;

DropdownItem.toString = () => ".nextui-dropdown-item-base";

export default DropdownItem;
