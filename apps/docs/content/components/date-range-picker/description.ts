const App = `import {DateRangePicker} from "@nextui-org/react";

export default function App() {
  return (
    <DateRangePicker
      label="Email"
      description="We'll never share your email with anyone else."
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
