import {createContext} from "../utils/context";

import {UseNavbarReturn} from "./use-navbar";

export const [NavbarProvider, useNavbarContext] = createContext<UseNavbarReturn>({
  strict: true,
  name: "NavbarContext",
  errorMessage:
    "useNavbarContext: `context` is undefined. Seems you forgot to wrap all navbar components within `<Navbar />`",
});
