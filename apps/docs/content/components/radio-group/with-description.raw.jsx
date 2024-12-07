import {RadioGroup, Radio} from "@nextui-org/react";

export default function App() {
  return (
    <RadioGroup color="warning" label="Select your favorite city">
      <Radio description="The capital of Argentina" value="buenos-aires">
        Buenos Aires
      </Radio>
      <Radio description="The capital of Australia" value="canberra">
        Canberra
      </Radio>
      <Radio description="The capital of England" value="london">
        London
      </Radio>
      <Radio description="The capital of Japan" value="tokyo">
        Tokyo
      </Radio>
    </RadioGroup>
  );
}
