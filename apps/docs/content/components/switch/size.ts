const App = `import { Switch, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Switch checked={true} size="xs" />
      <Spacer />
      <Switch size="sm" />
      <Spacer />
      <Switch checked={true} size="md" />
      <Spacer />
      <Switch size="lg" />
      <Spacer />
      <Switch checked={true} size="xl" />
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
