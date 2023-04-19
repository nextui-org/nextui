import {createContext} from "@nextui-org/shared-utils";

import {UseNavbarReturn} from "./use-navbar";

export const [NavbarProvider, useNavbarContext] = createContext<UseNavbarReturn>({
  name: "NavbarContext",
  strict: true,
  errorMessage:
    "useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />",
});
