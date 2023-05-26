const App = `import { Code } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Code color="neutral">npm install @nextui-org/react</Code>
      <Code color="primary">npm install @nextui-org/react</Code>
      <Code color="secondary">npm install @nextui-org/react</Code>
      <Code color="success">npm install @nextui-org/react</Code>
      <Code color="warning">npm install @nextui-org/react</Code>
      <Code color="danger">npm install @nextui-org/react</Code>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
