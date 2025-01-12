import {Tooltip, Button} from "@heroui/react";

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
}
