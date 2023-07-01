const App = `import {Snippet} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet variant="bordered">npm install @nextui-org/react</Snippet>
      <Snippet variant="flat" color="warning">npm install @nextui-org/react</Snippet>
      <Snippet variant="solid" color="primary">npm install @nextui-org/react</Snippet>
      <Snippet variant="shadow" color="secondary">npm install @nextui-org/react</Snippet>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
