import {cx} from "./cva";

/**
 * focus styles when the element is focused by keyboard.
 */
export const focusVisibleClasses = [
  "focus:outline-0",
  "focus-visible:ring-2",
  "focus-visible:ring-primary",
  "focus-visible:ring-offset-2",
  "focus-visible:transition-shadow",
  "focus-visible:ring-offset-background",
  "dark:focus-visible:ring-offset-background-dark",
];

export const withFocusVisible = (classes: Array<string>) => {
  return cx(classes, focusVisibleClasses);
};
