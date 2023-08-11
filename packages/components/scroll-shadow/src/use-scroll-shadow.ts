import type {ScrollShadowVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {scrollShadow} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useDataScrollOverflow} from "@nextui-org/use-data-scroll-overflow";
import {useMemo} from "react";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The shadow height in pixels.
   * @default 40
   */
  height?: number;
}

export type UseScrollShadowProps = Props & ScrollShadowVariantProps;

export function useScrollShadow(originalProps: UseScrollShadowProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, scrollShadow.variantKeys);

  const {ref, as, children, className, height = 40, style, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  useDataScrollOverflow({domRef});

  const styles = useMemo(
    () =>
      scrollShadow({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const getBaseProps: PropGetter = (props = {}) => ({
    ref: domRef,
    className: styles,
    style: {
      "--scroll-shadow-height": `${height}px`,
      ...style,
      ...props.style,
    },
    ...otherProps,
    ...props,
  });

  return {Component, styles, domRef, children, getBaseProps};
}

export type UseScrollShadowReturn = ReturnType<typeof useScrollShadow>;
