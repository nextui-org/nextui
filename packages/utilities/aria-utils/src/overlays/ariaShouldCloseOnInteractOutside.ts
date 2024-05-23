import {MutableRefObject, RefObject} from "react";

/**
 * Used to handle the outside interaction for popover-based components
 * e.g. dropdown, datepicker, date-range-picker, popover, select, autocomplete etc
 * @param element - element originally from `shouldCloseOnInteractOutside`
 * @param triggerRef - The trigger ref
 * @param state - The trigger state from the target component
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
  // Don't close if the click is within the trigger or the popover itself
  let trigger = triggerRef?.current;

  // check if the current component is within the modal
  const isWithinModal = element?.children?.[0]?.getAttribute("role") === "dialog" ?? false;

  // if interacting outside the component
  if (!trigger || !trigger.contains(element)) {
    if (shouldFocus !== undefined) {
      // blur the component (e.g. autocomplete)
      shouldFocus.current = false;
    }
    // close the popover close the popover if it is not clicking overlay
    // e.g. clicking another component should close the current one and open the another one
    if (!isWithinModal) {
      state.close();
    }
  } else {
    if (shouldFocus !== undefined) {
      // otherwise the component (e.g. autocomplete) should keep focused
      shouldFocus.current = true;
    }
  }

  // if the component is in modal,
  // clicking the overlay should close the popover instead of closing the modal
  // otherwise, allow interaction with other elements
  return isWithinModal;
};
