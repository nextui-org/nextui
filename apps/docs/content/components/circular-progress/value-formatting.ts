const App = `import {CircularProgress} from "@nextui-org/react";

export default function App() {
  return (
    <CircularProgress
      label="Speed"
      size="xl"
      value={70}
      color="success"
      formatOptions={{ style: "unit", unit: "kilometer" }}
      showValueLabel={true}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
