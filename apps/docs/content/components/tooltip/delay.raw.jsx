import {Tooltip, Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-2">
      <Tooltip color="warning" content="Tooltip 1" delay={1000}>
        <Button color="warning" variant="flat">
          Delay Open (1000ms)
        </Button>
      </Tooltip>
      <Tooltip closeDelay={2000} color="warning" content="Tooltip 2">
        <Button color="warning" variant="flat">
          Delay Close (2000ms)
        </Button>
      </Tooltip>
    </div>
  );
}
