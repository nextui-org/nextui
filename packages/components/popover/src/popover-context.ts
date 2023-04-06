import {createContext} from "@nextui-org/shared-utils";

import {UsePopoverReturn} from "./use-popover";

export const [PopoverProvider, usePopoverContext] = createContext<UsePopoverReturn>({
  name: "PopoverContext",
  errorMessage:
    "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
});
