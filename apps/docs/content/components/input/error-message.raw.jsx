import {Input} from "@heroui/react";

export default function App() {
  return (
    <Input
      className="max-w-xs"
      defaultValue="junior2heroui.com"
      errorMessage="Please enter a valid email"
      isInvalid={true}
      label="Email"
      type="email"
      variant="bordered"
    />
  );
}
