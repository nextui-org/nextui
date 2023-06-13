import type {ContextType} from "./use-radio-group";

import {createContext} from "@nextui-org/react-utils";

export const [RadioGroupProvider, useRadioGroupContext] = createContext<ContextType>({
  name: "RadioGroupContext",
  strict: true,
  errorMessage:
    "useRadioGroupContext: `context` is undefined. Seems you forgot to wrap all checkbox components within `<Radio.Group />`",
});
