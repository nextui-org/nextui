import type {AutocompleteVariantProps, SlotsToClasses, AutocompleteSlots} from "@nextui-org/theme";

import {DOMAttributes, HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {autocomplete} from "@nextui-org/theme";
import {useFilter} from "@react-aria/i18n";
import {useComboBox} from "@react-aria/combobox";
import {useComboBoxState} from "@react-stately/combobox";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {Key, ReactNode, useCallback, useEffect, useMemo, useRef} from "react";
import {ComboBoxProps} from "@react-types/combobox";
import {PopoverProps} from "@nextui-org/popover";
import {ListboxProps} from "@nextui-org/listbox";
import {InputProps} from "@nextui-org/input";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {ScrollShadowProps} from "@nextui-org/scroll-shadow";
import {chain, mergeProps} from "@react-aria/utils";
import {ButtonProps} from "@nextui-org/button";
import {AsyncLoadable, PressEvent} from "@react-types/shared";

export type SelectedItemProps<T = object> = {
  /** A unique key for the item. */
  key?: Key;
  /** The props passed to the item. */
  props?: Record<string, any>;
  /** The item data. */
  data?: T | null;
  /** An accessibility label for this item. */
  "aria-label"?: string;
  /** The rendered contents of this item (e.g. JSX). */
  rendered?: ReactNode;
  /** A string value for this item, used for features like typeahead. */
  textValue?: string;
  /** The type of item this item represents. */
  type?: string;
};

interface Props<T> extends Omit<HTMLNextUIProps<"input">, keyof ComboBoxProps<T>> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The ref to the scroll element. Useful when having async loading of items.
   */
  scrollRef?: ReactRef<HTMLElement | null>;
  /**
   * The icon that represents the autocomplete open state. Usually a chevron icon.
   */
  selectorIcon?: ReactNode;
  /**
   * The icon that represents the clear button. Usually a cross icon.
   */
  clearIcon?: ReactNode;
  /**
   * Whether to display a top and bottom arrow indicators when the listbox is scrollable.
   * @default true
   */
  showScrollIndicators?: boolean;
  /**
   * Props to be passed to the scroll shadow component. This component
   * adds a shadow to the top and bottom of the listbox when it is scrollable.
   *
   * @default { hideScrollBar: true, offset: 15 }
   */
  scrollShadowProps?: Partial<ScrollShadowProps>;
  /**
   * Props to be passed to the popover component.
   *
   * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 5 }
   */
  popoverProps?: Partial<PopoverProps>;
  /**
   * Props to be passed to the listbox component.
   *
   * @default { disableAnimation: false }
   */
  listboxProps?: Partial<ListboxProps>;
  /**
   * Props to be passed to the selector button component.
   * @default { size: "sm", variant: "light", radius: "full", isIconOnly: true }
   */
  selectorButtonProps?: Partial<ButtonProps>;
  /**
   * Props to be passed to the clear button component.
   * @default { size: "sm", variant: "light", radius: "full", isIconOnly: true }
   */
  clearButtonProps?: Partial<ButtonProps>;
  /**
   * The filter options to use when filtering items based on user input.
   * @default {sensitivity: 'base'}
   */
  filterOptions?: Intl.CollatorOptions;
  /**
   * Classes object to style the autocomplete and its children.
   */
  classNames?: SlotsToClasses<AutocompleteSlots>;
  /**
   * Callback fired when the select menu is closed.
   */
  onClose?: () => void;
}

export type UseAutocompleteProps<T> = Props<T> &
  Omit<InputProps, "children"> &
  ComboBoxProps<T> &
  AsyncLoadable &
  AutocompleteVariantProps;

export function useAutocomplete<T extends object>(originalProps: UseAutocompleteProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, autocomplete.variantKeys);
  const disableAnimation = originalProps.disableAnimation ?? false;

  let {
    ref,
    as,
    label,
    isLoading,
    menuTrigger = "focus",
    filterOptions = {
      sensitivity: "base",
    },
    selectorIcon,
    clearIcon,
    scrollRef: scrollRefProp,
    popoverProps: userPopoverProps,
    scrollShadowProps: userScrollShadowProps,
    listboxProps: userListboxProps,
    selectorButtonProps,
    clearButtonProps,
    showScrollIndicators = true,
    className,
    classNames,
    onOpenChange,
    onClose,
    ...otherProps
  } = props;

  // Setup filter function and state.
  const {contains} = useFilter(filterOptions);
  const state = useComboBoxState({
    ...originalProps,
    menuTrigger,
    allowsEmptyCollection: true,
    defaultFilter: contains,
    onOpenChange: (open) => {
      onOpenChange?.(open);
      if (!open) {
        onClose?.();
      }
    },
  });

  // Setup refs and get props for child elements.
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const scrollShadowRef = useDOMRef<HTMLElement>(scrollRefProp);

  const defaultRelatedComponentsProps: {
    inputProps: InputProps;
    popoverProps: UseAutocompleteProps<T>["popoverProps"];
    scrollShadowProps: UseAutocompleteProps<T>["scrollShadowProps"];
    listboxProps: UseAutocompleteProps<T>["listboxProps"];
    selectorButtonProps: UseAutocompleteProps<T>["selectorButtonProps"];
    clearButtonProps: UseAutocompleteProps<T>["clearButtonProps"];
  } = {
    inputProps: {
      label,
      ref: inputRef,
      wrapperRef: inputWrapperRef,
      onClick: () => {
        if (!state.isOpen && !!state.selectedItem) {
          state.open();
        }
      },
      isClearable: false,
      disableAnimation,
    },
    popoverProps: {
      offset: 5,
      placement: "bottom",
      triggerScaleOnOpen: false,
      disableAnimation,
    },
    scrollShadowProps: {
      ref: scrollShadowRef,
      isEnabled: (showScrollIndicators && state.collection.size > 5) ?? true,
      hideScrollBar: true,
      offset: 15,
    },
    listboxProps: {
      emptyContent: "No results found.",
      disableAnimation,
    },
    selectorButtonProps: {
      isLoading,
      size: "sm",
      variant: "light",
      radius: "full",
      color: originalProps?.isInvalid ? "danger" : "default",
      isIconOnly: true,
      disableAnimation,
    },
    clearButtonProps: {
      size: "sm",
      variant: "light",
      radius: "full",
      color: originalProps?.isInvalid ? "danger" : "default",
      isIconOnly: true,
      disableAnimation,
    },
  };

  let userInputProps = {
    ...defaultRelatedComponentsProps.inputProps,
    ...otherProps,
    onClick: chain(defaultRelatedComponentsProps.inputProps.onClick, otherProps.onClick),
  };

  userPopoverProps = {...defaultRelatedComponentsProps.popoverProps, ...userPopoverProps};
  userScrollShadowProps = {
    ...defaultRelatedComponentsProps.scrollShadowProps,
    ...userScrollShadowProps,
  };
  userListboxProps = {...defaultRelatedComponentsProps.listboxProps, ...userListboxProps};

  const userSelectorButtonProps = {
    ...defaultRelatedComponentsProps.selectorButtonProps,
    ...selectorButtonProps,
  };
  const userClearButtonProps = {
    ...defaultRelatedComponentsProps.clearButtonProps,
    ...clearButtonProps,
  };

  const baseStyles = clsx(classNames?.base, className);

  // apply the same with to the popover as the select
  useEffect(() => {
    if (state.isOpen && popoverRef.current && inputWrapperRef.current) {
      let rect = inputWrapperRef.current.getBoundingClientRect();

      let popover = popoverRef.current;

      popover.style.width = rect.width + "px";
    }
  }, [state.isOpen]);

  // unfocus the input when the popover closes & there's no selected item
  useEffect(() => {
    if (!state.isOpen && !state.selectedItem && inputRef.current) {
      inputRef.current.blur();
    }
  }, [state.isOpen]);

  const {buttonProps, inputProps, listBoxProps} = useComboBox(
    {
      ...originalProps,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const slots = useMemo(
    () =>
      autocomplete({
        ...variantProps,
        disableAnimation,
        className,
      }),
    [...Object.values(variantProps), disableAnimation, className],
  );

  const onClear = useCallback(() => {
    state.setInputValue("");
    state.setSelectedKey(null);
  }, [state]);

  const getBaseProps: PropGetter = () => ({
    ref: domRef,
    "data-invalid": dataAttr(originalProps?.isInvalid),
    className: slots.base({class: baseStyles}),
  });

  const getSelectorButtonProps = () =>
    ({
      ref: buttonRef,
      ...buttonProps,
      ...userSelectorButtonProps,
      "data-open": dataAttr(state.isOpen),
      className: slots.selectorButton({
        class: clsx(classNames?.selectorButton, userSelectorButtonProps?.className),
      }),
    } as ButtonProps);

  const getClearButtonProps = () =>
    ({
      ...userClearButtonProps,
      onPress: (e: PressEvent) => {
        userClearButtonProps.onPress?.(e);

        if (state.selectedItem) {
          onClear();
        } else {
          const inputFocused = inputRef.current === document.activeElement;

          if (!inputFocused) {
            inputRef.current?.focus();
          }
        }
      },
      "data-visible": !!state.selectedItem || state.inputValue?.length > 0,
      className: slots.clearButton({
        class: clsx(classNames?.clearButton, userClearButtonProps?.className),
      }),
    } as ButtonProps);

  const getInputProps = () =>
    ({
      ...userInputProps,
      ...inputProps,
    } as unknown as InputProps);

  const getListBoxProps = () =>
    ({
      state,
      ref: listBoxRef,
      shouldHighlightOnFocus: true,
      ...mergeProps(userListboxProps, listBoxProps),
    } as ListboxProps);

  const getPopoverProps = (props: DOMAttributes = {}) => {
    return {
      state,
      ref: popoverRef,
      triggerRef: inputWrapperRef,
      scrollRef: listBoxRef,
      triggerType: "listbox",
      ...mergeProps(userPopoverProps, props),
      classNames: {
        content: slots.popoverContent({
          class: clsx(
            classNames?.popoverContent,
            userPopoverProps?.classNames?.["content"],
            props.className,
          ),
        }),
      },
    } as unknown as PopoverProps;
  };

  const getListBoxWrapperProps: PropGetter = (props: any = {}) => ({
    ...mergeProps(userScrollShadowProps, props),
    className: slots.listboxWrapper({
      class: clsx(classNames?.listboxWrapper, userScrollShadowProps?.className, props?.className),
    }),
  });

  const getEndContentWrapperProps: PropGetter = (props: any = {}) => ({
    className: slots.endContentWrapper({
      class: clsx(classNames?.endContentWrapper, props?.className),
    }),
    onClick: (e) => {
      const inputFocused = inputRef.current === document.activeElement;

      if (!inputFocused && e.currentTarget === e.target) {
        inputRef.current?.focus();
      }
    },
  });

  return {
    Component,
    domRef,
    label,
    state,
    slots,
    classNames,
    isLoading,
    clearIcon,
    selectorIcon,
    getBaseProps,
    getInputProps,
    getListBoxProps,
    getPopoverProps,
    getClearButtonProps,
    getSelectorButtonProps,
    getListBoxWrapperProps,
    getEndContentWrapperProps,
  };
}

export type UseAutocompleteReturn = ReturnType<typeof useAutocomplete>;
