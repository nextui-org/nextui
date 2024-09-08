const App = `import {Calendar} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

export default function App() {
  let [value, setValue] = React.useState(parseDate("2024-03-07"));

  return (
    <Calendar 
      aria-label="Date (Controlled)" 
      value={value} 
      onChange={setValue} 
    />
  );
}`;

const AppTs = `import {Calendar} from "@nextui-org/react";
import type {DateValue} from "@react-types/calendar";
import {parseDate} from "@internationalized/date";

export default function App() {
  let [value, setValue] = React.useState<DateValue>(parseDate("2024-03-07"));

  return (
    <Calendar 
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
