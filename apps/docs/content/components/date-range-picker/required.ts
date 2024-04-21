const App = `import {DateRangePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

export default function App() {
  return (
    <DateRangePicker 
      label="Stay duration" 
      isRequired
      defaultValue={{
        start: parseDate("2024-04-01"),
        end: parseDate("2024-04-08"),
      }}
      className="max-w-xs"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
