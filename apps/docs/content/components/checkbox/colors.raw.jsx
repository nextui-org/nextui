import {Checkbox} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected color="default">
        Default
      </Checkbox>
      <Checkbox defaultSelected color="primary">
        Primary
      </Checkbox>
      <Checkbox defaultSelected color="secondary">
        Secondary
      </Checkbox>
      <Checkbox defaultSelected color="success">
        Success
      </Checkbox>
      <Checkbox defaultSelected color="warning">
        Warning
      </Checkbox>
      <Checkbox defaultSelected color="danger">
        Danger
      </Checkbox>
    </div>
  );
}
