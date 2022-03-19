const App = `import { Input } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Input.Password 
        labelPlaceholder="Password" 
        initialValue="nextui123" 
      />
      <Spacer y={1.6} />
      <Input.Password
        labelPlaceholder="Custom icons"
        visibleIcon={<Unlock fill="currentColor" />}
        hiddenIcon={<Lock fill="currentColor" />}
      />
    </>
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};

