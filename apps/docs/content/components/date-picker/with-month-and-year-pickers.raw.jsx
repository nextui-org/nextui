import {DatePicker} from "@nextui-org/react";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DatePicker showMonthAndYearPickers label="Birth Date" variant="bordered" />
    </div>
  );
}
