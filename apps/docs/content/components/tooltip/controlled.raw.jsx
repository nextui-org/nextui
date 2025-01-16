import {Tooltip, Button} from "@heroui/react";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Tooltip content="I am a tooltip" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <Button>Hover me</Button>
      </Tooltip>
      <p className="text-small text-default-500">Open: {isOpen ? "true" : "false"}</p>
    </div>
  );
}
