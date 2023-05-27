import {BaseItem, ItemProps} from "@nextui-org/aria-utils";
import {ReactNode} from "react";
interface Props<T extends object = {}> extends Omit<ItemProps<"div", T>, "children" | "title"> {
  /**
   * The content of the component.
   */
  children?: ReactNode | null;
  /**
   * The title of the component.
   */
  title?: ReactNode | null;
}

export type TabItemProps<T extends object = {}> = Props<T>;

const TabItemBase = BaseItem as <T extends object>(props: TabItemProps<T>) => JSX.Element;

export default TabItemBase;
