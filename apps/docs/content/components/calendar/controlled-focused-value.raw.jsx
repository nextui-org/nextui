import {Calendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState(defaultDate);

  return (
    <Calendar
      aria-label="Date (Controlled Focused Value)"
      focusedValue={focusedDate}
      value={defaultDate}
      onFocusChange={setFocusedDate}
    />
  );
}
