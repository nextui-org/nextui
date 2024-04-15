const App = `import {RangeCalendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  return (
    <RangeCalendar 
      aria-label="Date (Read Only)" 
      value={{
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({weeks: 1}),
      }} 
      isReadOnly 
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
