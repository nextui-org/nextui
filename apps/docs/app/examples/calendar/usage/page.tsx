"use client";

import {Calendar} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

export default function Page() {
  return (
    <div className="flex gap-4 p-4">
      <Calendar aria-label="Date (No Selection)" />
      <Calendar aria-label="Date (Uncontrolled)" defaultValue={parseDate("2020-02-03")} />
    </div>
  );
}
