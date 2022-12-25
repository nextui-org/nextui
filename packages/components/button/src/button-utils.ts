import type {UseButtonProps} from "./use-button";
import {CSS} from '@nextui-org/system'

export const getColors = (props: UseButtonProps): CSS => {
  if (!props.disabled) {
    if (props.auto && props.color === "gradient" && (props.bordered || props.ghost)) {
      return {
        px: "$$buttonBorderWeight",
        py: "$$buttonBorderWeight",
      };
    }

    return {};
  }
  const defaultDisabledCss: CSS = {
    bg: "$accents1",
    color: "$accents7",
    transform: "none",
    boxShadow: "none",
    pe: "none",
  };

  if (!props.bordered && !props.flat && !props.ghost && !props.light) {
    return defaultDisabledCss;
  }
  if (props.color === "gradient" && (props.bordered || props.ghost)) {
    return {
      color: "$accents4",
      backgroundImage:
        "linear-gradient($background, $background), linear-gradient($accents2, $accents2)",
      transform: "none",
      boxShadow: "none",
      pe: "none",
      pl: "$$buttonBorderWeight",
      pr: "$$buttonBorderWeight",
    };
  }
  if (props.bordered || props.ghost || props.light) {
    return {
      ...defaultDisabledCss,
      bg: "transparent",
      borderColor: "$accents4",
    };
  }
  if (props.flat) {
    return {
      ...defaultDisabledCss,
      bg: "$accents1",
    };
  }

  return {};
};
