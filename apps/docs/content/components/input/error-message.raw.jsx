import {Input} from "@nextui-org/react";

export default function App() {
  return (
    <Input
      className="max-w-xs"
      defaultValue="junior2nextui.org"
      errorMessage="Please enter a valid email"
      isInvalid={true}
      label="Email"
      type="email"
      variant="bordered"
    />
  );
}
