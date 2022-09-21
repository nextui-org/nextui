const App = `import { Checkbox, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Checkbox color="primary" labelColor="primary" defaultSelected>
        Primary
      </Checkbox>
      <Spacer />
      <Checkbox color="secondary" labelColor="secondary" defaultSelected>
        Secondary
      </Checkbox>
      <Spacer />
      <Checkbox color="success" labelColor="success" defaultSelected>
        Success
      </Checkbox>
      <Spacer />
      <Checkbox color="warning" labelColor="warning" defaultSelected>
        Warning
      </Checkbox>
      <Spacer />
      <Checkbox color="error" labelColor="error" defaultSelected>
        Error
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
