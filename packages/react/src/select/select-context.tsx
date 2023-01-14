import {SelectState} from "react-stately";

import {createContext} from "../utils/context";
const [SelectProvider, useSelectContext] = createContext<SelectState<object>>({
  name: "SelectContext",
  errorMessage:
    "useSelectContext: `context` is undefined. Seems you forgot to wrap select components in `<Select />`",
});

export {SelectProvider, useSelectContext};
