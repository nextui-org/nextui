import type {ImageVariantProps, SlotsToClasses, ImageSlots} from "@nextui-org/theme";

import {ImgHTMLAttributes, useCallback} from "react";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {image} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {useImage as useImageBase} from "@nextui-org/use-image";
import {useMemo} from "react";
type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;

interface Props extends HTMLNextUIProps<"img"> {
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
   * A fallback image.
   */
  fallbackSrc?: React.ReactNode;
  /**
   * Whether to disable the loading skeleton.
   * @default false
   */
  disableSkeleton?: boolean;
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps["onLoad"];
  /**
   * A loading strategy to use for the image.
   */
  loading?: NativeImageProps["loading"];
  /**
   * Controlled loading state.
   */
  isLoading?: boolean;
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
    src,
    width,
    height,
    className,
    styles,
    loading,
    isBlurred,
    fallbackSrc,
    isLoading: isLoadingProp,
    disableSkeleton = !!fallbackSrc,
    onError,
    onLoad,
    ...otherProps
  } = props;

  const imageStatus = useImageBase({
    src,
    loading,
    onError,
    onLoad,
    ignoreFallback: false,
  });

  const isImgLoaded = imageStatus === "loaded" && !isLoadingProp;
  const isLoading = imageStatus === "loading" || isLoadingProp;

  const Component = as || "img";

  const domRef = useDOMRef(ref);

  const {w, h} = useMemo(() => {
    return {
      w: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
      h: height ? (typeof height === "number" ? `${height}px` : height) : "auto",
    };
  }, [width, height]);

  const showFallback = (!src || !isImgLoaded) && !!fallbackSrc;
  const showSkeleton = isLoading && !disableSkeleton;

  const slots = useMemo(
    () =>
      image({
        ...variantProps,
        showSkeleton,
      }),
    [...Object.values(variantProps), showSkeleton],
  );

  const baseStyles = clsx(className, styles?.base);

  const getImgProps: PropGetter = () => {
    return {
      src,
      ref: domRef,
      width: w,
      height: h,
      "data-loaded": dataAttr(isImgLoaded),
      className: slots.img({class: baseStyles}),
      ...otherProps,
    };
  };

  const getWrapperProps = useCallback<PropGetter>(() => {
    const fallbackStyle = showFallback
      ? {
          backgroundImage: `url(${fallbackSrc})`,
        }
      : {};

    return {
      className: slots.base({class: baseStyles}),
      style: {
        ...fallbackStyle,
      },
    };
  }, [slots, showFallback, fallbackSrc, baseStyles]);

  const getBlurredImgProps = useCallback<PropGetter>(() => {
    return {
      src,
      "aria-hidden": dataAttr(true),
      className: slots.blurredImg({class: styles?.blurredImg}),
    };
  }, [slots, src, styles?.blurredImg]);

  return {
    Component,
    domRef,
    slots,
    styles,
    isBlurred,
    disableSkeleton,
    fallbackSrc,
    isZoomed: originalProps.isZoomed,
    isLoading: originalProps.isLoading,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
  };
}

export type UseImageReturn = ReturnType<typeof useImage>;
