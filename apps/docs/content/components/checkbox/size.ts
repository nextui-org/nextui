const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox defaultSelected size="xs">
        mini
      </Checkbox>
      <Spacer />
      <Checkbox defaultSelected size="sm">
        small
      </Checkbox>
      <Spacer />
      <Checkbox defaultSelected size="md">
        medium
      </Checkbox>
      <Spacer />
      <Checkbox defaultSelected size="lg">
        large
      </Checkbox>
      <Spacer />
      <Checkbox defaultSelected size="xl">
        xlarge
      </Checkbox>
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
