import {RefObject} from "react";

/**
 * Used to handle the outside interaction for popover-based components
 * e.g. dropdown, datepicker, date-range-picker, popover, select, autocomplete etc
 * @param element - the element outside of the popover ref, originally from `shouldCloseOnInteractOutside`
 * @param triggerRef - The trigger ref object
 * @param state - The state from the popover component
 * @returns - a boolean value which is same as shouldCloseOnInteractOutside
 */
export const ariaShouldCloseOnInteractOutside = (
  element: Element,
  triggerRef: RefObject<Element>,
  state: any,
) => {
  const trigger = triggerRef?.current!;

  if (!trigger || !trigger.contains(element)) {
    const startElements = document.querySelectorAll("body > span[data-focus-scope-start]");
    let focusScopeElements: Element[] = [];

    startElements.forEach((startElement) => {
      focusScopeElements.push(startElement.nextElementSibling!);
    });

    if (focusScopeElements.length === 1) {
      state.close();

      return false;
    }
  }

  return !trigger || !trigger.contains(element);
};
