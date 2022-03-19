const App = `import { Switch, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Switch disabled />
      <Spacer />
      <Switch checked={true} disabled />
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
