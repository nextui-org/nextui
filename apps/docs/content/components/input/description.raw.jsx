import {Input} from "@nextui-org/react";

export default function App() {
  return (
    <Input
      className="max-w-xs"
      defaultValue="junior@nextui.org"
      description="We'll never share your email with anyone else."
      label="Email"
      type="email"
    />
  );
}
