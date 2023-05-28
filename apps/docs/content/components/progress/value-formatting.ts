const App = `import {Progress} from "@nextui-org/react";

export default function App() {
  return (
    <Progress
      label="Monthly expenses"
      size="sm"
      value={4000}
      maxValue={10000}
      color="warning"
      formatOptions={{style: "currency", currency: "ARS"}}
      showValueLabel={true}
      className="max-w-md"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
