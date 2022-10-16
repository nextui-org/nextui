export {Item as BaseItem} from "@react-stately/collections";
import {ItemProps as BaseItemProps} from "@react-types/shared";
import {HTMLNextUIProps, As} from "@nextui-org/system";

/**
 * A modified version of the ItemProps from @react-types/shared, with the addition of the NextUI props.
 *
 */
export type ItemProps<Type extends As = "div", T extends object = {}> = BaseItemProps<T> &
  HTMLNextUIProps<Type>;
