import type {CheckboxVariantProps, CheckboxSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaCheckboxProps} from "@react-types/checkbox";

import {useProviderContext, type HTMLNextUIProps, type PropGetter} from "@nextui-org/system";
import {ReactNode, Ref, useCallback, useId, useState} from "react";
import {useMemo, useRef} from "react";
import {useToggleState} from "@react-stately/toggle";
import {checkbox} from "@nextui-org/theme";
import {useCallbackRef} from "@nextui-org/use-callback-ref";
import {useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps, chain} from "@react-aria/utils";
import {__DEV__, warn, clsx, dataAttr, safeAriaLabel} from "@nextui-org/shared-utils";
import {
  useCheckbox as useReactAriaCheckbox,
  useCheckboxGroupItem as useReactAriaCheckboxGroupItem,
} from "@react-aria/checkbox";
import {useSafeLayoutEffect} from "@nextui-org/use-safe-layout-effect";
import {mergeRefs} from "@nextui-org/react-utils";
import {FormContext, useSlottedContext} from "@nextui-org/form";

import {useCheckboxGroupContext} from "./checkbox-group-context";

export type CheckboxIconProps = {
  "data-checked": string;
  isSelected: boolean;
  isIndeterminate: boolean;
  disableAnimation: boolean;
  className: string;
};

interface Props extends Omit<HTMLNextUIProps<"input">, keyof CheckboxVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLInputElement>;
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
  const globalContext = useProviderContext();
  const groupContext = useCheckboxGroupContext();
  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};
  const isInGroup = !!groupContext;

  const {
    as,
    ref,
    value = "",
    children,
    icon,
    name,
    isRequired,
    isReadOnly: isReadOnlyProp = false,
    autoFocus = false,
    isSelected: isSelectedProp,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "primary",
    radius = groupContext?.radius,
    lineThrough = groupContext?.lineThrough ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    disableAnimation = groupContext?.disableAnimation ?? globalContext?.disableAnimation ?? false,
    validationState,
    isInvalid = validationState ? validationState === "invalid" : groupContext?.isInvalid ?? false,
    isIndeterminate = false,
    validationBehavior = formValidationBehavior ?? globalContext?.validationBehavior ?? "aria",
    defaultSelected,
    classNames,
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

  const domRef = useRef<HTMLLabelElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // This workaround might become unnecessary once the following issue is resolved
  // https://github.com/adobe/react-spectrum/issues/5693
  let onChange = props.onChange;

  if (isInGroup) {
    const dispatch = () => {
      groupContext.groupState.resetValidation();
    };

    onChange = chain(dispatch, onChange);
  }

  const labelId = useId();

  const ariaCheckboxProps = useMemo(() => {
    return {
      name,
      value,
      children,
      autoFocus,
      defaultSelected,
      validationBehavior,
      isIndeterminate,
      isRequired,
      isInvalid,
      isSelected: isSelectedProp,
      isDisabled: isDisabledProp,
      isReadOnly: isReadOnlyProp,
      "aria-label": safeAriaLabel(otherProps["aria-label"], children),
      "aria-labelledby": otherProps["aria-labelledby"] || labelId,
      onChange: onValueChange,
    };
  }, [
    value,
    name,
    labelId,
    children,
    autoFocus,
    isInvalid,
    isIndeterminate,
    isDisabledProp,
    isReadOnlyProp,
    isSelectedProp,
    defaultSelected,
    validationBehavior,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    onValueChange,
  ]);

  const toggleState = useToggleState(ariaCheckboxProps);

  const {
    inputProps,
    isSelected,
    isDisabled,
    isReadOnly,
    isPressed: isPressedKeyboard,
  } = isInGroup
    ? // eslint-disable-next-line
      useReactAriaCheckboxGroupItem({...ariaCheckboxProps}, groupContext.groupState, inputRef)
    : // eslint-disable-next-line
      useReactAriaCheckbox({...ariaCheckboxProps}, toggleState, inputRef);

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
        isInvalid,
        lineThrough,
        isDisabled,
        disableAnimation,
      }),
    [color, size, radius, isInvalid, lineThrough, isDisabled, disableAnimation],
  );

  // if we use `react-hook-form`, it will set the checkbox value using the ref in register
  // i.e. setting ref.current.checked to true or false which is uncontrolled
  // hence, sync the state with `ref.current.checked`
  useSafeLayoutEffect(() => {
    if (!inputRef.current) return;
    const isInputRefChecked = !!inputRef.current.checked;

    toggleState.setSelected(isInputRefChecked);
  }, [inputRef.current]);

  const onChangeProp = useCallbackRef(onChange);

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();

        return;
      }

      onChangeProp?.(event);
    },
    [isReadOnly, isDisabled, onChangeProp],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps: PropGetter = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      "data-disabled": dataAttr(isDisabled),
      "data-selected": dataAttr(isSelected || isIndeterminate),
      "data-invalid": dataAttr(isInvalid),
      "data-hover": dataAttr(isHovered),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(pressed),
      "data-readonly": dataAttr(inputProps.readOnly),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-indeterminate": dataAttr(isIndeterminate),
      ...mergeProps(hoverProps, pressProps, otherProps),
    };
  }, [
    slots,
    baseStyles,
    isDisabled,
    isSelected,
    isIndeterminate,
    isInvalid,
    isHovered,
    isFocused,
    pressed,
    inputProps.readOnly,
    isFocusVisible,
    hoverProps,
    pressProps,
    otherProps,
  ]);

  const getWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        "aria-hidden": true,
        className: clsx(slots.wrapper({class: clsx(classNames?.wrapper, props?.className)})),
      };
    },
    [slots, classNames?.wrapper],
  );

  const getInputProps: PropGetter = useCallback(() => {
    return {
      ref: mergeRefs(inputRef, ref),
      ...mergeProps(inputProps, focusProps),
      onChange: chain(inputProps.onChange, handleCheckboxChange),
    };
  }, [inputProps, focusProps, handleCheckboxChange]);

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
        isSelected,
        isIndeterminate,
        disableAnimation,
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
