import {fireEvent} from "@testing-library/react";

/**
 * Triggers a simulated press event on the specified element.
 * @param element - The HTML element to trigger the press event on.
 * @param opts - Optional event options.
 */
export function triggerPress(element: HTMLElement, opts = {}) {
  fireEvent.mouseDown(element, {detail: 1, ...opts});
  fireEvent.mouseUp(element, {detail: 1, ...opts});
  fireEvent.click(element, {detail: 1, ...opts});
}

/**
 * Triggers a simulated key press event on the active element.
 * @param key - The key to press.
 */
export function type(key: string) {
  if (!document.activeElement) {
    throw new Error("No active element found.");
  }

  fireEvent.keyDown(document.activeElement, {key});
  fireEvent.keyUp(document.activeElement, {key});
}
