import type {RatingSlots, RatingVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@nextui-org/system";
import {rating} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {ReactNode, useCallback, useMemo, useRef} from "react";
import {useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";
import {useLocale} from "@react-aria/i18n";
import {AriaTextFieldProps} from "@react-types/textfield";
import {useControlledState} from "@react-stately/utils";
import {useSafeLayoutEffect} from "@nextui-org/use-safe-layout-effect";
import {RadioGroupProps} from "@nextui-org/radio";

export type RatingValueType = {
  hoveredValue: number;
  selectedValue: number;
};

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLInputElement | null>;
  /*
   * The Rating Segments that make up the Rating Component.
   */
  children?: ReactNode;
  /**
   * Ref to the DOM node.
   */
  baseRef?: ReactRef<HTMLDivElement | null>;
  /**
   * Icon to be used for rating. By default, star icon will be used.
   */
  icon?: React.ReactNode;
  /**
   * Color to be filled in the icon. By default, fillColor will be gold.
   */
  fillColor?: string;
  /**
   * Color for the stroke of the icon. By default, strokeColor will be equal to fillColor.
   */
  strokeColor?: string;
  /**
   * Opacity when the icon is not active. By default, opacity will be 0.2. Range [0, 1]
   */
  opacity?: number;
  /**
   * Opacity when the icon is active. By default, selectedOpacity will be 1. Range [0, 1]
   */
  activeOpacity?: number;
  /**
   * Precision fraction round-off for Rating value. Range (0, 1]
   */
  precision?: number;
  /**
   * Maximum value for the Rating.
   */
  length: number;
  /**
   * If true, then only the Icon corresponding to Rating value will be highlighted.
   */
  isSingleSelection?: boolean;
  /**
   * Boolean to disable the Rating Component.
   */
  isDisabled?: boolean;
  /**
   * Boolean to disable animation.
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Rating classNames={{
   *    base:"base-classes",
   *    mainWrapper:"main-wrapper-classes",
   *    iconWrapper: "icon-wrapper-classes",
   *    iconSegement: "icon-segment-classes",
   *    icon: "icon-classes",
   *    input: "input-classes",
   *    radioButtonsWrapper: "radio-buttons-wrapper-classes",
   *    radioButtonWrapper: "radio-button-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<RatingSlots>;
  /**
   * onValueChnage method gets called whenever the value of rating changes.
   */
  onValueChange?: (value: number) => void;
}

export type UseRatingProps = Props & RatingVariantProps & Omit<AriaTextFieldProps, "onChange">;

export function useRating(originalProps: UseRatingProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, rating.variantKeys);

  const {
    ref,
    baseRef,
    as,
    className,
    length = 5,
    classNames,
    strokeColor,
    precision: precisionValue = 1,
    fillColor = "gold",
    opacity: opacityValue = 0.2,
    activeOpacity: activeOpacityValue = 1,
    children = null,
    isSingleSelection = false,
    icon,
    defaultValue,
    value,
    onValueChange = () => {},
    validationBehavior,
    name,
    errorMessage,
    description,
    onChange,
    onBlur,
    ...otherProps
  } = props;

  const {
    disableAnimation = globalContext?.disableAnimation ?? false,
    isDisabled = originalProps.isDisabled ?? false,
    isRequired = originalProps.isRequired ?? false,
  } = originalProps;

  const {direction} = useLocale();
  const isRTL = direction === "rtl";

  const Component = as || "div";

  const domRef = useDOMRef<HTMLInputElement>(ref);
  const baseDomRef = useDOMRef<HTMLDivElement>(baseRef);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  const slots = useMemo(
    () =>
      rating({
        ...variantProps,
        disableAnimation,
        isDisabled,
      }),
    [objectToDeps(variantProps)],
  );

  const handleValueChange = useCallback(
    (value: RatingValueType | undefined) => {
      if (value && value.selectedValue != undefined && value.selectedValue != -1) {
        onValueChange(value.selectedValue);
      }
    },
    [onValueChange],
  );

  const [ratingValue, setRatingValue] = useControlledState<RatingValueType>(
    props.value
      ? {hoveredValue: Number(props.value), selectedValue: Number(props.value)}
      : undefined,
    props.defaultValue
      ? {hoveredValue: Number(props.defaultValue), selectedValue: Number(props.defaultValue)}
      : {hoveredValue: -1, selectedValue: -1},
    handleValueChange,
  );

  // if we use `react-hook-form`, it will set the input value using the ref in register
  // i.e. setting ref.current.value to something which is uncontrolled
  // hence, sync the state with `ref.current.value`
  useSafeLayoutEffect(() => {
    if (!domRef.current || !domRef.current.value) return;
    setRatingValue({
      hoveredValue: Number(domRef.current.value),
      selectedValue: Number(domRef.current.value),
    });
  }, [domRef.current]);

  let precision = precisionValue;

  if (precisionValue <= 0 || precisionValue > 1) precision = 1;

  let opacity = opacityValue;

  if (opacityValue < 0) opacity = 0;
  if (opacityValue > 1) opacity = 1;

  let activeOpacity = activeOpacityValue;

  if (activeOpacityValue < 0) activeOpacity = 0;
  if (activeOpacityValue > 1) activeOpacity = 1;

  const validate = (value: string | null) => {
    if (!props.validate || !value) {
      return null;
    }

    return props.validate(value);
  };

  const isInvalid = props.isInvalid;

  const {hoverProps, isHovered: isIconWrapperHovered} = useHover({isDisabled});
  const shouldConsiderHover = Math.abs(Math.floor(1 / precision) - 1 / precision) < Number.EPSILON;

  const onMouseMoveIconWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!iconWrapperRef || !iconWrapperRef.current || !shouldConsiderHover) return;

    let precisionValue = precision;

    if (isSingleSelection) precisionValue = 1;

    const clientX = e.clientX;
    const {x, width} = iconWrapperRef.current.getBoundingClientRect();
    const sweepedWidth = isRTL ? x + width - clientX : clientX - x;
    const updatedHoverValue = (sweepedWidth / width) * length;
    let precisedHoverValue = Math.floor(updatedHoverValue / precisionValue) * precisionValue;

    if (precisedHoverValue < updatedHoverValue)
      precisedHoverValue = precisedHoverValue + precisionValue;
    if (precisedHoverValue > length) precisedHoverValue = length;
    setRatingValue({hoveredValue: precisedHoverValue, selectedValue: ratingValue.selectedValue});
  };

  const baseStyles = clsx(classNames?.base, className);
  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: baseDomRef,
        className: slots.base({class: baseStyles}),
        ...mergeProps(props),
        "data-slot": "base",
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(isInvalid),
        "data-required": dataAttr(originalProps?.isRequired),
        "data-readonly": dataAttr(originalProps?.isReadOnly),
        "data-hovered": dataAttr(isIconWrapperHovered),
      };
    },
    [baseDomRef, slots, baseStyles, isDisabled, isInvalid, originalProps],
  );

  const getMainWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.mainWrapper({class: clsx(classNames?.mainWrapper)}),
        ...props,
        "data-slot": "main-wrapper",
      };
    },
    [slots],
  );

  const getIconWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: iconWrapperRef,
        onMouseMove: onMouseMoveIconWrapper,
        className: slots.iconWrapper({class: clsx(classNames?.iconWrapper)}),
        ...mergeProps(props, hoverProps),
        "data-slot": "icon-wrapper",
        "data-hover": dataAttr(isIconWrapperHovered),
      };
    },
    [iconWrapperRef, slots, hoverProps, ratingValue, setRatingValue, onMouseMoveIconWrapper],
  );

  const getInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: domRef,
        value: ratingValue.selectedValue == -1 ? "" : ratingValue.selectedValue,
        className: slots.input({class: clsx(classNames?.input)}),
        type: "number",
        readOnly: true,
        ...mergeProps(props, otherProps),
        "data-slot": "input",
      };
    },
    [domRef, ratingValue, slots, originalProps, originalProps.value],
  );

  const getRadioGroupProps = (props = {}) => {
    return {
      name,
      orientation: "horizontal",
      defaultValue,
      description,
      errorMessage,
      isInvalid,
      isRequired,
      validationBehavior,
      value: ratingValue.selectedValue != -1 ? ratingValue.selectedValue.toString() : null,
      classNames: {
        wrapper: "gap-0.5",
        errorMessage: slots.errorMessage({class: classNames?.errorMessage}),
        description: slots.description({class: classNames?.description}),
      },
      validate,
      onChange,
      onValueChange: (e) => {
        setRatingValue({selectedValue: Number(e), hoveredValue: Number(e)});
      },
      ...props,
      "data-slot": "radiogroup",
    } as RadioGroupProps;
  };

  return {
    Component,
    domRef,
    children,
    isSingleSelection,
    precision,
    length,
    isRTL,
    isIconWrapperHovered,
    ratingValue,
    classNames,
    slots,
    fillColor,
    strokeColor,
    isInvalid,
    isRequired,
    shouldConsiderHover,
    opacity,
    activeOpacity,
    name,
    description,
    errorMessage,
    validationBehavior,
    icon,
    defaultValue,
    value,
    setRatingValue,
    getBaseProps,
    getMainWrapperProps,
    getIconWrapperProps,
    getInputProps,
    getRadioGroupProps,
    onChange,
    onBlur,
    validate,
  };
}

export type UseRatingReturn = ReturnType<typeof useRating>;
