import type {CheckboxVariantProps, CheckboxSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaCheckboxProps} from "@react-types/checkbox";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";

import {ReactNode, Ref, useCallback, useId} from "react";
import {useMemo, useRef} from "react";
import {useToggleState} from "@react-stately/toggle";
import {checkbox} from "@nextui-org/theme";
import {useHover} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {chain, mergeProps} from "@react-aria/utils";
import {useFocusableRef} from "@nextui-org/dom-utils";
import {__DEV__, warn, clsx, dataAttr} from "@nextui-org/shared-utils";
import {
  useCheckbox as useReactAriaCheckbox,
  useCheckboxGroupItem as useReactAriaCheckboxGroupItem,
} from "@react-aria/checkbox";
import {FocusableRef} from "@react-types/shared";

import {useCheckboxGroupContext} from "./checkbox-group-context";

export type CheckboxIconProps = {
  "data-checked": string;
  isSelected: boolean;
  isIndeterminate: boolean;
  disableAnimation: boolean;
  className: string;
};

interface Props extends HTMLNextUIProps<"label"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>;
  /**
   * The label of the checkbox.
   */
  children?: ReactNode;
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The icon to be displayed when the checkbox is checked.
   */
  icon?: ReactNode | ((props: CheckboxIconProps) => ReactNode);
  /**
   * React aria onChange event.
   */
  onValueChange?: AriaCheckboxProps["onChange"];
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

export type UseCheckboxProps = Omit<Props, "defaultChecked"> &
  Omit<AriaCheckboxProps, keyof CheckboxVariantProps | "onChange"> &
  Omit<CheckboxVariantProps, "isFocusVisible">;

export function useCheckbox(props: UseCheckboxProps) {
  const groupContext = useCheckboxGroupContext();
  const isInGroup = !!groupContext;

  const {
    as,
    ref,
    value = "",
    children,
    icon,
    name,
    isRequired = false,
    isReadOnly = false,
    autoFocus = false,
    isSelected: isSelectedProp,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "primary",
    radius = groupContext?.radius ?? "md",
    lineThrough = groupContext?.lineThrough ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    disableAnimation = groupContext?.disableAnimation ?? false,
    isIndeterminate = false,
    validationState,
    defaultSelected,
    styles,
    onChange,
    className,
    onValueChange,
    ...otherProps
  } = props;

  if (groupContext && __DEV__) {
    if (isSelectedProp) {
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

  const labelId = useId();

  const ariaCheckboxProps = useMemo(() => {
    const ariaLabel =
      otherProps["aria-label"] || typeof children === "string" ? (children as string) : undefined;

    return {
      name,
      value,
      children,
      autoFocus,
      defaultSelected,
      isSelected: isSelectedProp,
      isDisabled,
      isIndeterminate,
      isRequired,
      isReadOnly,
      validationState,
      "aria-label": ariaLabel,
      "aria-labelledby": otherProps["aria-labelledby"] || labelId,
      onChange: onValueChange,
    };
  }, [
    value,
    name,
    labelId,
    children,
    autoFocus,
    isIndeterminate,
    isDisabled,
    isSelectedProp,
    defaultSelected,
    validationState,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    onValueChange,
  ]);

  const {inputProps} = isInGroup
    ? // eslint-disable-next-line
      useReactAriaCheckboxGroupItem(
        {
          ...ariaCheckboxProps,
          validationState,
        },
        groupContext.groupState,
        inputRef,
      )
    : useReactAriaCheckbox(ariaCheckboxProps, useToggleState(ariaCheckboxProps), inputRef); // eslint-disable-line

  const isSelected = inputProps.checked;
  const isInvalid = useMemo(() => validationState === "invalid", [validationState]);

  if (isRequired) {
    inputProps.required = true;
  }

  const {hoverProps, isHovered} = useHover({
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
      }),
    [color, size, radius, lineThrough, isDisabled, isFocusVisible, disableAnimation],
  );

  const baseStyles = clsx(styles?.base, className);

  const getBaseProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isSelected),
      "data-invalid": dataAttr(isInvalid),
      ...mergeProps(hoverProps, otherProps),
    };
  };

  const getWrapperProps: PropGetter = () => {
    return {
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(isSelected),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocused && isFocusVisible),
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(inputProps.readOnly),
      "aria-hidden": true,
      className: clsx(slots.wrapper({class: styles?.wrapper})),
    };
  };

  const getInputProps: PropGetter = () => {
    return {
      ref: inputRef,
      ...mergeProps(inputProps, focusProps),
      onChange: chain(inputProps.onChange, onChange),
    };
  };

  const getLabelProps: PropGetter = useCallback(
    () => ({
      id: labelId,
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isSelected),
      "data-invalid": dataAttr(isInvalid),
      className: slots.label({class: styles?.label}),
    }),
    [slots, styles?.label, isDisabled, isSelected, isInvalid],
  );

  const getIconProps = useCallback(
    () =>
      ({
        "data-checked": dataAttr(isSelected),
        isSelected: isSelected,
        isIndeterminate: !!isIndeterminate,
        disableAnimation: !!disableAnimation,
        className: slots.icon({class: styles?.icon}),
      } as CheckboxIconProps),
    [slots, styles?.icon, isSelected, isIndeterminate, disableAnimation],
  );

  return {
    Component,
    icon,
    children,
    isSelected,
    isDisabled,
    isInvalid,
    isFocused,
    isHovered,
    isFocusVisible,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getIconProps,
  };
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;
