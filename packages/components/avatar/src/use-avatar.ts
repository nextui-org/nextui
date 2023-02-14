import type {AvatarVariantProps, AvatarSlots, SlotsToClasses} from "@nextui-org/theme";

import {avatar} from "@nextui-org/theme";
import {HTMLNextUIProps} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef, clsx} from "@nextui-org/shared-utils";
import {useFocusRing} from "@react-aria/focus";
import {useMemo, useState, useEffect, useCallback} from "react";

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
   * Initials to show when no image is provided.
   */
  initials?: string;
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
  classes?: SlotsToClasses<AvatarSlots>;
}

export function useAvatar(props: UseAvatarProps) {
  const {
    as,
    ref,
    src,
    imgRef: imgRefProp,
    classes,
    className,
    color,
    radius,
    size,
    isBordered,
    isFocusable = false,
    ...otherProps
  } = props;

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const domRef = useDOMRef(ref);
  const imgRef = useDOMRef(imgRefProp);

  const Component = as || "span";

  const buttonClasses = useMemo(() => {
    if (as !== "button") return "";

    // reset button styles
    return "appearance-none outline-none border-none cursor-pointer";
  }, [as]);

  useEffect(() => {
    if (!src) {
      return;
    }
    imgRef?.current?.complete && setIsImgLoaded(true);
  }, [src, imgRef]);

  const {isFocusVisible, focusProps} = useFocusRing();

  const styles = useMemo(
    () => avatar({color, radius, size, isBordered, isFocusVisible}),
    [color, radius, size, isBordered, isFocusVisible],
  );

  const baseClassname = useMemo(() => clsx(className, classes?.base), [className, classes?.base]);

  const shouldShowInitials = useMemo(() => !src, [src]);

  const onImgLoad = () => {
    setIsImgLoaded(true);
  };

  const getState = useMemo(() => {
    return !isImgLoaded && src ? "loading" : "loaded";
  }, [src, isImgLoaded]);

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
    domRef,
    imgRef,
    styles,
    classes,
    className,
    baseClassname,
    isFocusable,
    isFocusVisible,
    isImgLoaded,
    shouldShowInitials,
    buttonClasses,
    getState,
    getAvatarProps,
    focusProps,
    onImgLoad,
    ...otherProps,
  };
}

export type UseAvatarReturn = ReturnType<typeof useAvatar>;
