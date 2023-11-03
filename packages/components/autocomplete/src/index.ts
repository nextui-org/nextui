import type {ListboxItemProps, ListboxSectionProps} from "@nextui-org/listbox";
import type {MenuTriggerAction as BaseMenuTriggerAction} from "@react-types/combobox";

import {ListboxItem, ListboxSection} from "@nextui-org/listbox";

import Autocomplete from "./autocomplete";

// export types
export type {AutocompleteProps} from "./autocomplete";
export type {ListboxItemProps as AutocompleteItemProps};
export type {ListboxSectionProps as AutocompleteSectionProps};
export type MenuTriggerAction = BaseMenuTriggerAction | undefined;

// export hooks
export {useAutocomplete} from "./use-autocomplete";

// export components
export {Autocomplete, ListboxItem as AutocompleteItem, ListboxSection as AutocompleteSection};
