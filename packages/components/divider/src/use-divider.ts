import {useMemo} from "react";
import {HTMLNextUIProps, CSS} from "@nextui-org/system";
import {TextProps} from "@nextui-org/text";
import {DividerAlign, getMargin} from "@nextui-org/shared-utils";

export interface UseDividerProps extends HTMLNextUIProps<"div"> {
  /**
   * x-axis spacing
   * @default 0
   */
  x?: number;
  /**
   *  y-axis spacing
   * @default 0
   */
  y?: number;
  /**
   * Divider height in pixels
   * @default 1
   */
  height?: CSS["height"];
  /**
   * Divider background color
   * @default "border"
   */
  color?: CSS["color"];
  /**
   * Divider text children color
   */
  textProps?: TextProps;
  /**
   * Divider alignment
   * @default center
   */
  align?: DividerAlign;
}

export function useDivider(props: UseDividerProps) {
  const {
    x = 0,
    y = 0,
    align = "center",
    height = 1,
    color = "$border",
    textProps = {},
    ...otherProps
  } = props;

  const alignCss = useMemo(() => {
    if (!align || align === "center") return {};
    if (align === "left" || align === "start") {
      return {transform: "translateY(-50%)", left: "7%"};
    }

    return {
      transform: "translateY(-50%)",
      left: "auto",
      right: "7%",
    };
  }, [align]);

  const dividerCss = useMemo(() => {
    const top = y ? getMargin(y / 2) : 0;
    const left = x ? getMargin(x / 2) : 0;

    return {
      backgroundColor: color,
      margin: `${top} ${left}`,
      height: `calc(${height} * 1px)`,
    };
  }, [x, y, color]);

  return {dividerCss, alignCss, textProps, ...otherProps};
}

export type UseDividerReturn = ReturnType<typeof useDivider>;
