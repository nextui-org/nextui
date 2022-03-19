const App = `import { Switch, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Switch animated={false} checked={true} />
      <Spacer />
      <Switch animated={false} />
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




