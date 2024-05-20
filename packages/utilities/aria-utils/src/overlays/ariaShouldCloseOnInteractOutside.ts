import {RefObject} from "react";

/**
 * Used to handle the outside interaction for popover-based components
 * e.g. dropdown, datepicker, date-range-picker, popover, select, autocomplete etc
 * @param element - element originally from `shouldCloseOnInteractOutside`
 * @param triggerRef - The trigger ref
 * @param state - The trigger state from the target component
 * @param setShouldFocus - Set the focus state (used in input-based component such as autocomplete)
 * @returns - a boolean value which is same as shouldCloseOnInteractOutside
 */
export const ariaShouldCloseOnInteractOutside = (
  element: Element,
  triggerRef: RefObject<Element>,
  state: any,
  setShouldFocus?: (shouldFocus: boolean) => void,
) => {
  // Don't close if the click is within the trigger or the popover itself
  let trigger = triggerRef?.current;

  // check if the current component is within the modal
  const isWithinModal = element?.children?.[0]?.getAttribute("role") === "dialog" ?? false;

  // if interacting outside the component
  if (!trigger || !trigger.contains(element)) {
    if (setShouldFocus) {
      // blur the component (e.g. autocomplete)
      setShouldFocus(false);
    }
    // close the popover close the popover if it is not clicking overlay
    // e.g. clicking another component should close the current one and open the another one
    if (!isWithinModal) {
      state.close();
    }
  } else {
    if (setShouldFocus) {
      // otherwise the component (e.g. autocomplete) should keep focused
      setShouldFocus(true);
    }
  }

  // if the component is in modal,
  // clicking the overlay should close the popover instead of closing the modal
  // otherwise, allow interaction with other elements
  return isWithinModal;
};
