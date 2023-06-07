const App = `import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-2">
      <Tooltip color="primary" content="Tooltip 1" delay={1000}>
        <Button color="primary" variant="flat">
          Hover me (delay 1000ms)
        </Button>
      </Tooltip>
      <Tooltip color="primary" content="Tooltip 2">
        <Button color="primary" variant="flat">
          Then hover me
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
