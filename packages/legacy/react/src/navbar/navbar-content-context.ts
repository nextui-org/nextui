import {createContext} from "../utils/context";

import {UseNavbarContentReturn} from "./use-navbar-content";

export const [NavbarContentProvider, useNavbarContentContext] =
  createContext<UseNavbarContentReturn>({
    strict: false,
    name: "NavbarContentContext",
  });
