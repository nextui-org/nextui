const App = `import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Tooltip
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        content="I am a tooltip"
      >
        <Button>Hover me</Button>
      </Tooltip>
      <p className="text-small text-default-500">
        Open: {isOpen ? "true" : "false"}
      </p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
