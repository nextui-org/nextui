import type {AutocompleteVariantProps, SlotsToClasses, AutocompleteSlots} from "@nextui-org/theme";

import {DOMAttributes, HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {autocomplete} from "@nextui-org/theme";
import {useFilter} from "@react-aria/i18n";
import {useComboBox} from "@react-aria/combobox";
import {useComboBoxState} from "@react-stately/combobox";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useCallback, useEffect, useMemo, useRef} from "react";
import {ComboBoxProps} from "@react-types/combobox";
import {PopoverProps} from "@nextui-org/popover";
import {ListboxProps} from "@nextui-org/listbox";
import {InputProps} from "@nextui-org/input";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {ScrollShadowProps} from "@nextui-org/scroll-shadow";
import {SpinnerProps} from "@nextui-org/spinner";
import {chain, mergeProps} from "@react-aria/utils";
import {ButtonProps} from "@nextui-org/button";

interface Props<T>
  extends Omit<HTMLNextUIProps<"input">, keyof ComboBoxProps<T>>,
    ComboBoxProps<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
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
   * Props to be passed to the spinner component.
   *
   * @default { size: "sm" , color: "current" }
   */
  spinnerProps?: Partial<SpinnerProps>;
  /**
   * The filter options to use when filtering items based on user input.
   * @default {sensitivity: 'base'}
   */
  filterOptions?: Intl.CollatorOptions;
  /**
   * Classes object to style the autocomplete and its children.
   */
  classNames?: SlotsToClasses<AutocompleteSlots>;
}

export type UseAutocompleteProps<T> = Props<T> & InputProps & AutocompleteVariantProps;

export function useAutocomplete<T extends object>(originalProps: UseAutocompleteProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, autocomplete.variantKeys);
  const disableAnimation = originalProps.disableAnimation ?? false;

  let {
    ref,
    as,
    label,
    menuTrigger = "focus",
    filterOptions = {
      sensitivity: "base",
    },
    popoverProps: userPopoverProps,
    scrollShadowProps: userScrollShadowProps,
    listboxProps: userListboxProps,
    className,
    classNames,
    ...otherProps
  } = props;

  // Setup filter function and state.
  const {contains} = useFilter(filterOptions);
  const state = useComboBoxState({
    ...originalProps,
    menuTrigger,
    allowsEmptyCollection: true,
    defaultFilter: contains,
  });

  // Setup refs and get props for child elements.
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputBaseRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const scrollShadowRef = useRef<HTMLDivElement>(null);

  const popoverPositionProps = useMemo(() => {
    let offset = 12;
    let containerPadding = 16;

    if (originalProps.variant === "underlined") {
      offset = 6;
    }

    return {
      offset,
      containerPadding,
    };
  }, [originalProps?.variant]);

  const defaultRelatedComponentsProps: {
    inputProps: InputProps;
    popoverProps: UseAutocompleteProps<T>["popoverProps"];
    scrollShadowProps: UseAutocompleteProps<T>["scrollShadowProps"];
    listboxProps: UseAutocompleteProps<T>["listboxProps"];
  } = {
    inputProps: {
      label,
      ref: inputRef,
      baseRef: inputBaseRef,
      onClick: () => {
        if (!state.isOpen) {
          // state.open();
        }
      },
      disableAnimation,
    },
    popoverProps: {
      placement: "bottom",
      triggerScaleOnOpen: false,
      disableAnimation,
      ...popoverPositionProps,
    },
    scrollShadowProps: {
      ref: scrollShadowRef,
      isEnabled: originalProps.showScrollIndicators ?? true,
      hideScrollBar: true,
      offset: 15,
    },
    listboxProps: {
      emptyContent: "No results found.",
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

  const baseStyles = clsx(classNames?.base, className);

  // apply the same with to the popover as the select
  useEffect(() => {
    if (state.isOpen && popoverRef.current && inputBaseRef.current) {
      let rect = inputBaseRef.current.getBoundingClientRect();

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
    className: slots.base({class: baseStyles}),
  });

  const getSelectorButtonProps = () =>
    ({
      ref: buttonRef,
      ...buttonProps,
      disableAnimation,
      isIconOnly: true,
      radius: "full",
      size: "sm",
      variant: "light",
      "data-open": dataAttr(state.isOpen),
      className: slots.selectorButton({class: classNames?.selectorButton}),
    } as ButtonProps);

  const getClearButtonProps = () =>
    ({
      onPress: () => {
        if (state.selectedItem) {
          onClear();
        } else {
          const inputFocused = inputRef.current === document.activeElement;

          if (!inputFocused) {
            inputRef.current?.focus();
          }
        }
      },
      isIconOnly: true,
      radius: "full",
      size: "sm",
      variant: "light",
      disableAnimation,
      "data-visible": !!state.selectedItem || state.inputValue?.length > 0,
      className: slots.clearButton({class: classNames?.clearButton}),
    } as ButtonProps);

  const getInputProps = () =>
    ({
      ...userInputProps,
      ...inputProps,
      ...otherProps,
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
      triggerRef: inputRef,
      scrollRef: listBoxRef,
      triggerType: "listbox",
      ...props,
      classNames: {
        content: slots.popoverContent({
          class: clsx(classNames?.popoverContent, props.className),
        }),
      },
      ...mergeProps(userPopoverProps, props),
    } as unknown as PopoverProps;
  };

  const getListBoxWrapperProps: PropGetter = (props: any = {}) => ({
    className: slots.listboxWrapper({
      class: clsx(classNames?.listboxWrapper, props?.className),
    }),
    ...mergeProps(userScrollShadowProps, props),
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
    triggerRef: inputRef,
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
