import type {ContextType} from "./use-calendar";

import {createContext} from "@nextui-org/react-utils";

export const [CalendarProvider, useCalendarContext] = createContext<ContextType>({
  name: "CalendarContext",
  strict: true,
});
