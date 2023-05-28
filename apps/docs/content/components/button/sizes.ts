const App = `import {Button} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Button size="xs" radius="md">
        Button
      </Button>
      <Button size="sm" radius="md">
        Button
      </Button>  
      <Button size="md">
        Button
      </Button>  
      <Button size="lg">
        Button
      </Button>  
      <Button size="xl" radius="xl">
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
