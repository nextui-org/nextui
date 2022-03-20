const AppJs = `import { Spacer, Card } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Card color="primary">
        <Spacer y={1} />
      </Card>
      <Spacer y={1} />
      <Card color="primary">
        <Spacer y={2} />
      </Card>
      <Spacer y={1} />
      <Card color="primary">
        <Spacer y={3} />
      </Card>
    </>
  );
}
`;

const react = {
  '/App.js': AppJs
};

export default {
  ...react
};
