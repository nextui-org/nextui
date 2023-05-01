import type {AriaRadioProps} from "@react-types/radio";
import type {RadioVariantProps, RadioSlots, SlotsToClasses} from "@nextui-org/theme";

import {Ref, ReactNode, useCallback, useId, useState} from "react";
import {useMemo, useRef} from "react";
import {useFocusRing} from "@react-aria/focus";
import {useHover, usePress} from "@react-aria/interactions";
import {radio} from "@nextui-org/theme";
import {useRadio as useReactAriaRadio} from "@react-aria/radio";
import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {__DEV__, warn, clsx, dataAttr} from "@nextui-org/shared-utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {chain, mergeProps} from "@react-aria/utils";

import {useRadioGroupContext} from "./radio-group-context";

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
   * The radio description text.
   */
  description?: string | ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Radio classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    control: "control-classes", // inner circle
   *    labelWrapper: "label-wrapper-classes", // this wraps the label and description
   *    label: "label-classes",
   *    description: "description-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<RadioSlots>;
}

export type UseRadioProps = Omit<Props, "defaultChecked"> &
  Omit<AriaRadioProps, keyof RadioVariantProps> &
  RadioVariantProps;

export function useRadio(props: UseRadioProps) {
  const groupContext = useRadioGroupContext();

  const {
    as,
    ref,
    classNames,
    id,
    value,
    children,
    description,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "primary",
    radius = groupContext?.radius ?? "full",
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    disableAnimation = groupContext?.disableAnimation ?? false,
    onChange = groupContext?.onChange,
    autoFocus = false,
    className,
    ...otherProps
  } = props;

  if (groupContext && __DEV__) {
    if ("checked" in otherProps) {
      warn('Remove props "checked" if in the Radio.Group.', "Radio");
    }
    if (value === undefined) {
      warn('Props "value" must be defined if in the Radio.Group.', "Radio");
    }
  }

  const Component = as || "label";

  const domRef = useDOMRef(ref);
  const inputRef = useRef<HTMLInputElement>(null);

  const labelId = useId();

  const isRequired = useMemo(() => groupContext.isRequired ?? false, [groupContext.isRequired]);
  const isInvalid = useMemo(() => groupContext.validationState === "invalid", [
    groupContext.validationState,
  ]);

  const ariaRadioProps = useMemo(() => {
    const ariaLabel =
      otherProps["aria-label"] || typeof children === "string" ? (children as string) : undefined;
    const ariaDescribedBy =
      otherProps["aria-describedby"] || typeof description === "string"
        ? (description as string)
        : undefined;

    return {
      id,
      isRequired,
      isDisabled: isDisabledProp,
      "aria-label": ariaLabel,
      "aria-labelledby": otherProps["aria-labelledby"] || labelId,
      "aria-describedby": ariaDescribedBy,
    };
  }, [labelId, id, isDisabledProp, isRequired]);

  const {inputProps, isDisabled, isSelected, isPressed: isPressedKeyboard} = useReactAriaRadio(
    {
      value,
      children,
      ...groupContext,
      ...ariaRadioProps,
    },
    groupContext.groupState,
    inputRef,
  );

  const {focusProps, isFocused, isFocusVisible} = useFocusRing({
    autoFocus,
  });

  const interactionDisabled = isDisabled || inputProps.readOnly;

  // Handle press state for full label. Keyboard press state is returned by useCheckbox
  // since it is handled on the <input> element itself.
  const [isPressed, setPressed] = useState(false);
  const {pressProps} = usePress({
    isDisabled: interactionDisabled,
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

  const {hoverProps, isHovered} = useHover({
    isDisabled: interactionDisabled,
  });

  const pressed = interactionDisabled ? false : isPressed || isPressedKeyboard;

  const slots = useMemo(
    () =>
      radio({
        color,
        size,
        radius,
        isInvalid,
        isDisabled,
        disableAnimation,
      }),
    [color, size, radius, isDisabled, isInvalid, disableAnimation],
  );

  const baseStyles = clsx(className, classNames?.base);

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: domRef,
      className: slots.base({class: baseStyles}),
      "data-disabled": dataAttr(isDisabled),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-checked": dataAttr(isSelected),
      "data-invalid": dataAttr(isInvalid),
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(pressed),
      "data-hover-unchecked": dataAttr(isHovered && !isSelected),
      "data-readonly": dataAttr(inputProps.readOnly),
      "aria-required": dataAttr(isRequired),
      ...mergeProps(hoverProps, pressProps, otherProps),
    };
  };

  const getWrapperProps: PropGetter = (props = {}) => {
    return {
      ...props,
      "aria-hidden": true,
      className: clsx(slots.wrapper({class: clsx(classNames?.wrapper, props.className)})),
    };
  };

  const getInputProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: inputRef,
      required: isRequired,
      ...mergeProps(inputProps, focusProps),
      onChange: chain(inputProps.onChange, onChange),
    };
  };

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      id: labelId,
      className: slots.label({class: classNames?.label}),
    }),
    [slots, classNames, isDisabled, isSelected, isInvalid],
  );

  const getLabelWrapperProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.labelWrapper({class: classNames?.labelWrapper}),
    }),
    [slots, classNames],
  );

  const getControlProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.control({class: classNames?.control}),
    }),
    [slots, isDisabled, isSelected, isInvalid],
  );

  return {
    Component,
    children,
    slots,
    classNames,
    description,
    isSelected,
    isDisabled,
    isInvalid,
    isFocusVisible,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  };
}

export type UseRadioReturn = ReturnType<typeof useRadio>;
