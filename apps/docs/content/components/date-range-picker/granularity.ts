const App = `import {DateRangePicker} from "@nextui-org/react";
import {parseAbsoluteToLocal} from "@internationalized/date";

export default function App() {
  let [date, setDate] = React.useState({
    start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
  });

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DateRangePicker
        fullWidth
        granularity="second"
        label="Date and time range"
        value={date}
        onChange={setDate}
      />
      <DateRangePicker
        fullWidth
        granularity="day"
        label="Date range"
        value={date}
        onChange={setDate}
      />
    </div>
  );
}`;

const AppTs = `import {DateRangePicker} from "@nextui-org/react";
import {DateValue, parseAbsoluteToLocal} from "@internationalized/date";
import {RangeValue} from "@react-types/shared";

export default function App() {
  let [date, setDate] = React.useState<RangeValue<DateValue>>({
    start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
  });

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DateRangePicker
        fullWidth
        granularity="second"
        label="Date and time range"
        value={date}
        onChange={setDate}
      />
      <DateRangePicker
        fullWidth
        granularity="day"
        label="Date range"
        value={date}
        onChange={setDate}
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
