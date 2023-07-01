const App = `import {Code} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Code size="sm">npm install @nextui-org/react</Code>
      <Code size="md">npm install @nextui-org/react</Code>
      <Code size="lg">npm install @nextui-org/react</Code>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
