const App = `import {TimeInput} from "@nextui-org/react";
import {Time} from "@internationalized/date";

export default function App() {
  return (
    <TimeInput 
      label="Meeting time"
      placeholderValue={new Time(9)}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
