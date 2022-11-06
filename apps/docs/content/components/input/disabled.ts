const App = `import { Input, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Input disabled placeholder="Disabled" />
      <Spacer y={0.5} />
      <Input readOnly placeholder="Read only" initialValue="readOnly" />
    </>
  );
}
`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
