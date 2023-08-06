import type {MenuItemProps, MenuSectionProps} from "@nextui-org/menu";

import {MenuItem, MenuSection} from "@nextui-org/menu";

import Select from "./select";

// export types
export type {SelectProps} from "./select";
export type {MenuItemProps as SelectItemProps};
export type {MenuSectionProps as SelectSectionProps};

// export hooks
export {useSelect} from "./use-select";

// export component
export {Select, MenuItem as SelectItem, MenuSection as SelectSection};
