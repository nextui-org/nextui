const App = `import {Button} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Button radius="full">
        Full
      </Button>
      <Button radius="lg">
        Large
      </Button>  
      <Button radius="md">
        Medium
      </Button>  
      <Button radius="sm">
        Small
      </Button>  
      <Button radius="none">
        None
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
