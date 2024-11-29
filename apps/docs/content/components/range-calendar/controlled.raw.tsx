import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";

import React from "react";
import {RangeCalendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  let [value, setValue] = React.useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });

  return <RangeCalendar aria-label="Date (Controlled)" value={value} onChange={setValue} />;
}
