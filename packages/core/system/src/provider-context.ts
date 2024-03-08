import type {SupportedCalendars} from "./types";
import type {Calendar} from "@internationalized/date";

import {createContext} from "@nextui-org/react-utils";

export type ContextType = {
  createCalendar?: (name: SupportedCalendars) => Calendar | null;
};

export const [ProviderContext, useProviderContext] = createContext<ContextType>({
  name: "ProviderContext",
  strict: false,
});
