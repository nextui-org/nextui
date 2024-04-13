const App = `import {DatePicker} from "@nextui-org/react";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <div className="flex flex-col gap-2">
        <h3>Min date</h3>
        <DatePicker
          className="max-w-[256px]"
          label="Date and time"
          minValue={today(getLocalTimeZone())}
          defaultValue={parseDate("2024-04-03")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3>Max date</h3>
        <DatePicker
          className="max-w-[256px]"
          label="Date and time"
          maxValue={today(getLocalTimeZone())}
          defaultValue={parseDate("2024-04-05")}
        />
      </div>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
