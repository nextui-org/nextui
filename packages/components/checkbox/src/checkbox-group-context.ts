import {createContext} from "@heroui/react-utils";

import {ContextType} from "./use-checkbox-group";

export const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<ContextType>({
  name: "CheckboxGroupContext",
  strict: false,
});
