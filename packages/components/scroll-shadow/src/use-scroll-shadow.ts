import type {ScrollShadowVariantProps} from "@heroui/theme";

import {HTMLHeroUIProps, mapPropsVariants, PropGetter} from "@heroui/system";
import {scrollShadow} from "@heroui/theme";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {useDataScrollOverflow, UseDataScrollOverflowProps} from "@heroui/use-data-scroll-overflow";
import {useMemo} from "react";
import {objectToDeps} from "@heroui/shared-utils";

interface Props extends HTMLHeroUIProps<"div">, Omit<UseDataScrollOverflowProps, "domRef"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The shadow size in pixels.
   * @default 40
   */
  size?: number;
}

export type UseScrollShadowProps = Props & ScrollShadowVariantProps;

export function useScrollShadow(originalProps: UseScrollShadowProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, scrollShadow.variantKeys);

  const {
    ref,
    as,
    children,
    className,
    style,
    size = 40,
    offset = 0,
    visibility = "auto",
    isEnabled = true,
    onVisibilityChange,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  useDataScrollOverflow({
    domRef,
    offset,
    visibility,
    isEnabled,
    onVisibilityChange,
    updateDeps: [children],
    overflowCheck: originalProps.orientation ?? "vertical",
  });

  const styles = useMemo(
    () =>
      scrollShadow({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const getBaseProps: PropGetter = (props = {}) => ({
    ref: domRef,
    className: styles,
    "data-orientation": originalProps.orientation ?? "vertical",
    style: {
      "--scroll-shadow-size": `${size}px`,
      ...style,
      ...props.style,
    },
    ...otherProps,
    ...props,
  });

  return {Component, styles, domRef, children, getBaseProps};
}

export type UseScrollShadowReturn = ReturnType<typeof useScrollShadow>;
