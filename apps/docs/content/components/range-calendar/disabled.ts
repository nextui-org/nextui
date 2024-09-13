const App = `import {RangeCalendar} from "@nextui-org/react";

export default function App() {
  return (
    <RangeCalendar aria-label="Date (Disabled)" isDisabled />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
