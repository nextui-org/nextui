import {NumberField} from "@nextui-org/react";

export default function App() {
  return (
    <NumberField
      isRequired
      className="max-w-xs"
      defaultValue={1024}
      label="Width"
      placeholder="Enter the width"
    />
  );
}
