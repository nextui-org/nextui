import type {DateValue} from "@react-types/calendar";

import React from "react";
import {Calendar} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

export default function App() {
  let [value, setValue] = React.useState<DateValue | null>(parseDate("2024-03-07"));

  return <Calendar aria-label="Date (Controlled)" value={value} onChange={setValue} />;
}
