import {NumberField} from "@nextui-org/react";

export default function App() {
  return (
    <NumberField
      isReadOnly
      className="max-w-xs"
      defaultValue={1024}
      placeholder="Enter the width"
      variant="bordered"
    />
  );
}
