import type {AvatarVariantProps, AvatarSlots, SlotsToClasses} from "@nextui-org/theme";

import {avatar} from "@nextui-org/theme";
import {HTMLNextUIProps} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef, clsx, safeText} from "@nextui-org/shared-utils";
import {useFocusRing} from "@react-aria/focus";
import {useMemo, useCallback} from "react";
import {useImage} from "@nextui-org/use-image";

import {useAvatarGroupContext} from "./avatar-group-context";

export interface UseAvatarProps
  extends Omit<HTMLNextUIProps<"span", AvatarVariantProps>, "children"> {
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
   * Classname or List of classes to change the styles of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Avatar styles={{
   *    base:"base-classes",
   *    img: "image-classes",
   *    name: "name-classes",
   *    icon: "icon-classes",
   *    fallback: "fallback-classes"
   * }} />
   * ```
   */
  styles?: SlotsToClasses<AvatarSlots>;
}

export function useAvatar(props: UseAvatarProps) {
  const groupContext = useAvatarGroupContext();
  const isInGroup = !!groupContext;

  const {
    as,
    ref,
    src,
    name,
    icon,
    styles,
    fallback,
    alt = name,
    imgRef: imgRefProp,
    color = groupContext?.color ?? "neutral",
    radius = groupContext?.radius ?? "full",
    size = groupContext?.size ?? "md",
    isBordered = groupContext?.isBordered ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    isInGridGroup = groupContext?.isGrid ?? false,
    isFocusable = false,
    getInitials = safeText,
    ignoreFallback = false,
    showFallback: showFallbackProp = false,
    className,
    onError,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);
  const imgRef = useDOMRef(imgRefProp);

  const Component = as || "span";

  const imageStatus = useImage({src, onError, ignoreFallback});
  const isImgLoaded = imageStatus === "loaded";

  /**
   * Fallback avatar applies under 2 conditions:
   * - If `src` was passed and the image has not loaded or failed to load
   * - If `src` wasn't passed
   *
   * In this case, we'll show either the name avatar or default avatar
   */
  const showFallback = (!src || !isImgLoaded) && showFallbackProp;

  const buttonStyles = useMemo(() => {
    if (as !== "button") return "";

    // reset button styles
    return "appearance-none outline-none border-none cursor-pointer";
  }, [as]);

  const {isFocusVisible, focusProps} = useFocusRing();

  const slots = avatar({
    color,
    radius,
    size,
    isBordered,
    isFocusVisible,
    isDisabled,
    isInGroup,
    isInGridGroup,
  });

  const imgStyles = clsx(
    "transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100",
    styles?.img,
  );

  const baseStyles = clsx(styles?.base, className);

  const canBeFocused = useMemo(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);

  const getAvatarProps = useCallback(
    () => ({
      tabIndex: canBeFocused ? 0 : -1,
      className: slots.base({
        class: clsx(baseStyles, buttonStyles),
      }),
      ...mergeProps(otherProps, canBeFocused ? focusProps : {}),
    }),
    [canBeFocused, slots, baseStyles, buttonStyles, focusProps, otherProps],
  );

  return {
    Component,
    src,
    alt,
    icon,
    name,
    domRef,
    imgRef,
    slots,
    styles,
    fallback,
    isImgLoaded,
    showFallback,
    ignoreFallback,
    imgStyles,
    getAvatarProps,
    getInitials,
  };
}

export type UseAvatarReturn = ReturnType<typeof useAvatar>;
