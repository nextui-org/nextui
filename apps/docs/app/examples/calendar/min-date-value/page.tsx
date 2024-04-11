"use client";

import {Calendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function Page() {
  return (
    <div className="p-4">
      <Calendar
        aria-label="Date (Min Date Value)"
        defaultValue={today(getLocalTimeZone())}
        minValue={today(getLocalTimeZone())}
      />
    </div>
  );
}
