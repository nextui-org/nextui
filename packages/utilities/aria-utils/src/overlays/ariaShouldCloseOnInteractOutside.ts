import {MutableRefObject, RefObject} from "react";

/**
 * Used to handle the outside interaction for popover-based components
 * e.g. dropdown, datepicker, date-range-picker, popover, select, autocomplete etc
 * @param element - the element outside of the popover ref, originally from `shouldCloseOnInteractOutside`
 * @param triggerRef - The trigger ref object
 * @param state - The state from the popover component
 * @param shouldFocus - a mutable ref boolean object to control the focus state
 *                      (used in input-based component such as autocomplete)
 * @returns - a boolean value which is same as shouldCloseOnInteractOutside
 */
export const ariaShouldCloseOnInteractOutside = (
  element: Element,
  triggerRef: RefObject<Element>,
  state: any,
  shouldFocus?: MutableRefObject<boolean>,
) => {
  const trigger = triggerRef?.current!;

  if (!trigger || !trigger.contains(element)) {
    // blur the component (e.g. autocomplete)
    if (shouldFocus) shouldFocus.current = false;

    const startElements = document.querySelectorAll("body > span[data-focus-scope-start]");
    let focusScopeElements: Element[] = [];

    startElements.forEach((startElement) => {
      focusScopeElements.push(startElement.nextElementSibling!);
    });

    if (focusScopeElements.length === 1) {
      state.close();

      return false;
    }
  } else {
    // otherwise the component (e.g. autocomplete) should keep focused
    if (shouldFocus) shouldFocus.current = true;
  }

  return !trigger || !trigger.contains(element);
};
