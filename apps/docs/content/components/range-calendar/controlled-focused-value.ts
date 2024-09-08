const App = `import {RangeCalendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState(defaultDate);

  return (
    <RangeCalendar
      aria-label="Date (Controlled Focused Value)"
      focusedValue={focusedDate}
      onFocusChange={setFocusedDate}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
