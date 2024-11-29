import {DatePicker} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker label="Birth date" pageBehavior="single" visibleMonths={2} />
    </div>
  );
}
