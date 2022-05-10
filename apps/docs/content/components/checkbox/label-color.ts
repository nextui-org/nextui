const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox color="primary" labelColor="primary" defaultSelected={true}>
        Primary
      </Checkbox>
      <Spacer />
      <Checkbox color="secondary" labelColor="secondary" defaultSelected={true}>
        Secondary
      </Checkbox>
      <Spacer />
      <Checkbox color="success" labelColor="success" defaultSelected={true}>
        Success
      </Checkbox>
      <Spacer />
      <Checkbox color="warning" labelColor="warning" defaultSelected={true}>
        Warning
      </Checkbox>
      <Spacer />
      <Checkbox color="error" labelColor="error" defaultSelected={true}>
        Error
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
