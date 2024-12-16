export type {
  As,
  DOMElement,
  DOMElements,
  CapitalizedDOMElements,
  DOMAttributes,
  OmitCommonProps,
  RightJoinProps,
  MergeWithAs,
  InternalForwardRefRenderFunction,
  PropsOf,
  Merge,
  HTMLNextUIProps,
  PropGetter,
  ExtendVariantProps,
  ExtendVariantWithSlotsProps,
  ExtendVariants,
  SharedSelection,
} from "@nextui-org/system-rsc";

export {
  forwardRef,
  toIterator,
  mapPropsVariants,
  mapPropsVariantsWithCommon,
  isNextUIEl,
  extendVariants,
} from "@nextui-org/system-rsc";

export type {SupportedCalendars} from "./types";
export type {NextUIProviderProps} from "./provider";
export type {ProviderContextProps} from "./provider-context";

export {NextUIProvider} from "./provider";
export {ProviderContext, useProviderContext} from "./provider-context";

export {useLabelPlacement} from "./hooks";
