const App = `import {TimeInput} from "@nextui-org/react";
import {Time} from "@internationalized/date";

export default function App() {
  return (
    <TimeInput 
      defaultValue={new Time(18)}
      maxValue={new Time(17)}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
