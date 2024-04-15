const App = `import {DateRangePicker} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];

  return (
    <DateRangePicker
      label="Stay duration"
      isDateUnavailable={(date) =>
        disabledRanges.some(
          (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
        )
      }
      minValue={today(getLocalTimeZone())}
      validate={(value) =>
        disabledRanges.some(
          (interval) =>
            value && value.end.compare(interval[0]) >= 0 && value.start.compare(interval[1]) <= 0,
        )
          ? "Selected date range may not include unavailable dates."
          : null
      }
      validationBehavior="native"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
