import type {Wrap, Justify, AlignItems} from "@nextui-org/shared-utils";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {useMemo} from "react";

export interface UseRowProps extends HTMLNextUIProps<"div"> {
  /**
   * The children's spacing, commonly used for `Col` component
   * @default 0
   */
  gap?: number;
  /**
   * CSS "flex-wrap" property
   * @default "nowrap"
   */
  wrap?: Wrap;
  /**
   * CSS "justify-content" property
   * @default "flex-start"
   */
  justify?: Justify;
  /**
   * CSS "align-items" property
   * @default "flex-start"
   */
  align?: AlignItems;
}

export function useRow(props: UseRowProps) {
  const {
    gap = 0,
    wrap = "nowrap",
    justify = "flex-start",
    align = "flex-start",
    ...otherProps
  } = props;

  const rowCss = useMemo(() => {
    return {
      flexWrap: wrap,
      $$rowGap: `calc(${gap} * $space$lg)`,
      marginLeft: `calc(${gap} * $space$lg / 2)`,
      marginRight: `calc(${gap} * $space$lg / 2)`,
      justifyContent: justify,
      alignItems: align,
    };
  }, [wrap, gap, justify, align]);

  return {rowCss, ...otherProps};
}

export type UseRowReturn = ReturnType<typeof useRow>;
