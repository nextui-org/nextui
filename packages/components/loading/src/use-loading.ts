import {useMemo} from "react";
import {getCSSColor, NormalSizes} from "@nextui-org/shared-utils";
import {CSS, HTMLNextUIProps} from "@nextui-org/system";

export interface UseLoadingProps extends HTMLNextUIProps<"div"> {
  /**
   * Loading size.
   * @default "md"
   */
  size?: NormalSizes;
  /**
   * Loading color.
   * @default "primary"
   */
  color?: CSS["color"];
  /**
   * Loading label color.
   * @default "default"
   */
  textColor?: CSS["color"];
  /**
   * Loading type.
   * @default "default"
   */
  //TODO: rename to "variant"
  type?: "default" | "points" | "points-opacity" | "gradient" | "spinner";
  /**
   * Sets a background for the "gradient" loading variant.
   */
  gradientBackground?: CSS["color"];
  /**
   * Override default container styles
   */
  containerCss?: CSS;
}

export function useLoading(props: UseLoadingProps) {
  const {
    children,
    size = "md",
    color = "primary",
    type = "default",
    textColor = "default",
    gradientBackground,
    ...otherProps
  } = props;

  const gradientCSS = useMemo(() => {
    return type === "gradient" ? {"._2": {bg: gradientBackground}} : {};
  }, [type, gradientBackground]);

  const ariaLabel = useMemo(() => {
    if (children && typeof children === "string") {
      return children;
    }

    return !otherProps["aria-label"] ? "Loading" : "";
  }, [children, otherProps["aria-label"]]);

  const loadingColor = useMemo(() => {
    return getCSSColor(color as string);
  }, [color]);

  const labelColor = useMemo(() => {
    return getCSSColor(textColor as string);
  }, [textColor]);

  return {children, size, type, loadingColor, labelColor, ariaLabel, gradientCSS, ...otherProps};
}

export type UseLoadingReturn = ReturnType<typeof useLoading>;
