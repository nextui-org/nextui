import {act} from "@testing-library/react";

import {isFocusable} from "./tabbable";
import {getActiveElement} from "./dom";

export function focus(el: HTMLElement) {
  if (getActiveElement(el) === el) return;
  if (!isFocusable(el)) return;
  act(() => {
    el.focus();
  });
}

export function blur(el?: HTMLElement | null) {
  if (el == null) el = document.activeElement as HTMLElement;
  if (el.tagName === "BODY") return;
  if (getActiveElement(el) !== el) return;
  act(() => {
    if (el && "blur" in el) el.blur();
  });
}
