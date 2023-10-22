import type {ListboxItemProps, ListboxSectionProps} from "@nextui-org/listbox";

import {ListboxItem, ListboxSection} from "@nextui-org/listbox";

import Autocomplete from "./autocomplete";

// export types
export type {AutocompleteProps} from "./autocomplete";
export type {ListboxItemProps as AutocompleteItemProps};
export type {ListboxSectionProps as AutocompleteSectionProps};

// export hooks
export {useAutocomplete} from "./use-autocomplete";

// export components
export {Autocomplete, ListboxItem as AutocompleteItem, ListboxSection as AutocompleteSection};
