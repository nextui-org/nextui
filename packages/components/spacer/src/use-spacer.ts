import type {HTMLNextUIProps} from "@nextui-org/system";

import {useMemo} from "react";

export interface UseSpacerProps extends HTMLNextUIProps<"span"> {
  /**
   * x-axis spacing
   */
  x?: number;
  /**
   * 	y-axis spacing
   */
  y?: number;
  /**
   * Whether should have inline space
   */
  inline?: boolean;
}

const getMargin = (num: number): string => {
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`;
};

export function useSpacer(props: UseSpacerProps) {
  const {x, y, inline = false, ...otherProps} = props;

  const spacerCss = useMemo(() => {
    let css = {};

    if (x) {
      css = {
        ...css,
        marginLeft: getMargin(x),
      };
    }

    if (y) {
      css = {
        ...css,
        marginTop: getMargin(y),
      };
    }

    return css;
  }, [x, y]);

  return {
    spacerCss,
    inline,
    ...otherProps,
  };
}

export type UseSpacerReturn = ReturnType<typeof useSpacer>;
