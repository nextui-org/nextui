import {Textarea} from "@heroui/react";

export default function App() {
  return (
    <Textarea
      isRequired
      className="max-w-xs"
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
    />
  );
}
