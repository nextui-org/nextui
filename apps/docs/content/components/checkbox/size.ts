const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox defaultSelected={true} size="xs">
        mini
      </Checkbox>
      <Spacer />
      <Checkbox defaultSelected={true} size="sm">
        small
      </Checkbox>
      <Spacer />
      <Checkbox defaultSelected={true} size="md">
        medium
      </Checkbox>
      <Spacer />
      <Checkbox defaultSelected={true} size="lg">
        large
      </Checkbox>
      <Spacer />
      <Checkbox defaultSelected={true} size="xl">
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
