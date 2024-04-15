const App = `import {DateRangePicker} from "@nextui-org/react";
import {parseAbsoluteToLocal} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";

export default function App() {
  let [date, setDate] = React.useState({
    start: parseAbsoluteToLocal("2021-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2021-04-14T19:15:22Z"),
  });

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DateRangePicker label="Stay duration" value={date} onChange={setDate} />
      </I18nProvider>
    </div>
  );
}`;

const AppTs = `import {DateRangePicker} from "@nextui-org/react";
import {DateValue, parseAbsoluteToLocal} from "@internationalized/date";
import {RangeValue} from "@react-types/shared";
import {I18nProvider} from "@react-aria/i18n";

export default function App() {
  let [date, setDate] = React.useState<RangeValue<DateValue>>({
    start: parseAbsoluteToLocal("2021-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2021-04-14T19:15:22Z"),
  });

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DateRangePicker label="Stay duration" value={date} onChange={setDate} />
      </I18nProvider>
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
