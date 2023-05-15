const App = `import { Button } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Button radius="full">
        Button
      </Button>
      <Button radius="2xl">
        Button
      </Button>  
      <Button radius="xl">
        Button
      </Button>  
      <Button radius="lg">
        Button
      </Button>  
      <Button radius="md">
        Button
      </Button>  
      <Button radius="sm">
        Button
      </Button>  
      <Button radius="none">
        Button
      </Button>  
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
