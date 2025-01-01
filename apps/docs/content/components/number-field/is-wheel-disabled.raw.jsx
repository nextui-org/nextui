import {NumberField} from "@nextui-org/react";

export default function App() {
  return (
    <NumberField
      isWheelDisabled
      className="max-w-xs"
      defaultValue={1024}
      placeholder="Enter the width"
    />
  );
}
