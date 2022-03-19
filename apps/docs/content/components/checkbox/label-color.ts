const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox color="primary" labelColor="primary" checked={true}>
        Primary
      </Checkbox>
      <Spacer />
      <Checkbox color="secondary" labelColor="secondary" checked={true}>
        Secondary
      </Checkbox>
      <Spacer />
      <Checkbox color="success" labelColor="success" checked={true}>
        Success
      </Checkbox>
      <Spacer />
      <Checkbox color="warning" labelColor="warning" checked={true}>
        Warning
      </Checkbox>
      <Spacer />
      <Checkbox color="error" labelColor="error" checked={true}>
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
