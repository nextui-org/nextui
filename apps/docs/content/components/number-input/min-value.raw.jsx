import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      hideStepper
      className="max-w-xs"
      helperText="The value of the element should be greater than 100"
      minValue={100}
      placeholder="Enter the width"
    />
  );
}
