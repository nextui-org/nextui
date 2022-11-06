import {createContext} from "../utils/context";

import {UseDropdownReturn} from "./use-dropdown";

export const [DropdownProvider, useDropdownContext] = createContext<UseDropdownReturn>({
  name: "DropdownContext",
  errorMessage:
    "useDropdownContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Dropdown />`",
});
