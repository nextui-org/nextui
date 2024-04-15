const App = `import {DateRangePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export default function App() {
  const [value, setValue] = React.useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });

  let formatter = useDateFormatter({dateStyle: "long"});

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DateRangePicker
          label="Date range (controlled)"
          value={value}
          onChange={setValue}
        />
        <p className="text-default-500 text-sm">
          Selected date:{" "}
          {value
            ? formatter.formatRange(
                value.start.toDate(getLocalTimeZone()),
                value.end.toDate(getLocalTimeZone()),
              )
            : "--"}
        </p>
      </div>
      <DateRangePicker
        defaultValue={{
          start: parseDate("2024-04-01"),
          end: parseDate("2024-04-08"),
        }}
        label="Date range (uncontrolled)"
      />
    </div>
  );
}`;

const AppTs = `import {DateRangePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";
import {RangeValue} from "@react-types/shared";
import {DateValue} from "@react-types/datepicker";

export default function App() {
  const [value, setValue] = React.useState<RangeValue<DateValue>>({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });

  let formatter = useDateFormatter({dateStyle: "long"});

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DateRangePicker
          label="Date range (controlled)"
          value={value}
          onChange={setValue}
        />
        <p className="text-default-500 text-sm">
          Selected date:{" "}
          {value
            ? formatter.formatRange(
                value.start.toDate(getLocalTimeZone()),
                value.end.toDate(getLocalTimeZone()),
              )
            : "--"}
        </p>
      </div>
      <DateRangePicker
        defaultValue={{
          start: parseDate("2024-04-01"),
          end: parseDate("2024-04-08"),
        }}
        label="Date range (uncontrolled)"
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
