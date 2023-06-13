import {createContext} from "@nextui-org/react-utils";

import {ContextType} from "./use-table";

export const [TableProvider, useTableContext] = createContext<ContextType>({
  name: "TableContext",
  strict: true,
  errorMessage:
    "useTableContext: `context` is undefined. Seems you forgot to wrap component within <Table />",
});
