const App = `import {Snippet} from "@nextui-org/react";

export default function App() {
  return (
    <Snippet>npm install @nextui-org/react</Snippet>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
