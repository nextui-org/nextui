import type {AvatarSlots, AvatarVariantProps, SlotsToClasses} from "@nextui-org/theme";
import type {DOMElement, DOMAttributes, HTMLNextUIProps, PropGetter} from "@nextui-org/system";

import {avatar} from "@nextui-org/theme";
import {useProviderContext} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {ReactRef, useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {clsx, safeText, dataAttr} from "@nextui-org/shared-utils";
import {useFocusRing} from "@react-aria/focus";
import {useMemo, useCallback} from "react";
import {useImage} from "@nextui-org/use-image";
import {useHover} from "@react-aria/interactions";

import {useAvatarGroupContext} from "./avatar-group-context";

interface Props extends HTMLNextUIProps<"span"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLSpanElement | null>;
  /**
   * Ref to the Image DOM node.
   */
  imgRef?: ReactRef<HTMLImageElement>;
  /**
   * The name of the person in the avatar. -
   * if **src** has loaded, the name will be used as the **alt** attribute of the **img**
   * - If **src** is not loaded, the name will be used to create the initials
   */
  name?: string;
  /**
   * Image source.
   */
  src?: string;
  /**
   * Image alt text.
   */
  alt?: string;
  /*
   * Avatar icon.
   */
  icon?: React.ReactNode;
  /**
   * Whether the avatar can be focused.
   * @default false
   */
  isFocusable?: boolean;
  /**
   * If `true`, the fallback logic will be skipped.
   * @default false
   */
  ignoreFallback?: boolean;
  /**
   * If `false`, the avatar will show the background color while loading.
   */
  showFallback?: boolean;
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string;
  /**
   * Custom fallback component.
   */
  fallback?: React.ReactNode;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
  /**
   * The component used to render the image.
   * @default "img"
   */
  ImgComponent?: React.ElementType;
  /**
   * Props to pass to the image component.
   */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  /**
   * Classname or List of classes to change the classNames of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Avatar classNames={{
   *    base:"base-classes",
   *    img: "image-classes",
   *    name: "name-classes",
   *    icon: "icon-classes",
   *    fallback: "fallback-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<AvatarSlots>;
}

export type UseAvatarProps = Props &
  Omit<AvatarVariantProps, "children" | "isInGroup" | "isInGridGroup">;

export function useAvatar(originalProps: UseAvatarProps = {}) {
  const globalContext = useProviderContext();
  const groupContext = useAvatarGroupContext();
  const isInGroup = !!groupContext;

  const {
    as,
    ref,
    src,
    name,
    icon,
    classNames,
    fallback,
    alt = name || "avatar",
    imgRef: imgRefProp,
    color = groupContext?.color ?? "default",
    radius = groupContext?.radius ?? "full",
    size = groupContext?.size ?? "md",
    isBordered = groupContext?.isBordered ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    isFocusable = false,
    getInitials = safeText,
    ignoreFallback = false,
    showFallback: showFallbackProp = false,
    ImgComponent = "img",
    imgProps,
    className,
    onError,
    ...otherProps
  } = originalProps;

  const Component = as || "span";

  const domRef = useDOMRef(ref);
  const imgRef = useDOMRef(imgRefProp);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing();
  const {isHovered, hoverProps} = useHover({isDisabled});
  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const imageStatus = useImage({src, onError, ignoreFallback});

  const isImgLoaded = imageStatus === "loaded";

  const shouldFilterDOMProps = typeof ImgComponent === "string";

  /**
   * Fallback avatar applies under 2 conditions:
   * - If `src` was passed and the image has not loaded or failed to load
   * - If `src` wasn't passed
   *
   * In this case, we'll show either the name avatar or default avatar
   */
  const showFallback = (!src || !isImgLoaded) && showFallbackProp;

  const slots = useMemo(
    () =>
      avatar({
        color,
        radius,
        size,
        isBordered,
        isDisabled,
        isInGroup,
        disableAnimation,
        isInGridGroup: groupContext?.isGrid ?? false,
      }),
    [
      color,
      radius,
      size,
      isBordered,
      isDisabled,
      disableAnimation,
      isInGroup,
      groupContext?.isGrid,
    ],
  );

  const baseStyles = clsx(classNames?.base, className);

  const canBeFocused = useMemo(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);

  const getAvatarProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: domRef,
      tabIndex: canBeFocused ? 0 : -1,
      "data-hover": dataAttr(isHovered),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      className: slots.base({
        class: clsx(baseStyles, props?.className),
      }),
      ...mergeProps(otherProps, hoverProps, canBeFocused ? focusProps : {}),
    }),
    [canBeFocused, slots, baseStyles, focusProps, otherProps],
  );

  const getImageProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: imgRef,
      src: src,
      disableAnimation,
      "data-loaded": dataAttr(isImgLoaded),
      className: slots.img({class: classNames?.img}),
      ...mergeProps(
        imgProps,
        props,
        filterDOMProps({disableAnimation} as DOMAttributes<DOMElement>, {
          enabled: shouldFilterDOMProps,
        }),
      ),
    }),
    [slots, isImgLoaded, imgProps, disableAnimation, src, imgRef, shouldFilterDOMProps],
  );

  return {
    Component,
    ImgComponent,
    src,
    alt,
    icon,
    name,
    imgRef,
    slots,
    classNames,
    fallback,
    isImgLoaded,
    showFallback,
    ignoreFallback,
    getInitials,
    getAvatarProps,
    getImageProps,
  };
}

export type UseAvatarReturn = ReturnType<typeof useAvatar>;
