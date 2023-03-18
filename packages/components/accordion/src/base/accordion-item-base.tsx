import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {FocusableProps} from "@react-types/shared";
import {ReactNode} from "react";

export type AccordionItemIndicatorProps = {
  /**
   * The current indicator, usually an arrow icon.
   */
  indicator?: ReactNode;
  /**
   * The current open status.
   */
  isOpen?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

export interface AccordionItemBaseProps<T extends object = {}>
  extends Omit<ItemProps<"button", T>, "children" | keyof FocusableProps>,
    FocusableProps {
  /**
   * The content of the component.
   */
  children?: ReactNode | null;
  /**
   * The accordion item subtitle.
   */
  subtitle?: ReactNode | string;
  /**
   * The accordion item `expanded` indicator, it's usually an arrow icon.
   * If you pass a function, NextUI will expose the current indicator and the open status,
   * In case you want to use a custom indicator or muodify the current one.
   */
  indicator?: ReactNode | ((props: AccordionItemIndicatorProps) => ReactNode) | null;
}

const AccordionItemBase = BaseItem as (props: AccordionItemBaseProps) => JSX.Element;

export default AccordionItemBase;
