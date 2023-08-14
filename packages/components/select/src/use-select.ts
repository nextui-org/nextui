import type {SelectSlots, SelectVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {DOMAttributes, HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {select} from "@nextui-org/theme";
import {ReactRef, useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {useMemo, useCallback, useRef, Key, ReactNode, useEffect} from "react";
import {ListboxProps} from "@nextui-org/listbox";
import {AriaSelectProps, HiddenSelectProps} from "@react-aria/select";
import {useSelectState} from "@react-stately/select";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {useSelect as useAriaSelect} from "@react-aria/select";
import {useFocusRing} from "@react-aria/focus";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useHover} from "@react-aria/interactions";
import {PopoverProps} from "@nextui-org/popover";
import {CollectionProps} from "@nextui-org/aria-utils";
import {CollectionChildren} from "@react-types/shared";
import {ScrollShadowProps} from "@nextui-org/scroll-shadow";
import scrollIntoView from "scroll-into-view-if-needed";
interface Props extends HTMLNextUIProps<"select"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Whether the select is required.
   * @default false
   */
  isRequired?: boolean;
  /**
   * Props to be passed to the popover component.
   */
  popoverProps?: PopoverProps;
  /**
   * Props to be passed to the listbox component.
   */
  listboxProps?: ListboxProps;
  /**
   * Props to be passed to the scroll shadow component. This component
   * adds a shadow to the top and bottom of the listbox when it is scrollable.
   */
  scrollShadowProps?: ScrollShadowProps;
  /**
   * The icon that represents the select open state. Usually a chevron icon.
   */
  icon?: ReactNode;
  /**
   * Element to be rendered in the left side of the select.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the select.
   */
  endContent?: React.ReactNode;
  /**
   * The placeholder for the select to display when no option is selected.
   * @default "Select an option"
   */
  placeholder?: string;
  /**
   * Whether to display a top and bottom arrow indicators when the listbox is scrollable.
   * @default true
   */
  showScrollIndicators?: boolean;
  /**
   *
   * @param value
   * @returns
   */
  renderValue?: (value: any) => React.ReactNode;
  /**
   * Callback fired when the select menu is closed.
   */
  onClose?: () => void;
  /**
   * Classes object to style the select and its children.
   */
  classNames?: SlotsToClasses<SelectSlots>;
}

export type UseSelectProps<T> = Omit<Props, keyof AriaSelectProps<T>> &
  Omit<AriaSelectProps<T>, "children"> &
  SelectVariantProps &
  CollectionProps<T>;

export function useSelect<T extends object>(originalProps: UseSelectProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, select.variantKeys);

  const disableAnimation = originalProps.disableAnimation ?? false;
  const scrollShadowRef = useRef<HTMLDivElement>(null);

  const {
    ref,
    as,
    icon,
    isOpen,
    label,
    name,
    children,
    defaultOpen,
    onOpenChange,
    startContent,
    endContent,
    description,
    errorMessage,
    onSelectionChange,
    placeholder,
    popoverProps = {
      placement: "bottom",
      triggerScaleOnOpen: false,
      disableAnimation,
    },
    scrollShadowProps = {
      ref: scrollShadowRef,
      hideScrollBar: true,
      offset: 40,
    },
    listboxProps: userListboxProps = {
      disableAnimation,
    },
    onClose,
    className,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);
  const listboxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const state = useSelectState<T>({
    ...props,
    isOpen,
    children: children as CollectionChildren<T>,
    isRequired: originalProps?.isRequired,
    isDisabled: originalProps?.isDisabled,
    defaultOpen,
    onOpenChange: (open) => {
      onOpenChange?.(open);
      if (!open) {
        onClose?.();
      }
    },
    onSelectionChange: (key: Key) => {
      onSelectionChange?.(key);
    },
  });

  const {labelProps, triggerProps, valueProps, menuProps, descriptionProps, errorMessageProps} =
    useAriaSelect({...props, isDisabled: originalProps?.isDisabled}, state, domRef);

  const {isPressed, buttonProps} = useAriaButton(triggerProps, domRef);

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();
  const {isHovered, hoverProps} = useHover({isDisabled: originalProps?.isDisabled});

  const labelPlacement = useMemo<SelectVariantProps["labelPlacement"]>(() => {
    if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !label) {
      return "outside";
    }

    return originalProps.labelPlacement ?? "inside";
  }, [originalProps.labelPlacement, label]);

  const hasHelper = !!description || !!errorMessage;
  const hasPlaceholder = !!placeholder;
  const isInvalid = props.validationState === "invalid";
  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";
  const shouldLabelBeInside = labelPlacement === "inside";
  const isLabelPlaceholder = !hasPlaceholder && labelPlacement !== "outside-left";
  const isFilled = state.isOpen || !!state.selectedItem || !!startContent || !!endContent;

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      select({
        ...variantProps,
        isLabelPlaceholder,
        isInvalid,
        className,
      }),
    [...Object.values(variantProps), isInvalid, isLabelPlaceholder, className],
  );

  // scroll the listbox to the selected item
  useEffect(() => {
    if (state.isOpen && popoverRef.current && listboxRef.current) {
      let selectedItem = listboxRef.current.querySelector("[aria-selected=true] [data-label=true]");
      let scrollShadow = scrollShadowRef.current;

      // scroll the listbox to the selected item
      if (selectedItem && scrollShadow && selectedItem.parentElement) {
        // scroll parent to the item
        scrollIntoView(selectedItem, {
          scrollMode: "always",
          behavior: disableAnimation ? "auto" : "smooth",
          block: "nearest",
          inline: "nearest",
          boundary: scrollShadow,
        });
      }
    }
  }, [state.isOpen, disableAnimation]);

  // apply the same with to the popover as the select
  useEffect(() => {
    if (state.isOpen && popoverRef.current && domRef.current) {
      let selectRect = domRef.current.getBoundingClientRect();
      let popover = popoverRef.current;

      popover.style.width = selectRect.width + "px";
    }
  }, [state.isOpen]);

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => ({
      "data-filled": dataAttr(isFilled),
      className: slots.base({
        class: clsx(baseStyles, props.className),
      }),
      ...props,
    }),
    [slots, isFilled, baseStyles],
  );

  const getTriggerProps: PropGetter = useCallback(
    (props = {}) => {
      // These props are not needed for the menu trigger since it is handled by the popover trigger.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {onKeyDown, onClick, onMouseDown, onPointerDown, onPointerUp, ...otherButtonProps} =
        buttonProps;

      return {
        "data-open": dataAttr(state.isOpen),
        "data-disabled": dataAttr(originalProps?.isDisabled),
        "data-focus": dataAttr(isFocused),
        "data-pressed": dataAttr(isPressed),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-hover": dataAttr(isHovered),
        className: slots.trigger({class: classNames?.trigger}),
        ...mergeProps(
          otherButtonProps,
          focusProps,
          hoverProps,
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps,
          }),
          filterDOMProps(props),
        ),
      };
    },
    [
      slots,
      state.isOpen,
      classNames?.trigger,
      originalProps?.isDisabled,
      isFocused,
      isPressed,
      isFocusVisible,
      isHovered,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps,
      shouldFilterDOMProps,
    ],
  );

  const getHiddenSelectProps = useCallback(
    (props = {}) =>
      ({
        state,
        label: originalProps?.label,
        name: originalProps?.name,
        triggerRef: domRef,
        isRequired: originalProps?.isRequired,
        autoComplete: originalProps?.autoComplete,
        isDisabled: originalProps?.isDisabled,
        ...props,
      } as HiddenSelectProps<T>),
    [
      state,
      originalProps?.label,
      originalProps?.autoComplete,
      originalProps?.name,
      originalProps?.isDisabled,
      domRef,
    ],
  );

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.label({
        class: clsx(classNames?.label, props.className),
      }),
      ...labelProps,
      ...props,
    }),
    [slots, classNames?.label, labelProps],
  );

  const getValueProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.value({
        class: clsx(classNames?.value, props.className),
      }),
      ...valueProps,
      ...props,
    }),
    [slots, classNames?.value, valueProps],
  );

  const getScrollShadowProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.scrollShadow({
        class: clsx(classNames?.scrollShadow, props?.className),
      }),
      ...mergeProps(scrollShadowProps, props),
    }),
    [slots.scrollShadow, classNames?.scrollShadow, scrollShadowProps],
  );

  const getListboxProps = (props: any = {}) => {
    return {
      state,
      ref: listboxRef,
      className: slots.listbox({
        class: clsx(classNames?.listbox, props?.className),
      }),
      ...mergeProps(menuProps, userListboxProps, props),
    } as ListboxProps;
  };

  const getPopoverProps = useCallback(
    (props: DOMAttributes = {}) => {
      return {
        state,
        ref: popoverRef,
        scrollRef: listboxRef,
        triggerRef: domRef,
        className: slots.popover({
          class: clsx(classNames?.popover, props.className),
        }),
        ...mergeProps(popoverProps, props),
      } as PopoverProps;
    },
    [slots, classNames?.popover, popoverProps, state],
  );

  const getIconProps = useCallback(
    () => ({
      "aria-hidden": dataAttr(true),
      "data-open": dataAttr(state.isOpen),
      className: slots.icon({class: classNames?.icon}),
    }),
    [slots, classNames?.icon, state?.isOpen],
  );
  const getInnerWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        className: slots.innerWrapper({
          class: clsx(classNames?.innerWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.innerWrapper],
  );

  const getHelperWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        className: slots.helperWrapper({
          class: clsx(classNames?.helperWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.helperWrapper],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...descriptionProps,
        className: slots.description({class: clsx(classNames?.description, props?.className)}),
      };
    },
    [slots, classNames?.description],
  );

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...errorMessageProps,
        className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
      };
    },
    [slots, errorMessageProps, classNames?.errorMessage],
  );

  return {
    Component,
    domRef,
    state,
    icon,
    label,
    name,
    placeholder,
    startContent,
    endContent,
    description,
    errorMessage,
    hasHelper,
    labelPlacement,
    hasPlaceholder,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    getBaseProps,
    getTriggerProps,
    getLabelProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    getScrollShadowProps,
    getHiddenSelectProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getIconProps,
  };
}

export type UseSelectReturn = ReturnType<typeof useSelect>;
