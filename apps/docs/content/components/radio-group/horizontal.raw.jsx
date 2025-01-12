import {RadioGroup, Radio} from "@heroui/react";

export default function App() {
  return (
    <RadioGroup label="Select your favorite city" orientation="horizontal">
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="san-francisco">San Francisco</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </RadioGroup>
  );
}
