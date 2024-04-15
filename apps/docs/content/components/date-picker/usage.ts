const App = `import {DatePicker} from "@nextui-org/react";

export default function App() {
  return (
    <DatePicker label="Birth date" className="max-w-[284px]" />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
