const App = `import { Textarea, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Textarea disabled label="Disabled name" placeholder="Enter your name" />
      <Spacer y={0.5} />
      <Textarea
        readOnly
        label="Read only Text"
        initialValue="Almost before we knew it, we had left the ground."
      />
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
