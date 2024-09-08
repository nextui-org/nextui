const App = `import {TimeInput} from "@nextui-org/react";
import {parseAbsoluteToLocal, Time, ZonedDateTime} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export default function App() {
  let [value, setValue] = React.useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));

  let formatter = useDateFormatter({dateStyle: "short", timeStyle: "long"});

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <TimeInput label="Time (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          {value instanceof ZonedDateTime
            ? (value.toDate && formatter.format(value.toDate())) ||
              (value && value.toString()) ||
              "--"
            : ""}
        </p>
      </div>

      <TimeInput defaultValue={new Time(11, 45)} label="Time (uncontrolled)" />
    </div>
  );
}`;

const AppTs = `import {TimeInput} from "@nextui-org/react";
import type {TimeValue} from "@react-types/datepicker";
import {parseAbsoluteToLocal, Time, ZonedDateTime} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export default function App() {
  let [value, setValue] = React.useState<TimeInputValue>(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));

  let formatter = useDateFormatter({dateStyle: "short", timeStyle: "long"});

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <TimeInput label="Time (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          {value instanceof ZonedDateTime
            ? (value.toDate && formatter.format(value.toDate())) ||
              (value && value.toString()) ||
              "--"
            : ""}
        </p>
      </div>

      <TimeInput defaultValue={new Time(11, 45)} label="Time (uncontrolled)" />
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
