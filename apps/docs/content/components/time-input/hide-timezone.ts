const App = `import {TimeInput} from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";

export default function App() {
  return (
    <TimeInput 
      label="Meeting time"
      hideTimeZone 
      defaultValue={parseZonedDateTime("2022-11-07T10:45[America/Los_Angeles]")} 
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
