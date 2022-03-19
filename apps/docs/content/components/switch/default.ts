const App = `import { Switch, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Switch />
      <Spacer />
      <Switch checked={true} />
    </>
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
