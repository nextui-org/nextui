const App = `import {DateInput} from "@nextui-org/react";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateInput
        label="Date and time"
        minValue={today(getLocalTimeZone())}
        defaultValue={parseDate("2024-04-03")}
      />
      <DateInput
        label="Date and time"
        maxValue={today(getLocalTimeZone())}
        defaultValue={parseDate("2024-04-05")}
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
