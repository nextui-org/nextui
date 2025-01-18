import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      className="max-w-xs"
      description="Enter the amount of the element"
      helperText="The value of the element should be between 100 and 1000"
      label="Amount"
      maxValue={1000}
      minValue={100}
      placeholder="Enter the amount"
    />
  );
}
