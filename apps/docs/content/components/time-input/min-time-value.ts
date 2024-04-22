const App = `import {TimeInput} from "@nextui-org/react";
import {Time} from "@internationalized/date";

export default function App() {
  return (
    <TimeInput 
      defaultValue={new Time(8)}
      minValue={new Time(9)}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
