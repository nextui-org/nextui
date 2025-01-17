import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      isClearable
      className="max-w-xs"
      defaultValue={1024}
      label="Width"
      placeholder="Enter the width"
      variant="bordered"
      // eslint-disable-next-line no-console
      onClear={() => console.log("number input cleared")}
    />
  );
}
