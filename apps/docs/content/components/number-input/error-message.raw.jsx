import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      className="max-w-xs"
      defaultValue={1024}
      errorMessage="Please enter a valid number"
      isInvalid={true}
      label="Width"
      placeholder="Enter the width"
      variant="bordered"
    />
  );
}
