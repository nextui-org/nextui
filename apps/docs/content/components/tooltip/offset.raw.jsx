import {Tooltip, Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-2">
      <Tooltip color="success" content="Tooltip 1">
        <Button color="success" variant="faded">
          Default offset (7)
        </Button>
      </Tooltip>
      <Tooltip color="success" content="Tooltip 2" offset={15}>
        <Button color="success" variant="faded">
          15 offset
        </Button>
      </Tooltip>
      <Tooltip color="success" content="Tooltip 3" offset={-7}>
        <Button color="success" variant="faded">
          -7 offset
        </Button>
      </Tooltip>
    </div>
  );
}
