import {Checkbox} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox isDisabled>Option</Checkbox>
      <Checkbox defaultSelected isDisabled>
        Option
      </Checkbox>
    </div>
  );
}
