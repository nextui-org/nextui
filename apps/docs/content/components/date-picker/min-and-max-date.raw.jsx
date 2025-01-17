import {DatePicker} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <div className="w-full flex flex-col gap-1">
        <h3>Min date</h3>
        <DatePicker
          defaultValue={today(getLocalTimeZone()).subtract({days: 1})}
          label="Date"
          minValue={today(getLocalTimeZone())}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h3>Max date</h3>
        <DatePicker
          defaultValue={today(getLocalTimeZone()).add({days: 1})}
          label="Date"
          maxValue={today(getLocalTimeZone())}
        />
      </div>
    </div>
  );
}
