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
  const trigger = triggerRef?.current;

  if (!trigger || !trigger.contains(element)) {
    // if there is focus scope block, there will be a pair of span[data-focus-scope-start] and span[data-focus-scope-end]
    // the element with focus trap resides inbetween these two blocks
    // we push all the elements in focus scope to `focusScopeElements`
    const startElements = document.querySelectorAll("body > span[data-focus-scope-start]");
    let focusScopeElements: Element[] = [];

    startElements.forEach((startElement) => {
      focusScopeElements.push(startElement.nextElementSibling!);
    });

    // if there is just one focusScopeElement, we close the state
    // e.g. open a popover A -> click popover B
    // then popover A should be closed and popover B should be open
    // TODO: handle cases like modal > popover A -> click modal > popover B
    // we should close the popover when it is the last opened
    // however, currently ariaShouldCloseOnInteractOutside is called recursively
    // and we need a way to check if there is something closed before that (i.e. nested elements)
    // if so, popover shouldn't be closed in this case
    if (focusScopeElements.length === 1) {
      state.close();

      return false;
    }
  }

  return !trigger || !trigger.contains(element);
};
