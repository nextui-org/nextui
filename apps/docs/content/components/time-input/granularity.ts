const App = `import {TimeInput} from "@nextui-org/react";
import {Time, parseAbsoluteToLocal} from "@internationalized/date";

export default function App() {
  let [date, setDate] = React.useState(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <TimeInput granularity="hour" label="Hour" value={date} onChange={setDate} />
      <TimeInput granularity="minute" label="Minute" value={date} onChange={setDate} />
      <TimeInput granularity="second" label="Second" value={date} onChange={setDate} />
    </div>
  );
}`;

const AppTs = `import {TimeInput} from "@nextui-org/react";
import type {TimeValue} from "@react-types/datepicker";
import {Time, parseAbsoluteToLocal} from "@internationalized/date";

export default function App() {
  let [date, setDate] = React.useState<TimeInputValue>(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <TimeInput granularity="hour" label="Hour" value={date} onChange={setDate} />
      <TimeInput granularity="minute" label="Minute" value={date} onChange={setDate} />
      <TimeInput granularity="second" label="Second" value={date} onChange={setDate} />
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
