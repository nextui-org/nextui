import {Progress} from "@nextui-org/react";

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
      className="max-w-md"
      color="success"
      showValueLabel={true}
      size="md"
      value={value}
    />
  );
}
