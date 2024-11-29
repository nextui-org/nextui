import {Textarea} from "@nextui-org/react";

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
