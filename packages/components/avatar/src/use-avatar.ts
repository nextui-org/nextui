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

export interface UseAvatarProps extends HTMLNextUIProps<"span">, AvatarVariantProps {
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
   * List of classes to change the styles of the avatar.
   *
   * @example
   * ```ts
   * <Avatar classes={{
   *    base:"base-classes",
   *    img: "image-classes",
   *    name: "name-classes",
   *    icon: "icon-classes",
   * }} />
   * ```
   *
   */
  classes?: SlotsToClasses<AvatarSlots>;
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
}

export function useAvatar(props: UseAvatarProps) {
  const groupContext = useAvatarGroupContext();
  const isInGroup = !!groupContext;

  const {
    as,
    ref,
    src,
    imgRef: imgRefProp,
    classes,
    className,
    name,
    alt = name,
    color = groupContext?.color ?? "neutral",
    radius = groupContext?.radius ?? "full",
    size = groupContext?.size ?? "md",
    isBordered = groupContext?.isBordered ?? false,
    isFocusable = false,
    getInitials = safeText,
    ignoreFallback = false,
    showFallback: showFallbackProp = false,
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

  const buttonClasses = useMemo(() => {
    if (as !== "button") return "";

    // reset button styles
    return "appearance-none outline-none border-none cursor-pointer";
  }, [as]);

  const {isFocusVisible, focusProps} = useFocusRing();

  const styles = useMemo(
    () => avatar({color, radius, size, isBordered, isFocusVisible, isInGroup}),
    [color, radius, size, isBordered, isInGroup, isFocusVisible],
  );

  const imgClassname = clsx(
    "transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100",
    classes?.img,
  );

  const baseClassname = clsx(className, classes?.base);

  const canBeFocused = useMemo(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);

  const getAvatarProps = useCallback(
    () => ({
      tabIndex: canBeFocused ? 0 : -1,
      ...mergeProps(otherProps, canBeFocused ? focusProps : {}),
    }),
    [canBeFocused],
  );

  return {
    Component,
    src,
    alt,
    name,
    domRef,
    imgRef,
    styles,
    classes,
    isImgLoaded,
    showFallback,
    ignoreFallback,
    buttonClasses,
    baseClassname,
    imgClassname,
    getAvatarProps,
    getInitials,
    ...otherProps,
  };
}

export type UseAvatarReturn = ReturnType<typeof useAvatar>;
