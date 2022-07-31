import {createContext} from "../utils/context";

import {UseNavbarCollapseReturn} from "./use-navbar-collapse";

export const [NavbarCollapseProvider, useNavbarCollapseContext] =
  createContext<UseNavbarCollapseReturn>({
    strict: false,
    name: "NavbarCollapseContext",
  });
