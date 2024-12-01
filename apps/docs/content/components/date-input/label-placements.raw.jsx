import {DateInput} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";

export default function App() {
  const placements = ["inside", "outside", "outside-left"];

  return (
    <div className="w-full flex flex-col max-w-sm gap-4">
      {placements.map((placement) => (
        <DateInput
          key={placement}
          description={placement}
          label="Birth date"
          labelPlacement={placement}
          placeholderValue={new CalendarDate(1995, 11, 6)}
        />
      ))}
    </div>
  );
}
