const App = `import {Progress} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      aria-label="Downloading..."
      size="md"
      value={value}
      color="success"
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
