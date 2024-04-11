"use client";

import React from "react";
import {Calendar, DateValue} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

export default function Page() {
  let [value, setValue] = React.useState<DateValue>(parseDate("2024-03-07"));

  return (
    <div className="p-4">
      <Calendar aria-label="Date (controlled)" value={value} onChange={setValue} />;
    </div>
  );
}
