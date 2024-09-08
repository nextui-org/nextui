const App = `import {DateRangePicker} from "@nextui-org/react";
import {parseZonedDateTime, parseAbsoluteToLocal} from "@internationalized/date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DateRangePicker
        defaultValue={{
          start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
          end: parseZonedDateTime("2024-04-14T11:15[America/Los_Angeles]"),
        }}
        label="Stay duration"
        labelPlacement="outside"
      />
      <DateRangePicker
        defaultValue={{
          start: parseAbsoluteToLocal("2024-04-01T07:45:00Z"),
          end: parseAbsoluteToLocal("2024-04-14T19:15:00Z"),
        }}
        label="Stay duration"
        labelPlacement="outside"
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
