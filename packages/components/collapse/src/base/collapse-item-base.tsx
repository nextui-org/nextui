import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {FocusableProps} from "@react-types/shared";
import {ReactNode} from "react";

export type CollapseItemBaseProps<T extends object = {}> = Omit<
  ItemProps<"button", T>,
  "children"
> & {
  children?: ReactNode | null;
} & FocusableProps;

const CollapseItem = BaseItem as (props: CollapseItemBaseProps) => JSX.Element;

CollapseItem.toString = () => ".nextui-collapse-item-base";

export default CollapseItem;
