/**
 * This is the base styles for all elements.
 * Is meant to be used with the `addBase` method from tailwindcss.
 */
export const baseStyles = {
  color: "hsl(var(--nextui-foreground))",
  backgroundColor: "hsl(var(--nextui-background))",
};

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

export const ringClasses = [
  "outline-none",
  "ring-2",
  "!ring-primary",
  "ring-offset-2",
  "ring-offset-background",
  "dark:ring-offset-background-dark",
];

/**
 * This classes centers the element by using absolute positioning.
 */
export const translateCenterClasses = [
  "absolute",
  "top-1/2",
  "left-1/2",
  "-translate-x-1/2",
  "-translate-y-1/2",
];

export const absoluteFullClasses = ["absolute", "inset-0"];
