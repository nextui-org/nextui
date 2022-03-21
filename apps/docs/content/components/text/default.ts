const App = `import { Text } from "@nextui-org/react";

export default function App() {
  const text = "Almost before we knew it, we had left the ground.";
  return (
    <>
      <Text h1>{text}</Text>
      <Text h2>{text}</Text>
      <Text h3>{text}</Text>
      <Text h4>{text}</Text>
      <Text h5>{text}</Text>
      <Text h6>{text}</Text>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
