import {DatePicker} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker label="Placement start" selectorButtonPlacement="start" />
      <DatePicker label="Placement end (default)" selectorButtonPlacement="end" />
    </div>
  );
}
