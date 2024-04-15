const App = `import {DateRangePicker} from "@nextui-org/react";

export default function App() {
  return (
    <DateRangePicker
      label="Stay duration"
      description="Please enter your stay duration"
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
