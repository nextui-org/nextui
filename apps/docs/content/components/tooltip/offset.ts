const App = `import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-2">
      <Tooltip content="Tooltip 1" color="success">
        <Button color="success" variant="faded">
          Default offset (7)
        </Button>
      </Tooltip>
      <Tooltip content="Tooltip 2" color="success" offset={15}>
        <Button color="success" variant="faded">
          15 offset
        </Button>
      </Tooltip>
      <Tooltip content="Tooltip 3" color="success" offset={-7}>
        <Button color="success" variant="faded">
          -7 offset
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
