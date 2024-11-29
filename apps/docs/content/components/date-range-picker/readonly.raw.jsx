import {DateRangePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

export default function App() {
  return (
    <DateRangePicker
      isReadOnly
      className="max-w-xs"
      defaultValue={{
        start: parseDate("2024-04-01"),
        end: parseDate("2024-04-08"),
      }}
      label="Stay duration"
    />
  );
}
