const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox initialChecked={true} size="xs">
        mini
      </Checkbox>
      <Spacer />
      <Checkbox initialChecked={true} size="sm">
        small
      </Checkbox>
      <Spacer />
      <Checkbox initialChecked={true} size="md">
        medium
      </Checkbox>
      <Spacer />
      <Checkbox initialChecked={true} size="lg">
        large
      </Checkbox>
      <Spacer />
      <Checkbox initialChecked={true} size="xl">
        xlarge
      </Checkbox>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
