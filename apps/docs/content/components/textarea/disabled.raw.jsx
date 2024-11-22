import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      isDisabled
      className="max-w-xs"
      defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
    />
  );
}
