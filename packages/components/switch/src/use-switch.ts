import type {ToggleVariantProps, ToggleSlots, SlotsToClasses} from "@nextui-org/theme";
import type {FocusableRef} from "@react-types/shared";
import type {AriaSwitchProps} from "@react-aria/switch";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";

import {ReactNode, Ref, useCallback, useId, useRef, useState} from "react";
import {mapPropsVariants} from "@nextui-org/system";
import {useHover, usePress} from "@react-aria/interactions";
import {toggle} from "@nextui-org/theme";
import {chain, mergeProps} from "@react-aria/utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useFocusableRef} from "@nextui-org/dom-utils";
import {useSwitch as useReactAriaSwitch} from "@react-aria/switch";
import {useMemo} from "react";
import {useToggleState} from "@react-stately/toggle";
import {useFocusRing} from "@react-aria/focus";

export type SwitchThumbIconProps = {
  width: string;
  height: string;
  "data-checked": string;
  isSelected: boolean;
  className: string;
};
interface Props extends HTMLNextUIProps<"label"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>;
  /**
   * The label of the switch.
   */
  children?: ReactNode;
  /**
   * Whether the switch is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The icon to be displayed inside the thumb.
   */
  thumbIcon?: ReactNode | ((props: SwitchThumbIconProps) => ReactNode);
  /**
   * Start icon to be displayed inside the switch.
   */
  startIcon?: ReactNode;
  /**
   * End icon to be displayed inside the switch.
   */
  endIcon?: ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Switch classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    thumb: "thumb-classes",
   *    thumbIcon: "thumbIcon-classes",
   *    label: "label-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ToggleSlots>;
  /**
   * React aria onChange event.
   */
  onValueChange?: AriaSwitchProps["onChange"];
}

export type UseSwitchProps = Omit<Props, "defaultChecked"> &
  Omit<AriaSwitchProps, keyof ToggleVariantProps | "onChange"> &
  ToggleVariantProps;

export function useSwitch(originalProps: UseSwitchProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, toggle.variantKeys);

  const {
    ref,
    as,
    name,
    value = "",
    isReadOnly: isReadOnlyProp = false,
    autoFocus = false,
    startIcon,
    endIcon,
    defaultSelected,
    isSelected: isSelectedProp,
    children,
    thumbIcon,
    className,
    classNames,
    onChange,
    onValueChange,
    ...otherProps
  } = props;

  const Component = as || "label";

  const inputRef = useRef(null);
  const domRef = useFocusableRef(ref as FocusableRef<HTMLLabelElement>, inputRef);

  const labelId = useId();

  const ariaSwitchProps = useMemo(() => {
    const ariaLabel =
      otherProps["aria-label"] || typeof children === "string" ? (children as string) : undefined;

    return {
      name,
      value,
      children,
      autoFocus,
      defaultSelected,
      isSelected: isSelectedProp,
      isDisabled: !!originalProps.isDisabled,
      isReadOnly: isReadOnlyProp,
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
    isReadOnlyProp,
    isSelectedProp,
    defaultSelected,
    originalProps.isDisabled,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    onValueChange,
  ]);

  const state = useToggleState(ariaSwitchProps);

  const {inputProps, isPressed: isPressedKeyboard, isReadOnly} = useReactAriaSwitch(
    ariaSwitchProps,
    state,
    inputRef,
  );
  const {focusProps, isFocused, isFocusVisible} = useFocusRing({autoFocus: inputProps.autoFocus});
  const {hoverProps, isHovered} = useHover({
    isDisabled: inputProps.disabled,
  });

  const isInteractionDisabled = ariaSwitchProps.isDisabled || isReadOnly;

  // Handle press state for full label. Keyboard press state is returned by useSwitch
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

  const isSelected = inputProps.checked;
  const isDisabled = inputProps.disabled;

  const slots = useMemo(
    () =>
      toggle({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps: PropGetter = (props) => {
    return {
      ...mergeProps(hoverProps, pressProps, otherProps, props),
      ref: domRef,
      className: slots.base({class: clsx(baseStyles, props?.className)}),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isSelected),
      "data-readonly": dataAttr(isReadOnly),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(pressed),
      style: {
        ...props?.style,
        WebkitTapHighlightColor: "transparent",
      },
    };
  };

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

  const getInputProps: PropGetter = (props = {}) => {
    return {
      ...mergeProps(inputProps, focusProps, props),
      ref: inputRef,
      id: inputProps.id,
      onChange: chain(onChange, inputProps.onChange),
    };
  };

  const getThumbProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      className: slots.thumb({class: clsx(classNames?.thumb, props?.className)}),
    }),
    [slots, classNames?.thumb],
  );

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => ({
      ...props,
      id: labelId,
      className: slots.label({class: clsx(classNames?.label, props?.className)}),
    }),
    [slots, classNames?.label, isDisabled, isSelected],
  );

  const getThumbIconProps = useCallback(
    (
      props = {
        includeStateProps: false,
      },
    ) =>
      (mergeProps(
        {
          width: "1em",
          height: "1em",
          className: slots.thumbIcon({class: clsx(classNames?.thumbIcon)}),
        },
        props.includeStateProps
          ? {
              isSelected: isSelected,
            }
          : {},
      ) as unknown) as SwitchThumbIconProps,
    [slots, classNames?.thumbIcon, isSelected],
  );

  const getStartIconProps = useCallback<PropGetter>(
    (props = {}) => ({
      width: "1em",
      height: "1em",
      ...props,
      className: slots.startIcon({class: clsx(classNames?.startIcon, props?.className)}),
    }),
    [slots, classNames?.startIcon, isSelected],
  );

  const getEndIconProps = useCallback<PropGetter>(
    (props = {}) => ({
      width: "1em",
      height: "1em",
      ...props,
      className: slots.endIcon({class: clsx(classNames?.endIcon, props?.className)}),
    }),
    [slots, classNames?.endIcon, isSelected],
  );

  return {
    Component,
    slots,
    classNames,
    domRef,
    children,
    thumbIcon,
    startIcon,
    endIcon,
    isHovered,
    isSelected,
    isPressed: pressed,
    isFocused,
    isFocusVisible,
    isDisabled,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getThumbProps,
    getThumbIconProps,
    getStartIconProps,
    getEndIconProps,
  };
}

export type UseSwitchReturn = ReturnType<typeof useSwitch>;
