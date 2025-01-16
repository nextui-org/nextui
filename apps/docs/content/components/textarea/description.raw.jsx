import {Textarea} from "@heroui/react";

export default function App() {
  return (
    <Textarea
      className="max-w-xs"
      description="Enter a concise description of your project."
      label="Description"
      placeholder="Enter your description"
      variant="faded"
    />
  );
}
