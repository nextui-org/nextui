const App = `import {Snippet} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet size="sm">npm install @nextui-org/react</Snippet>
      <Snippet size="md">npm install @nextui-org/react</Snippet>
      <Snippet size="lg">npm install @nextui-org/react</Snippet>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
