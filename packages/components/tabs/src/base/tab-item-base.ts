import {BaseItem, ItemProps} from "@heroui/aria-utils";
import {ReactNode, RefObject} from "react";
interface Props<T extends object = {}> extends Omit<ItemProps<"button", T>, "children" | "title"> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * The title of the component.
   */
  title?: ReactNode;
  /**
   *  A string representation of the item's contents. Use this when the title is not readable.
   *  This will be used as native `title` attribute.
   * */
  titleValue?: string;
  /** Whether the tab should be disabled. */
  isDisabled?: boolean;
  /** Whether the tab selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** A ref to the tab item. */
  tabRef?: RefObject<HTMLButtonElement>;
}

export type TabItemProps<T extends object = {}> = Props<T>;

const TabItemBase = BaseItem as <T extends object>(props: TabItemProps<T>) => JSX.Element;

export default TabItemBase;
