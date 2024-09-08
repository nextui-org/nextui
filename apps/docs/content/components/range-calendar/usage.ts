const App = `import {RangeCalendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from '@internationalized/date';

export default function App() {
  return (
    <div className="flex gap-x-4">
      <RangeCalendar aria-label="Date (No Selection)" />
      <RangeCalendar
        aria-label="Date (Uncontrolled)"
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({weeks: 1}),
        }}
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
