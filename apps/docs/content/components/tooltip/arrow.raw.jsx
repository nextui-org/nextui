import {Tooltip, Button} from "@heroui/react";

export default function App() {
  return (
    <Tooltip content="I am a tooltip" showArrow={true}>
      <Button>Hover me</Button>
    </Tooltip>
  );
}
