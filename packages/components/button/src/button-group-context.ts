import {createContext} from "@nextui-org/shared-utils";

import {UseButtonProps} from "./use-button";

export const [ButtonGroupProvider, useButtonGroupContext] = createContext<UseButtonProps>({
  name: "ButtonGroupContext",
  strict: false,
});
