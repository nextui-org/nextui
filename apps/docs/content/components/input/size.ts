const App = `import { Input, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Input 
        size="xs" 
        placeholder="Mini" 
      />
      <Spacer y={0.5} />
      <Input 
        size="sm" 
        placeholder="Small" 
      />
      <Spacer y={0.5} />
      <Input 
       size="md" 
       placeholder="Medium" 
      />
      <Spacer y={0.5} />
      <Input 
        size="lg" 
        placeholder="Large" 
      />
      <Spacer y={0.5} />
      <Input 
        size="xl" 
        placeholder="xLarge" 
      />
      <Spacer y={0.5} />
      <Input 
        width="120px" 
        placeholder="120px" 
      />
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
