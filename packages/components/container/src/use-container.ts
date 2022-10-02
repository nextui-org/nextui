import type {
  Wrap,
  Display,
  Justify,
  Direction,
  AlignItems,
  AlignContent,
} from "@nextui-org/shared-utils";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {useMemo} from "react";

export interface UseContainerProps extends HTMLNextUIProps<"div"> {
  /**
   * Max width extra small devices (<650px)
   * @default "false"
   */
  xs?: boolean;
  /**
   * Max width small devices (>=650px)
   * @default "false"
   */
  sm?: boolean;
  /**
   * Max width medium devices (>=960px)
   * @default "false"
   */
  md?: boolean;
  /**
   * Max width large devices (>=1280px)
   * @default "false"
   */
  lg?: boolean;
  /**
   * Max width extra large devices (>=1400px)
   * @default "false"
   */
  xl?: boolean;
  /**
   * Sets the width in 100% at all breakpoints
   * @default false
   */
  fluid?: boolean;
  /**
   * Sets a max-width at each responsive breakpoint
   * @default true
   */
  responsive?: boolean;
  /**
   * The children's spacing, commonly used for `Col` & `Row` components
   * @default 2
   */
  gap?: number;
  /**
   * CSS "flex-wrap" property
   * @default "wrap"
   */
  wrap?: Wrap;
  /**
   * CSS "display" property
   * @default "block"
   */
  display?: Display;
  /**
   * CSS "justify-content" property
   */
  justify?: Justify;
  /**
   * CSS "flex-direction" property
   * @default "row"
   */
  direction?: Direction;
  /**
   * CSS "align-items" property
   */
  alignItems?: AlignItems;
  /**
   * CSS "align-content" property
   */
  alignContent?: AlignContent;
}

export function useContainer(props: UseContainerProps) {
  const {
    xs = false,
    sm = false,
    md = false,
    lg = false,
    xl = false,
    gap = 2,
    responsive = true,
    fluid = false,
    wrap = "wrap",
    display = "block",
    direction = "row",
    justify,
    alignItems,
    alignContent,
    ...otherProps
  } = props;

  const gapUnit = useMemo(() => {
    return `calc(${gap} * $space$sm)`;
  }, [gap]);

  const getMaxWidth = () => {
    if (xs) return "$breakpoints$xs";
    if (sm) return "$breakpoints$sm";
    if (md) return "$breakpoints$md";
    if (lg) return "$breakpoints$lg";
    if (xl) return "$breakpoints$xl";

    return "";
  };

  const containerCss = useMemo(() => {
    return {
      px: gapUnit,
      maxWidth: getMaxWidth(),
      alignItems,
      alignContent,
      flexWrap: wrap,
      display: display,
      justifyContent: justify,
      flexDirection: direction,
    };
  }, [gapUnit, getMaxWidth, alignItems, alignContent, wrap, display, justify, direction]);

  return {
    containerCss,
    responsive,
    fluid,
    ...otherProps,
  };
}

export type UseContainerReturn = ReturnType<typeof useContainer>;
