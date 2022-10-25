import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {CSSProp} from "@nextui-org/system";
import {FocusableProps} from "@react-types/shared";
import {ReactNode} from "react";

export type RenderIndicatorProps = {
  /**
   * The current indicator
   */
  indicator?: ReactNode;
  /**
   * The current open status.
   */
  isOpen?: boolean;
  /**
   * The current disabled status.
   */
  isDisabled?: boolean;
};

export interface CollapseItemBaseProps<T extends object = {}>
  extends Omit<ItemProps<"button", T>, "children" | keyof FocusableProps>,
    FocusableProps {
  /**
   * The content of the component.
   */
  children?: ReactNode | null;
  /**
   * The collapse item `expanded` indicator, it's usually an arrow icon.
   * If you pass a function, NextUI will expose the current indicator and the open status,
   * In case you want to use a custom indicator or muodify the current one.
   */
  indicator?: ReactNode | ((props: RenderIndicatorProps) => ReactNode) | null;
  /**
   * The collapse item subtitle.
   */
  subtitle?: ReactNode | string;

  /**
   * The collapse item variation.
   * @default "default"
   */
  variant?: "default" | "shadow" | "bordered" | "splitted";
  /**
   * The border weight for bordered collapse item variation.
   * @default "normal"
   */
  borderWeight?: CSSProp["borderWidth"];
  /**
   * The border weight for the collapse item divider.
   * @default "light"
   */
  dividerWeight?: CSSProp["borderWidth"];
  /**
   * Whether the collapse item have a bottom border.
   * @default true
   */
  withDivider?: boolean;
  /**
   * Whether the collapse item open/close animation should be disabled.
   * @default false
   */
  disableAnimation?: boolean;
}

const CollapseItem = BaseItem as (props: CollapseItemBaseProps) => JSX.Element;

CollapseItem.toString = () => ".nextui-collapse-item-base";

export default CollapseItem;
