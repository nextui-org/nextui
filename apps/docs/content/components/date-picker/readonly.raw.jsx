import {DatePicker} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker isReadOnly className="max-w-[284px]" label="Birth date" />
    </div>
  );
}
