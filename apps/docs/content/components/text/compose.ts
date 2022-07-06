const App = `import { Text } from "@nextui-org/react";

export default function App() {
  const smallText = "Almost before we knew it, we had left the ground.";
  const largeText =
    "NextUI gives you the best developer experience with all the features you need for building beautiful and modern websites and applications.";
  return (
    <>
      <Text>{largeText}</Text>
      <Text>
        <Text small del>
          {smallText}
        </Text>
        <Text small b>
          {largeText}
        </Text>
      </Text>
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
