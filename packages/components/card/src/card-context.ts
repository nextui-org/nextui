import {createContext} from "@heroui/react-utils";

import {ContextType} from "./use-card";

export const [CardProvider, useCardContext] = createContext<ContextType>({
  name: "CardContext",
  strict: true,
  errorMessage:
    "useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />",
});
