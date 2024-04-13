const App = `import {RangeCalendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  let [value, setValue] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });

  return (
    <RangeCalendar 
      aria-label="Date (Controlled)" 
      value={value} 
      onChange={setValue} 
    />
  );
}`;

const AppTs = `import {RangeCalendar} from "@nextui-org/react";
import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  let [value, setValue] = React.useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });

  return (
    <RangeCalendar 
      aria-label="Date (Controlled)" 
      value={value} 
      onChange={setValue} 
    />
  );
}`;

const react = {
  "/App.jsx": App,
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
