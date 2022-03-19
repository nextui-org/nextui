const App = `import { Text } from "@nextui-org/react";

export default function App() {
  const text =
    "NextUI gives you the best developer experience with all the features you need for building beautiful and modern websites and applications.";
  return (
    <>
      <Text>{text}</Text>
      <Text b>{text}</Text>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
