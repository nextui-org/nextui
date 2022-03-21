const App = `import { Text } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Text size={12}>Font Size: 12px;</Text>
      <Text size={14}>Font Size: 14px;</Text>
      <Text size="100%">Font Size: 100%;</Text>
      <Text size="1.25rem">Font Size: 1.25rem;</Text>
      <Text size="2em">Font Size: 2em;</Text>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};



