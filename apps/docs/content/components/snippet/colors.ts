const App = `import {Snippet} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Snippet color="default">npm install @nextui-org/react</Snippet>
      <Snippet color="primary">npm install @nextui-org/react</Snippet>
      <Snippet color="secondary">npm install @nextui-org/react</Snippet>
      <Snippet color="success">npm install @nextui-org/react</Snippet>
      <Snippet color="warning">npm install @nextui-org/react</Snippet>
      <Snippet color="danger">npm install @nextui-org/react</Snippet>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
