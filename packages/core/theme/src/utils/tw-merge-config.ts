import type {Config} from "tailwind-merge";
export const COMMON_UNITS = ["small", "medium", "large"];

export const twMergeConfig: Partial<Config> = {
  theme: {
    opacity: ["disabled"],
    spacing: ["divider"],
    borderWidth: COMMON_UNITS,
    borderRadius: COMMON_UNITS,
  },
  classGroups: {
    shadow: [{shadow: COMMON_UNITS}],
    "font-size": [{text: ["tiny", ...COMMON_UNITS]}],
    "bg-image": ["bg-stripe-gradient"],
  },
};
