import {useCallback} from "react";

export interface UseSpacerProps {
  /**
   * x-axis spacing
   */
  x?: number;
  /**
   * 	y-axis spacing
   */
  y?: number;
}

const getMargin = (num: number): string => {
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`;
};

export function useSpacer(props: UseSpacerProps) {
  const {x, y} = props;

  const getSpacerCss = useCallback(() => {
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
    getSpacerCss,
  };
}

export type UseSpacerReturn = ReturnType<typeof useSpacer>;
