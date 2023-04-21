import {createContext} from "@nextui-org/shared-utils";

import {ContextType} from "./use-card";

export const [CardProvider, useCardContext] = createContext<ContextType>({
  name: "CardContext",
  strict: true,
  errorMessage:
    "useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />",
});
