import {createContext} from "@nextui-org/react-utils";

import {ContextType} from "./use-tabs";

export const [TabsProvider, useTabsContext] = createContext<ContextType>({
  name: "TabsContext",
  strict: true,
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap component within <Tabs />",
});
