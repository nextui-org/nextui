import {DatePicker} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        isInvalid
        className="max-w-[284px]"
        errorMessage="Please enter a valid date."
        label="Birth date"
      />
    </div>
  );
}
