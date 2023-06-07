const App = `import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-2">
      <Tooltip color="warning" content="Tooltip 1" delay={1000}>
        <Button color="warning" variant="flat">
          Delay Open (1000ms)
        </Button>
      </Tooltip>
      <Tooltip color="warning" closeDelay={2000} content="Tooltip 2">
        <Button color="warning" variant="flat">
          Delay Close (2000ms)
        </Button>
      </Tooltip>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
