import {DateRangePicker} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateRangePicker label="Placement start" selectorButtonPlacement="start" />
      <DateRangePicker label="Placement end (default)" selectorButtonPlacement="end" />
    </div>
  );
}
