import type {CheckboxVariantProps, CheckboxSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaCheckboxProps} from "@react-types/checkbox";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";

import {ReactNode, Ref, useCallback, useId, useState} from "react";
import {useMemo, useRef} from "react";
import {useToggleState} from "@react-stately/toggle";
import {checkbox} from "@nextui-org/theme";
import {useHover, usePress} from "@react-aria/interactions";
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
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Checkbox classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    icon: "icon-classes",
   *    label: "label-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CheckboxSlots>;
}

export type UseCheckboxProps = Omit<Props, "defaultChecked"> &
  Omit<AriaCheckboxProps, keyof CheckboxVariantProps | "onChange"> &
  CheckboxVariantProps;

export function useCheckbox(props: UseCheckboxProps = {}) {
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
    isReadOnly: isReadOnlyProp = false,
    autoFocus = false,
    isSelected: isSelectedProp,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "primary",
    radius = groupContext?.radius ?? "md",
    lineThrough = groupContext?.lineThrough ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    disableAnimation = groupContext?.disableAnimation ?? false,
    isIndeterminate = false,
    validationState,
    defaultSelected,
    classNames,
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
      isIndeterminate,
      isRequired,
      isSelected: isSelectedProp,
      isDisabled: isDisabledProp,
      isReadOnly: isReadOnlyProp,
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
    isDisabledProp,
    isReadOnlyProp,
    isSelectedProp,
    defaultSelected,
    validationState,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    onValueChange,
  ]);

  const {inputProps, isSelected, isDisabled, isReadOnly, isPressed: isPressedKeyboard} = isInGroup
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

  const isInvalid = useMemo(() => validationState === "invalid", [validationState]);
  const isInteractionDisabled = isDisabled || isReadOnly;

  // Handle press state for full label. Keyboard press state is returned by useCheckbox
  // since it is handled on the <input> element itself.
  const [isPressed, setPressed] = useState(false);
  const {pressProps} = usePress({
    isDisabled: isInteractionDisabled,
    onPressStart(e) {
      if (e.pointerType !== "keyboard") {
        setPressed(true);
      }
    },
    onPressEnd(e) {
      if (e.pointerType !== "keyboard") {
        setPressed(false);
      }
    },
  });

  const pressed = isInteractionDisabled ? false : isPressed || isPressedKeyboard;

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
        disableAnimation,
      }),
    [color, size, radius, lineThrough, isDisabled, disableAnimation],
  );

  const baseStyles = clsx(className, classNames?.base);

  const getBaseProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isSelected || isIndeterminate),
      "data-invalid": dataAttr(isInvalid),
      "data-hover": dataAttr(isHovered),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(pressed),
      "data-readonly": dataAttr(inputProps.readOnly),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-indeterminate": dataAttr(isIndeterminate),
      ...mergeProps(hoverProps, pressProps, otherProps),
    };
  };

  const getWrapperProps: PropGetter = (props = {}) => {
    return {
      ...props,
      "aria-hidden": true,
      className: clsx(slots.wrapper({class: clsx(classNames?.wrapper, props?.className)})),
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
      className: slots.label({class: classNames?.label}),
    }),
    [slots, classNames?.label, isDisabled, isSelected, isInvalid],
  );

  const getIconProps = useCallback(
    () =>
      ({
        isSelected: isSelected,
        isIndeterminate: !!isIndeterminate,
        disableAnimation: !!disableAnimation,
        className: slots.icon({class: classNames?.icon}),
      } as CheckboxIconProps),
    [slots, classNames?.icon, isSelected, isIndeterminate, disableAnimation],
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
