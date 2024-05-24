import {MutableRefObject, RefObject} from "react";

/**
 * Used to handle the outside interaction for popover-based components
 * e.g. dropdown, datepicker, date-range-picker, popover, select, autocomplete etc
 * @param element - the element outside of the popover ref, originally from `shouldCloseOnInteractOutside`
 * @param ref - The popover ref object that will interact outside with
 * @param state - The popover state from the target component
 * @param shouldFocus - a mutable ref boolean object to control the focus state
 *                      (used in input-based component such as autocomplete)
 * @returns - a boolean value which is same as shouldCloseOnInteractOutside
 */
export const ariaShouldCloseOnInteractOutside = (
  element: Element,
  ref: RefObject<Element>,
  state: any,
  shouldFocus?: MutableRefObject<boolean>,
) => {
  let trigger = ref?.current;

  // check if the click is on the underlay
  const clickOnUnderlay = element?.children?.[0]?.getAttribute("role") === "dialog" ?? false;

  // if interacting outside the component
  if (!trigger || !trigger.contains(element)) {
    // blur the component (e.g. autocomplete)
    if (shouldFocus) shouldFocus.current = false;
    // if the click is not on the underlay,
    // trigger the state close to prevent from opening multiple popovers at the same time
    // e.g. open dropdown1 -> click dropdown2 (dropdown1 should be closed and dropdown2 should be open)
    if (!clickOnUnderlay) state.close();
  } else {
    // otherwise the component (e.g. autocomplete) should keep focused
    if (shouldFocus) shouldFocus.current = true;
  }

  // if the click is on the underlay,
  // clicking the overlay should close the popover instead of closing the modal
  // otherwise, allow interaction with other elements
  return clickOnUnderlay;
};
