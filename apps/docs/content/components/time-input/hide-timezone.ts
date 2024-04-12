const App = `import {TimeInput} from "@nextui-org/react";
import {Time} from "@internationalized/date";

export default function App() {
  return (
    <TimeInput hideTimeZone defaultValue={new Time(11, 45)} />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
