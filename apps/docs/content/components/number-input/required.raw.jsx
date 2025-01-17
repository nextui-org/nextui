import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      isRequired
      className="max-w-xs"
      defaultValue={1024}
      label="Width"
      placeholder="Enter the width"
    />
  );
}
