import {pointerKey} from "@testing-library/user-event/system/pointer/shared";

/**
 * Object containing key codes for various keyboard keys.
 */
export const keyCodes = {
  Enter: 13,
  " ": 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
};

export const pointerMap: pointerKey[] = [
  {name: "MouseLeft", pointerType: "mouse", button: "primary", height: 1, width: 1, pressure: 0.5},
  {name: "MouseRight", pointerType: "mouse", button: "secondary"},
  {name: "MouseMiddle", pointerType: "mouse", button: "auxiliary"},
  {name: "TouchA", pointerType: "touch", height: 1, width: 1},
  {name: "TouchB", pointerType: "touch"},
  {name: "TouchC", pointerType: "touch"},
] as unknown as pointerKey[];
