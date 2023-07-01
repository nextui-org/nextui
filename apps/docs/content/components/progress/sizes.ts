const App = `import {Progress} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Progress size="sm" aria-label="Loading..." value={30} />
      <Progress size="md" aria-label="Loading..." value={40} />
      <Progress size="lg" aria-label="Loading..." value={50} />
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
