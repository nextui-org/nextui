const App = `import {TimeInput} from "@nextui-org/react";
import {Time, parseZonedDateTime} from "@internationalized/date";

export default function App() {
  return (
    <TimeInput 
      label="Meeting time"
      hourCycle={24}
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
      granularity="minute" 
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
