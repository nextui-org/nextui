import {Input} from "@heroui/react";

export default function App() {
  return (
    <Input
      isRequired
      className="max-w-xs"
      defaultValue="junior@nextui.org"
      label="Email"
      type="email"
    />
  );
}
