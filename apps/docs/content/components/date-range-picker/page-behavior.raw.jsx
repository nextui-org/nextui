import {DateRangePicker} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateRangePicker label="Birth date" pageBehavior="single" visibleMonths={2} />
    </div>
  );
}
