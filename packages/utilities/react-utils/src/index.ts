export type {CreateContextOptions, CreateContextReturn} from "./context";
export {createContext} from "./context";

export type {ReactRef} from "./refs";
export {assignRef, mergeRefs} from "./refs";

export type {UserAgentBrowser, UserAgentOS, ContextValue, UserAgentDeviceType} from "./dom";
export {
  isBrowser,
  canUseDOM,
  getUserAgentBrowser,
  getUserAgentOS,
  detectOS,
  detectDeviceType,
  detectBrowser,
  detectTouch,
  createDOMRef,
  createFocusableRef,
  useDOMRef,
  useFocusableRef,
  useSyncRef,
  areRectsIntersecting,
} from "./dom";

export type {ShapeType} from "./dimensions";
export {getCSSStyleVal, getRealShape} from "./dimensions";

export * from "@nextui-org/react-rsc-utils";
