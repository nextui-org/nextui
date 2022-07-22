import {createContext} from "../utils/context";

import {UseNavbarReturn} from "./use-navbar";

export const [NavbarProvider, useNavbarContext] = createContext<UseNavbarReturn>({
  strict: false,
  name: "NavbarContext",
});
