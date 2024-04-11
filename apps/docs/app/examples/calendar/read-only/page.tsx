"use client";

import {Calendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function Page() {
  return (
    <div className="p-4">
      <Calendar isReadOnly aria-label="Date (Read Only)" value={today(getLocalTimeZone())} />
    </div>
  );
}
