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

/**
 * This function takes an array of classes and adds another array of classes to it.
 * @param classes Array<string>
 * @param newClasses  Array<string>
 * @returns Array<string>
 */
export const withClasses = (classes: Array<string>, newClasses: Array<string>) => {
  // If there are existing classes, but no new classes, return the existing classes
  if (!classes) {
    if (!newClasses) {
      return [];
    }

    return newClasses;
  }

  // If there are new classes, but no existing classes, return the new classes
  if (!newClasses) {
    return classes;
  }

  // If there are both new classes and existing classes, return a combination of the two
  return classes.concat(newClasses);
};

export const withFocusVisible = (classes: Array<string>) => {
  return withClasses(classes, focusVisibleClasses);
};
