import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      hideStepper
      className="max-w-xs"
      defaultValue={1024}
      placeholder="Enter the width"
    />
  );
}
