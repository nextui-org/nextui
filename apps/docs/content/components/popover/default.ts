const App = `import { Popover, Button, Text } from "@nextui-org/react";

export default function App() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button auto flat>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: "$10" }}>This is the content of the popover.</Text>
      </Popover.Content>
    </Popover>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
