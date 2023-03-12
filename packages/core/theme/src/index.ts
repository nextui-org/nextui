export * from "./components";
export * from "./utils";
export * from "./colors";

import {cn as cnBase} from "tailwind-variants";
export {tv} from "tailwind-variants";
export type {VariantProps} from "tailwind-variants";

export const cn = (...classes: any) => cnBase(classes)();
