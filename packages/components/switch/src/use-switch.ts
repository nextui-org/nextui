import type {ToggleVariantProps, ToggleSlots, SlotsToClasses} from "@nextui-org/theme";
import type {FocusableRef} from "@react-types/shared";
import type {AriaSwitchProps} from "@react-aria/switch";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";

import {ReactNode, Ref, useCallback, useId, useRef} from "react";
import {mapPropsVariants} from "@nextui-org/system";
import {useHover} from "@react-aria/interactions";
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
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Switch styles={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    thumb: "thumb-classes",
   *    thumbIcon: "thumbIcon-classes",
   *    label: "label-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<ToggleSlots>;
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
    isReadOnly = false,
    autoFocus = false,
    startIcon,
    endIcon,
    defaultSelected,
    isSelected: isSelectedProp,
    children,
    thumbIcon,
    className,
    styles,
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
      isReadOnly,
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
    isSelectedProp,
    defaultSelected,
    originalProps.isDisabled,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    onValueChange,
  ]);

  const state = useToggleState(ariaSwitchProps);
  const {inputProps} = useReactAriaSwitch(ariaSwitchProps, state, inputRef);
  const {focusProps, isFocused, isFocusVisible} = useFocusRing({autoFocus: inputProps.autoFocus});
  const {hoverProps, isHovered} = useHover({
    isDisabled: inputProps.disabled,
  });

  const isSelected = inputProps.checked;
  const isDisabled = inputProps.disabled;

  const slots = useMemo(
    () =>
      toggle({
        ...variantProps,
        isFocusVisible,
      }),
    [...Object.values(variantProps), isFocusVisible],
  );

  const baseStyles = clsx(styles?.base, className);

  const getBaseProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isSelected),
      ...mergeProps(hoverProps, otherProps),
    };
  };

  const getWrapperProps: PropGetter = useCallback(() => {
    return {
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(isSelected),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocused && isFocusVisible),
      "data-disabled": dataAttr(isDisabled),
      "data-readonly": dataAttr(inputProps.readOnly),
      "aria-hidden": true,
      className: clsx(slots.wrapper({class: styles?.wrapper})),
    };
  }, [
    slots,
    styles?.wrapper,
    isHovered,
    isSelected,
    isFocused,
    isFocusVisible,
    isDisabled,
    inputProps.readOnly,
  ]);

  const getInputProps: PropGetter = () => {
    return {
      ref: inputRef,
      id: inputProps.id,
      ...mergeProps(inputProps, focusProps),
      onChange: chain(onChange, inputProps.onChange),
    };
  };

  const getThumbProps: PropGetter = useCallback(
    () => ({
      "data-checked": dataAttr(isSelected),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocused && isFocusVisible),
      "data-disabled": dataAttr(isDisabled),
      "data-readonly": dataAttr(inputProps.readOnly),
      className: slots.thumb({class: styles?.thumb}),
    }),
    [slots, styles?.thumb, isSelected, isFocused, isFocusVisible, isDisabled, inputProps.readOnly],
  );

  const getLabelProps: PropGetter = useCallback(
    () => ({
      id: labelId,
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isSelected),
      className: slots.label({class: styles?.label}),
    }),
    [slots, styles?.label, isDisabled, isSelected],
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
          "data-checked": dataAttr(isSelected),
          className: slots.thumbIcon({class: styles?.thumbIcon}),
        },
        props.includeStateProps
          ? {
              isSelected: isSelected,
            }
          : {},
      ) as unknown) as SwitchThumbIconProps,
    [slots, styles?.thumbIcon, isSelected, originalProps.disableAnimation],
  );

  const getStartIconProps = useCallback(
    () => ({
      width: "1em",
      height: "1em",
      "data-checked": dataAttr(isSelected),
      className: slots.startIcon({class: styles?.startIcon}),
    }),
    [slots, styles?.startIcon, isSelected],
  );

  const getEndIconProps = useCallback(
    () => ({
      width: "1em",
      height: "1em",
      "data-checked": dataAttr(isSelected),
      className: slots.endIcon({class: styles?.endIcon}),
    }),
    [slots, styles?.endIcon, isSelected],
  );

  return {
    Component,
    slots,
    styles,
    domRef,
    children,
    thumbIcon,
    startIcon,
    endIcon,
    isHovered,
    isSelected,
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
