const App = `import {Progress} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Progress color="default" aria-label="Loading..." value={70} />
      <Progress color="primary" aria-label="Loading..." value={70} />
      <Progress color="secondary" aria-label="Loading..." value={70} />
      <Progress color="success" aria-label="Loading..." value={70} />
      <Progress color="warning" aria-label="Loading..." value={70} />
      <Progress color="danger" aria-label="Loading..." value={70} />
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
