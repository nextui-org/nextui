const App = `import {Snippet} from "@nextui-org/react";

export default function App() {
  return (
    <Snippet>
      <span>npm install @nextui-org/react</span>
      <span>yarn add @nextui-org/react</span>
      <span>pnpm add @nextui-org/react</span>
    </Snippet>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
