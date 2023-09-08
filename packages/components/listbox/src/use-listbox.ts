import type {KeyboardDelegate} from "@react-types/shared";

import {AriaListBoxProps, useListBox as useAriaListbox} from "@react-aria/listbox";
import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {listbox, ListboxVariantProps} from "@nextui-org/theme";
import {ListState, useListState} from "@react-stately/list";
import {filterDOMProps, ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useMemo} from "react";

import {ListboxItemProps} from "./listbox-item";

interface AriaListBoxOptions<T> extends AriaListBoxProps<T> {
  /** Whether the listbox uses virtual scrolling. */
  isVirtualized?: boolean;
  /**
   * An optional keyboard delegate implementation for type to select,
   * to override the default.
   */
  keyboardDelegate?: KeyboardDelegate;
  /**
   * Whether the listbox items should use virtual focus instead of being focused directly.
   */
  shouldUseVirtualFocus?: boolean;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Whether options should be focused when the user hovers over them. */
  shouldFocusOnHover?: boolean;
}

interface Props<T> extends Omit<HTMLNextUIProps<"ul">, "children"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The controlled state of the listbox.
   */
  state?: ListState<T>;
  /**
   * The listbox items variant.
   */
  variant?: ListboxItemProps["variant"];
  /**
   * The listbox items color.
   */
  color?: ListboxItemProps["color"];
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * The menu items classNames.
   */
  itemClasses?: ListboxItemProps["classNames"];
}

export type UseListboxProps<T = object> = Props<T> & AriaListBoxOptions<T> & ListboxVariantProps;

export function useListbox<T extends object>(props: UseListboxProps<T>) {
  const {
    ref,
    as,
    state: propState,
    variant,
    color,
    onAction,
    onSelectionChange,
    disableAnimation,
    itemClasses,
    className,
    ...otherProps
  } = props;

  const Component = as || "ul";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const innerState = useListState({...props, onSelectionChange});
  const state = propState || innerState;

  const {listBoxProps} = useAriaListbox({...props, onAction}, state, domRef);

  const styles = useMemo(() => listbox({className}), [className]);

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      className: styles,
      ...listBoxProps,
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      ...props,
    };
  };

  return {
    Component,
    state,
    variant,
    color,
    disableAnimation,
    className,
    itemClasses,
    getBaseProps,
  };
}

export type UseListboxReturn = ReturnType<typeof useListbox>;
