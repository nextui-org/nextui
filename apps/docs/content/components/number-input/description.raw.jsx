import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      className="max-w-xs"
      defaultValue={1024}
      description="Enter the width of the element"
      label="Width"
    />
  );
}
