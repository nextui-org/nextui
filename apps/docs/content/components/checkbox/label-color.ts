const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox color="primary" labelColor="primary" initialChecked={true}>
        Primary
      </Checkbox>
      <Spacer />
      <Checkbox color="secondary" labelColor="secondary" initialChecked={true}>
        Secondary
      </Checkbox>
      <Spacer />
      <Checkbox color="success" labelColor="success" initialChecked={true}>
        Success
      </Checkbox>
      <Spacer />
      <Checkbox color="warning" labelColor="warning" initialChecked={true}>
        Warning
      </Checkbox>
      <Spacer />
      <Checkbox color="error" labelColor="error" initialChecked={true}>
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
