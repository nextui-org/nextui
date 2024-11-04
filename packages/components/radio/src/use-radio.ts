import type {AriaRadioProps} from "@react-types/radio";
import type {RadioVariantProps, RadioSlots, SlotsToClasses} from "@nextui-org/theme";

import {Ref, ReactNode, useCallback, useId, useState} from "react";
import {useMemo, useRef} from "react";
import {useFocusRing} from "@react-aria/focus";
import {useHover, usePress} from "@react-aria/interactions";
import {radio} from "@nextui-org/theme";
import {useRadio as useReactAriaRadio} from "@react-aria/radio";
import {HTMLNextUIProps, PropGetter, useProviderContext} from "@nextui-org/system";
import {__DEV__, warn, clsx, dataAttr} from "@nextui-org/shared-utils";
import {useDOMRef} from "@nextui-org/react-utils";
import {chain, mergeProps} from "@react-aria/utils";

import {useRadioGroupContext} from "./radio-group-context";

interface Props extends Omit<HTMLNextUIProps<"input">, keyof RadioVariantProps> {
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
  const globalContext = useProviderContext();
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
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    disableAnimation = groupContext?.disableAnimation ?? globalContext?.disableAnimation ?? false,
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
  const descriptionId = useId();

  const isRequired = useMemo(() => groupContext.isRequired ?? false, [groupContext.isRequired]);
  const isInvalid = groupContext.isInvalid;

  const ariaRadioProps = useMemo(() => {
    const ariaDescribedBy =
      [otherProps["aria-describedby"], descriptionId].filter(Boolean).join(" ") || undefined;

    return {
      id,
      isRequired,
      isDisabled: isDisabledProp,
      "aria-label": otherProps["aria-label"],
      "aria-labelledby": otherProps["aria-labelledby"] || labelId,
      "aria-describedby": ariaDescribedBy,
    };
  }, [
    id,
    isDisabledProp,
    isRequired,
    description,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    otherProps["aria-describedby"],
    descriptionId,
  ]);

  const {
    inputProps,
    isDisabled,
    isSelected,
    isPressed: isPressedKeyboard,
  } = useReactAriaRadio(
    {
      value,
      children: typeof children === "function" ? true : children,
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
        isInvalid,
        isDisabled,
        disableAnimation,
      }),
    [color, size, isDisabled, isInvalid, disableAnimation],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ref: domRef,
        className: slots.base({class: baseStyles}),
        "data-disabled": dataAttr(isDisabled),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-selected": dataAttr(isSelected),
        "data-invalid": dataAttr(isInvalid),
        "data-hover": dataAttr(isHovered),
        "data-pressed": dataAttr(pressed),
        "data-hover-unselected": dataAttr(isHovered && !isSelected),
        "data-readonly": dataAttr(inputProps.readOnly),
        "aria-required": dataAttr(isRequired),
        ...mergeProps(hoverProps, pressProps, otherProps),
      };
    },
    [
      slots,
      baseStyles,
      domRef,
      isDisabled,
      isFocused,
      isFocusVisible,
      isSelected,
      isInvalid,
      isHovered,
      pressed,
      inputProps.readOnly,
      isRequired,
      otherProps,
    ],
  );

  const getWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        "aria-hidden": true,
        className: clsx(slots.wrapper({class: clsx(classNames?.wrapper, props.className)})),
      };
    },
    [slots, classNames?.wrapper],
  );

  const getInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: inputRef,
        ...mergeProps(props, inputProps, focusProps),
        onChange: chain(inputProps.onChange, onChange),
      };
    },
    [inputProps, focusProps, onChange],
  );

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      id: labelId,
      className: slots.label({class: classNames?.label}),
    }),
    [slots, classNames?.label, isDisabled, isSelected, isInvalid],
  );

  const getLabelWrapperProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.labelWrapper({class: classNames?.labelWrapper}),
    }),
    [slots, classNames?.labelWrapper],
  );

  const getControlProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.control({class: classNames?.control}),
    }),
    [slots, classNames?.control],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      id: descriptionId,
      className: slots.description({class: classNames?.description}),
    }),
    [slots, classNames?.description],
  );

  return {
    Component,
    children,
    isSelected,
    isDisabled,
    isInvalid,
    isFocusVisible,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
    getDescriptionProps,
  };
}

export type UseRadioReturn = ReturnType<typeof useRadio>;
