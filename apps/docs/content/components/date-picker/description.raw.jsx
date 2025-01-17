import {DatePicker} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        className="max-w-[284px]"
        description={"This is my birth date."}
        label="Birth date"
      />
    </div>
  );
}
