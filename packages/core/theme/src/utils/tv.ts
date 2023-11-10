import {tv as tvBase, TV} from "tailwind-variants";

import {mappedSpacingScaleKeys} from "../types";
const COMMON_UNITS = ["small", "medium", "large"];

export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    twMergeConfig: {
      ...config?.twMergeConfig,
      theme: {
        ...config?.twMergeConfig?.theme,
        opacity: ["disabled"],
        spacing: ["divider", "unit", ...mappedSpacingScaleKeys],
        borderWidth: COMMON_UNITS,
        borderRadius: COMMON_UNITS,
      },
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        shadow: [{shadow: COMMON_UNITS}],
        "font-size": [{text: ["tiny", ...COMMON_UNITS]}],
        "bg-image": ["bg-stripe-gradient"],
        "min-w": [
          {
            "min-w": ["unit", ...mappedSpacingScaleKeys],
          },
        ],
        "min-h": [
          {
            "min-h": ["unit", ...mappedSpacingScaleKeys],
          },
        ],
      },
    },
  });
