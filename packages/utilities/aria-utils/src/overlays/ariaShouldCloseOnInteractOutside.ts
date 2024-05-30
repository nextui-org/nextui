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
  const trigger = ref?.current;
  const clickOnDialog = element?.children?.[0]?.getAttribute("role") === "dialog";
  const clickOnOnlistbox = ["listbox", "option"].includes(
    element?.parentElement?.getAttribute("role") ?? "",
  );

  // if interacting outside the component
  if (!trigger || !trigger.contains(element)) {
    // blur the component (e.g. autocomplete)
    if (shouldFocus) shouldFocus.current = false;
    // if the click is not on the dialog nor on the listbox,
    // trigger the state close to prevent from opening multiple popovers at the same time
    // e.g. open dropdown1 -> click dropdown2 (dropdown1 should be closed and dropdown2 should be open)
    if (!clickOnDialog && !clickOnOnlistbox) {
      // TODO: close the inner state only (e.g. popover -> autocomplete (close this one))
      state.close();
    }
  } else {
    // otherwise the component (e.g. autocomplete) should keep focused
    if (shouldFocus) shouldFocus.current = true;
  }

  // if the click is on the dialog or option,
  // it should close the popover instead of closing the modal / listbox
  // otherwise, allow interaction with other elements
  return clickOnDialog || clickOnOnlistbox;
};
