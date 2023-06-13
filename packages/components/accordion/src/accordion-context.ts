import {createContext} from "@nextui-org/react-utils";

import {ContextType} from "./use-accordion";

export const [AccordionProvider, useAccordionContext] = createContext<ContextType>({
  name: "AccordionContext",
  strict: true,
  errorMessage:
    "useAccordionContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
});
