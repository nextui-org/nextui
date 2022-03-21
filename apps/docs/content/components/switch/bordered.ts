const App = `import { Switch, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Switch bordered size="xs" />
      <Spacer />
      <Switch bordered size="sm" color="secondary" />
      <Spacer />
      <Switch bordered size="md" color="success" />
      <Spacer />
      <Switch bordered size="lg" color="warning" />
      <Spacer />
      <Switch bordered size="xl" color="error" />
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
