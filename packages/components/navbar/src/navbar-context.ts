import {createContext} from "@nextui-org/shared-utils";

import {ContextType} from "./use-navbar";

export const [NavbarProvider, useNavbarContext] = createContext<ContextType>({
  name: "NavbarContext",
  strict: true,
  errorMessage:
    "useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />",
});
