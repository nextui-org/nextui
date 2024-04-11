"use client";

import React from "react";
import {Calendar, DateValue} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function Page() {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState<DateValue>(defaultDate);

  return (
    <div className="p-4">
      <Calendar
        aria-label="Date (Controlled Focused Value)"
        focusedValue={focusedDate}
        value={defaultDate}
        onFocusChange={setFocusedDate}
      />
    </div>
  );
}
