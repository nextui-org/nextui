import type {AutocompleteVariantProps, SlotsToClasses, AutocompleteSlots} from "@nextui-org/theme";

import {DOMAttributes, HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {autocomplete} from "@nextui-org/theme";
import {useFilter} from "@react-aria/i18n";
import {useComboBox} from "@react-aria/combobox";
import {useComboBoxState} from "@react-stately/combobox";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useEffect, useMemo, useRef} from "react";
import {ComboBoxProps} from "@react-types/combobox";
import {PopoverProps} from "@nextui-org/popover";
import {ListboxProps} from "@nextui-org/listbox";
import {InputProps} from "@nextui-org/input";
import {clsx} from "@nextui-org/shared-utils";

interface Props<T> extends Omit<HTMLNextUIProps<"div">, keyof ComboBoxProps<T>>, ComboBoxProps<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Classes object to style the autocomplete and its children.
   */
  classNames?: SlotsToClasses<AutocompleteSlots>;
}

export type UseAutocompleteProps<T> = Props<T> & AutocompleteVariantProps;

export function useAutocomplete<T extends object>(originalProps: UseAutocompleteProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, autocomplete.variantKeys);

  const {ref, as, label, menuTrigger = "focus", className, classNames, ...otherProps} = props;

  // Setup filter function and state.
  const {contains} = useFilter({sensitivity: "base"});
  const state = useComboBoxState({...originalProps, menuTrigger, defaultFilter: contains});

  // Setup refs and get props for child elements.
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputBaseRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const baseStyles = clsx(classNames?.base, className);

  // apply the same with to the popover as the select
  useEffect(() => {
    if (state.isOpen && popoverRef.current && inputBaseRef.current) {
      let rect = inputBaseRef.current.getBoundingClientRect();

      let popover = popoverRef.current;

      popover.style.width = rect.width + "px";
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
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const onClear = () => {
    state.setInputValue("");
    state.setSelectedKey(null);
  };

  const getBaseProps = () => ({
    ref: domRef,
    className: slots.base({class: baseStyles}),
  });

  const getSelectorButtonProps = () => ({
    ref: buttonRef,
    ...buttonProps,
    className: slots.selectorButton({class: classNames?.selectorButton}),
  });

  const getClearButtonProps = () => ({
    onPress: onClear,
    isDisabled: !state.selectedItem,
    "data-visible": !!state.selectedItem,
    className: slots.clearButton({class: classNames?.clearButton}),
  });

  const getInputProps = () =>
    ({
      label,
      ref: inputRef,
      baseRef: inputBaseRef,
      ...inputProps,
    } as unknown as InputProps);

  const getListBoxProps = () =>
    ({
      state,
      ref: listBoxRef,
      shouldHighlightOnFocus: true,
      ...listBoxProps,
    } as unknown as ListboxProps);

  const getPopoverProps = (props: DOMAttributes = {}) => {
    return {
      state,
      triggerRef: inputRef,
      ref: popoverRef,
      scrollRef: listBoxRef,
      triggerType: "listbox",
      ...props,
      classNames: {
        content: slots.popoverContent({
          class: clsx(classNames?.popoverContent, props.className),
        }),
      },
      // ...mergeProps(userPopoverProps, props),
      offset: 12,
      // offset: state.selectedItems && state.selectedItems.length > 0
      // ? // forces the popover to update its position when the selected items change
      //   state.selectedItems.length * 0.00000001 + (userPopoverProps?.offset || 0)
      // : userPopoverProps?.offset,
    } as unknown as PopoverProps;
  };

  const getListBoxWrapperProps = (props: any = {}) => ({
    className: slots.listboxWrapper({
      class: clsx(classNames?.listboxWrapper, props?.className),
    }),
    // ...mergeProps(userScrollShadowProps, props),
  });

  const getEndContentWrapperProps = (props: any = {}) => ({
    className: slots.endContentWrapper({
      class: clsx(classNames?.endContentWrapper, props?.className),
    }),
    // ...mergeProps(userScrollShadowProps, props),
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
    getSelectorButtonProps,
    getInputProps,
    getListBoxProps,
    getPopoverProps,
    getClearButtonProps,
    getListBoxWrapperProps,
    getEndContentWrapperProps,
  };
}

export type UseAutocompleteReturn = ReturnType<typeof useAutocomplete>;
