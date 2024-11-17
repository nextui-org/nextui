import {Input} from "@nextui-org/react";

export default function App() {
  return (
    <Input
      isReadOnly
      className="max-w-xs"
      defaultValue="junior@nextui.org"
      label="Email"
      type="email"
      variant="bordered"
    />
  );
}
