import {createContext} from "@nextui-org/react-utils";
import {DisclosureGroupState} from "@react-stately/disclosure";

export const [AccordianContext, useAccordianContext] = createContext<DisclosureGroupState>({
  name: "AccordianContext",
  strict: true,
  errorMessage:
    "useAccordianContext: `context` is undefined. Seems you forgot to wrap component within <Accordian />",
});
