const App = `import { Checkbox, Spacer } from "@nextui-org/react";
export default function App() {
  return (
    <>
      <Checkbox color="primary" initialChecked={true}>
        Primary
      </Checkbox>
      <Spacer />
      <Checkbox color="secondary" initialChecked={true}>
        Secondary
      </Checkbox>
      <Spacer />
      <Checkbox color="success" initialChecked={true}>
        Success
      </Checkbox>
      <Spacer />
      <Checkbox color="warning" initialChecked={true}>
        Warning
      </Checkbox>
      <Spacer />
      <Checkbox color="error" initialChecked={true}>
        Error
      </Checkbox>
      <Spacer />
      <Checkbox color="gradient" initialChecked={true}>
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
