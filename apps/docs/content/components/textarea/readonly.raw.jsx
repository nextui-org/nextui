import {Textarea} from "@heroui/react";

export default function App() {
  return (
    <Textarea
      isReadOnly
      className="max-w-xs"
      defaultValue="HeroUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
      variant="bordered"
    />
  );
}
