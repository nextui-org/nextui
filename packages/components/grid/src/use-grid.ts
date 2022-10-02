import type {HTMLNextUIProps} from "@nextui-org/system";

import {
  BreakpointsValue,
  Justify,
  Direction,
  AlignItems,
  AlignContent,
  clsx,
} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface UseGridProps extends HTMLNextUIProps<"div"> {
  /**
   * Max width extra small devices (<650px)
   * @default "false"
   */
  xs?: BreakpointsValue;
  /**
   * Max width small devices (>=650px)
   * @default "false"
   */
  sm?: BreakpointsValue;
  /**
   * Max width medium devices (>=960px)
   * @default "false"
   */
  md?: BreakpointsValue;
  /**
   * Max width large devices (>=1280px)
   * @default "false"
   */
  lg?: BreakpointsValue;
  /**
   * Max width extra large devices (>=1400px)
   * @default "false"
   */
  xl?: BreakpointsValue;
  /**
   * CSS "justify-content" property
   */
  justify?: Justify;
  /**
   * CSS "flex-direction" property
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

const getItemLayout = (val?: BreakpointsValue): React.CSSProperties => {
  const display = val === 0 ? "none" : "inherit";

  if (typeof val === "number") {
    const width = (100 / 12) * val;
    const ratio = width > 100 ? "100%" : width < 0 ? "0" : `${width}%`;

    return {
      flexGrow: 0,
      display,
      maxWidth: ratio,
      flexBasis: ratio,
    };
  }

  return {
    flexGrow: 1,
    display,
    maxWidth: "100%",
    flexBasis: "0",
  };
};

export function useGrid(props: UseGridProps) {
  const {
    xs = false,
    sm = false,
    md = false,
    lg = false,
    xl = false,
    alignItems,
    alignContent,
    justify,
    direction,
    className,
    ...otherProps
  } = props;

  const classes = useMemo(() => {
    const breaks: {[key: string]: unknown} = {
      xs,
      sm,
      md,
      lg,
      xl,
    };
    const classString = Object.keys(breaks).reduce((pre, name) => {
      if (breaks[name] !== undefined && breaks[name] !== false) return `${pre} ${name}`;

      return pre;
    }, "");

    return classString.trim();
  }, [xs, sm, md, lg, xl]);

  const gridCss = useMemo(() => {
    return {
      alignItems,
      alignContent,
      justifyContent: justify,
      flexDirection: direction,
      "&.xs": {
        ...getItemLayout(xs),
      },
      "@xsMax": {
        "&.xs": {
          ...getItemLayout(xs),
        },
      },
      "@sm": {
        "&.sm": {
          ...getItemLayout(sm),
        },
      },
      "@md": {
        "&.md": {
          ...getItemLayout(md),
        },
      },
      "@lg": {
        "&.lg": {
          ...getItemLayout(lg),
        },
      },
      "@xl": {
        "&.xl": {
          ...getItemLayout(xl),
        },
      },
    };
  }, [xs, sm, md, lg, xl, justify, direction, alignItems, alignContent, getItemLayout]);

  return {gridCss, className: clsx(classes, className), ...otherProps};
}

export type UseGridReturn = ReturnType<typeof useGrid>;
