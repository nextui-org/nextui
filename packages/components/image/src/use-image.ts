import type {ImageVariantProps, SlotsToClasses, ImageSlots} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {image} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {useImage as useImageBase} from "@nextui-org/use-image";
import {useMemo} from "react";

export interface Props extends HTMLNextUIProps<"img"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLImageElement | null>;
  /**
   * Whether to add a blurred effect to the image.
   * @default false
   */
  isBlurred?: boolean;
  /**
   * If `true`, the fallback logic will be skipped.
   * @default true
   */
  ignoreFallback?: boolean;
  /**
   * A fallback image.
   */
  fallbackSrc?: React.ReactNode;
  /**
   * Whether to disable the loading skeleton.
   * @default false
   */
  disableLoadingSkeleton?: boolean;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Image styles={{
   *    base:"base-classes", // wrapper
   *    img: "img-classes",
   *    blurredImg: "blurredImg-classes", // this is a cloned version of the img
   * }} />
   * ```
   */
  styles?: SlotsToClasses<ImageSlots>;
}

export type UseImageProps = Props & ImageVariantProps;

export function useImage(originalProps: UseImageProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, image.variantKeys);

  const {
    ref,
    as,
    src: srcProp,
    className,
    styles,
    isBlurred,
    fallbackSrc,
    ignoreFallback = true,
    disableLoadingSkeleton = false,
    onError,
    ...otherProps
  } = props;

  const imageStatus = useImageBase({src: srcProp, onError, ignoreFallback});
  const isImgLoaded = imageStatus === "loaded";

  const Component = as || "img";

  const domRef = useDOMRef(ref);

  /**
   * Fallback image applies under 2 conditions:
   * - If `src` was passed and the image has not loaded or failed to load
   * - If `src` wasn't passed
   *
   * In this case, we'll show either the name avatar or default avatar
   */
  const showFallback = (!srcProp || !isImgLoaded) && !ignoreFallback;
  const showSkeleton = showFallback && !disableLoadingSkeleton;

  const slots = useMemo(
    () =>
      image({
        ...variantProps,
        isLoading: !isImgLoaded && showSkeleton,
      }),
    [...Object.values(variantProps), isImgLoaded, showSkeleton],
  );

  const src = useMemo(() => {
    if (showFallback) {
      return fallbackSrc;
    }

    return srcProp;
  }, [srcProp, isImgLoaded, ignoreFallback]);

  const baseStyles = clsx(className, styles?.base);

  const getImgProps: PropGetter = () => {
    return {
      src,
      ref: domRef,
      "data-loaded": dataAttr(isImgLoaded),
      className: slots.img({class: baseStyles}),
      ...otherProps,
    };
  };

  const getWrapperProps: PropGetter = () => {
    return {
      className: slots.base({class: baseStyles}),
    };
  };

  const getBlurredImgProps: PropGetter = () => {
    return {
      src,
      "aria-hidden": dataAttr(true),
      className: slots.blurredImg({class: styles?.blurredImg}),
    };
  };

  return {
    Component,
    domRef,
    slots,
    styles,
    isBlurred,
    showSkeleton,
    ignoreFallback,
    disableLoadingSkeleton,
    isZoomed: originalProps.isZoomed,
    isLoading: originalProps.isLoading,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
  };
}

export type UseImageReturn = ReturnType<typeof useImage>;
