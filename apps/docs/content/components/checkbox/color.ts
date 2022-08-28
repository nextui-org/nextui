const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox color="primary" defaultSelected>
        Primary
      </Checkbox>
      <Spacer />
      <Checkbox color="secondary" defaultSelected>
        Secondary
      </Checkbox>
      <Spacer />
      <Checkbox color="success" defaultSelected>
        Success
      </Checkbox>
      <Spacer />
      <Checkbox color="warning" defaultSelected>
        Warning
      </Checkbox>
      <Spacer />
      <Checkbox color="error" defaultSelected>
        Error
      </Checkbox>
      <Spacer />
      <Checkbox color="gradient" defaultSelected>
        Gradient
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
