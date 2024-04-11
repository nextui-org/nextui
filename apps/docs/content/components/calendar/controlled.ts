const App = `import {Calendar, DateValue} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

export default function App() {
  let [value, setValue] = React.useState<DateValue>(parseDate("2024-03-07"));
  return (
    <div className="flex p-4">
      <Calendar 
        aria-label="Date (Controlled)" 
        value={value} 
        onChange={setValue} 
      />;
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
