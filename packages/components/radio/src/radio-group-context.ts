import type {ContextType} from "./use-radio-group";

import {createContext} from "@nextui-org/react-utils";

export const [RadioGroupProvider, useRadioGroupContext] = createContext<ContextType>({
  name: "RadioGroupContext",
  strict: false,
});
