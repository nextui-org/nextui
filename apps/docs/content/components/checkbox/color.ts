const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox color="primary" defaultSelected={true}>
        Primary
      </Checkbox>
      <Spacer />
      <Checkbox color="secondary" defaultSelected={true}>
        Secondary
      </Checkbox>
      <Spacer />
      <Checkbox color="success" defaultSelected={true}>
        Success
      </Checkbox>
      <Spacer />
      <Checkbox color="warning" defaultSelected={true}>
        Warning
      </Checkbox>
      <Spacer />
      <Checkbox color="error" defaultSelected={true}>
        Error
      </Checkbox>
      <Spacer />
      <Checkbox color="gradient" defaultSelected={true}>
        Gradient
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
