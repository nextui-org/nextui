const App = `import { Text } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Text size="$xs">Font Size: xs</Text>
      <Text size="$md">Font Size: md (base)</Text>
      <Text size="$xl">Font Size: xl</Text>
      <Text size="$2xl">Font Size: 2xl</Text>
      <Text size="$3xl">Font Size: 3xl</Text>
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
