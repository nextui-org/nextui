import {isIOS, runAfterTransition} from "@react-aria/utils";

import {getOwnerDocument} from "./dom-helpers";

// Safari on iOS starts selecting text on long press. The only way to avoid this, it seems,
// is to add user-select: none to the entire page. Adding it to the pressable element prevents
// that element from being selected, but nearby elements may still receive selection. We add
// user-select: none on touch start, and remove it again on touch end to prevent this.
// This must be implemented using global state to avoid race conditions between multiple elements.

// There are three possible states due to the delay before removing user-select: none after
// pointer up. The 'default' state always transitions to the 'disabled' state, which transitions
// to 'restoring'. The 'restoring' state can either transition back to 'disabled' or 'default'.

// For non-iOS devices, we apply user-select: none to the pressed element instead to avoid possible
// performance issues that arise from applying and removing user-select: none to the entire page
// (see https://github.com/adobe/react-spectrum/issues/1609).
type State = "default" | "disabled" | "restoring";

// Note that state only matters here for iOS. Non-iOS gets user-select: none applied to the target element
// rather than at the document level so we just need to apply/remove user-select: none for each pressed element individually
let state: State = "default";
let savedUserSelect = "";
let modifiedElementMap = new WeakMap<Element, string>();

export function disableTextSelection(target?: Element) {
  if (isIOS()) {
    if (state === "default") {
      const documentObject = getOwnerDocument(target);

      savedUserSelect = documentObject.documentElement.style.webkitUserSelect;
      documentObject.documentElement.style.webkitUserSelect = "none";
    }

    state = "disabled";
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    // If not iOS, store the target's original user-select and change to user-select: none
    // Ignore state since it doesn't apply for non iOS
    modifiedElementMap.set(target, target.style.userSelect);
    target.style.userSelect = "none";
  }
}

export function restoreTextSelection(target?: Element) {
  if (isIOS()) {
    // If the state is already default, there's nothing to do.
    // If it is restoring, then there's no need to queue a second restore.
    if (state !== "disabled") {
      return;
    }

    state = "restoring";

    // There appears to be a delay on iOS where selection still might occur
    // after pointer up, so wait a bit before removing user-select.
    setTimeout(() => {
      // Wait for any CSS transitions to complete so we don't recompute style
      // for the whole page in the middle of the animation and cause jank.
      runAfterTransition(() => {
        // Avoid race conditions
        if (state === "restoring") {
          const documentObject = getOwnerDocument(target);

          if (documentObject.documentElement.style.webkitUserSelect === "none") {
            documentObject.documentElement.style.webkitUserSelect = savedUserSelect || "";
          }

          savedUserSelect = "";
          state = "default";
        }
      });
    }, 300);
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    // If not iOS, restore the target's original user-select if any
    // Ignore state since it doesn't apply for non iOS
    if (target && modifiedElementMap.has(target)) {
      let targetOldUserSelect = modifiedElementMap.get(target);

      if (target.style.userSelect === "none" && targetOldUserSelect) {
        target.style.userSelect = targetOldUserSelect;
      }

      if (target.getAttribute("style") === "") {
        target.removeAttribute("style");
      }
      modifiedElementMap.delete(target);
    }
  }
}
