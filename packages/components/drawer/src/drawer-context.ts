import {createContext} from "@nextui-org/react-utils";

import {UseDrawerReturn} from "./use-drawer";

export const [DrawerProvider, useDrawerContext] = createContext<UseDrawerReturn>({
  name: "DrawerContext",
  errorMessage:
    "useDrawerContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Drawer />`",
});
