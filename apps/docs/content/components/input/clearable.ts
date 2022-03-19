const App = `import { Input, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Input 
        clearable 
        bordered 
        labelPlaceholder="Name" 
        initialValue="NextUI" 
      />
      <Spacer y={2.5} />
      <Input
        clearable
        underlined
        labelPlaceholder="Name"
        initialValue="NextUI"
      />
      <Spacer y={1.5} />
      <Input 
        clearable 
        label="Name" 
        placeholder="Name" 
        initialValue="NextUI" 
      />
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};

