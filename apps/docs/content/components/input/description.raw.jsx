import {Input} from "@heroui/react";

export default function App() {
  return (
    <Input
      className="max-w-xs"
      defaultValue="junior@heroui.com"
      description="We'll never share your email with anyone else."
      label="Email"
      type="email"
    />
  );
}
