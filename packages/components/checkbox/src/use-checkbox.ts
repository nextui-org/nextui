import type {CheckboxVariantProps, CheckboxSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaCheckboxProps} from "@react-types/checkbox";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {ReactNode, Ref, useCallback} from "react";
import {useMemo, useRef} from "react";
import {useToggleState} from "@react-stately/toggle";
import {checkbox} from "@nextui-org/theme";
import {useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {useFocusableRef} from "@nextui-org/dom-utils";
import {__DEV__, warn, clsx, dataAttr} from "@nextui-org/shared-utils";
import {
  useCheckbox as useReactAriaCheckbox,
  useCheckboxGroupItem as useReactAriaCheckboxGroupItem,
} from "@react-aria/checkbox";
import {FocusableRef} from "@react-types/shared";

import {useCheckboxGroupContext} from "./checkbox-group-context";

export interface UseCheckboxProps
  extends HTMLNextUIProps<"label", Omit<AriaCheckboxProps, keyof CheckboxVariantProps>>,
    Omit<CheckboxVariantProps, "isFocusVisible"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>;
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The label of the checkbox.
   */
  children?: ReactNode;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Checkbox styles={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    icon: "icon-classes",
   *    label: "label-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<CheckboxSlots>;
}

export function useCheckbox(props: UseCheckboxProps) {
  const groupContext = useCheckboxGroupContext();
  const isInGroup = !!groupContext;

  const {
    as,
    ref,
    isSelected,
    value = "",
    children,
    isRequired = false,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "neutral",
    radius = groupContext?.radius ?? "sm",
    lineThrough = groupContext?.lineThrough ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    disableAnimation = groupContext?.disableAnimation ?? false,
    isIndeterminate = false,
    defaultSelected,
    styles,
    onChange,
    className,
    ...otherProps
  } = props;

  if (groupContext && __DEV__) {
    if (isSelected) {
      warn(
        "The Checkbox.Group is being used, `isSelected` will be ignored. Use the `value` of the Checkbox.Group instead.",
        "Checkbox",
      );
    }
    if (defaultSelected) {
      warn(
        "The Checkbox.Group is being used, `defaultSelected` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.",
        "Checkbox",
      );
    }
  }

  const Component = as || "label";

  const inputRef = useRef(null);
  const domRef = useFocusableRef(ref as FocusableRef<HTMLLabelElement>, inputRef);

  const ariaCheckboxProps = useMemo(() => {
    return {
      ...otherProps,
      value,
      defaultSelected,
      isSelected,
      isIndeterminate,
      isRequired,
      onChange,
    };
  }, [isIndeterminate, otherProps]);

  const {inputProps} = isInGroup
    ? // eslint-disable-next-line
      useReactAriaCheckboxGroupItem(
        {
          ...ariaCheckboxProps,
          validationState: otherProps.validationState,
        },
        groupContext.groupState,
        inputRef,
      )
    : useReactAriaCheckbox(ariaCheckboxProps, useToggleState(ariaCheckboxProps), inputRef); // eslint-disable-line

  if (isRequired) {
    inputProps.required = true;
  }

  const {hoverProps, isHovered} = useHover({
    isDisabled: inputProps.disabled,
  });

  // TODO: Event's propagation wasn't stopped https://github.com/adobe/react-spectrum/issues/2383
  const {pressProps} = usePress({
    isDisabled: inputProps.disabled,
  });

  const {focusProps, isFocused, isFocusVisible} = useFocusRing({
    autoFocus: inputProps.autoFocus,
  });

  const slots = useMemo(
    () =>
      checkbox({
        color,
        size,
        radius,
        lineThrough,
        isDisabled,
        isFocusVisible,
        disableAnimation,
        className,
      }),
    [color, size, radius, lineThrough, isDisabled, isFocusVisible, disableAnimation, className],
  );

  const baseStyles = clsx(styles?.base, className);

  const getBaseProps = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(inputProps.checked),
      "data-invalid": dataAttr(otherProps.validationState === "invalid"),
      ...mergeProps(hoverProps, pressProps, otherProps),
    };
  };

  const getCheckboxProps = () => {
    return {
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(inputProps.checked),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocused && isFocusVisible),
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(otherProps.validationState === "invalid"),
      "data-readonly": dataAttr(inputProps.readOnly),
      "aria-hidden": true,
      className: clsx(slots.wrapper({class: styles?.wrapper})),
      ...mergeProps(hoverProps, pressProps, otherProps),
    };
  };

  const getInputProps = () => {
    return {
      ref: inputRef,
      ...mergeProps(inputProps, focusProps),
    };
  };

  const getLabelProps = useCallback(
    () => ({
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(inputProps.checked),
      "data-invalid": dataAttr(otherProps.validationState === "invalid"),
      className: slots.label({class: styles?.label}),
    }),
    [slots, isDisabled, inputProps.checked, otherProps.validationState],
  );

  const getIconProps = useCallback(
    () => ({
      "data-checked": dataAttr(inputProps.checked),
      className: slots.icon({class: styles?.icon}),
    }),
    [slots, inputProps.checked],
  );

  return {
    Component,
    children,
    disableAnimation,
    isChecked: inputProps.checked,
    getBaseProps,
    getCheckboxProps,
    getInputProps,
    getLabelProps,
    getIconProps,
  };
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;
