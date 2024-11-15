import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      className="max-w-xs"
      defaultValue="NextUI is a React UI library with..."
      errorMessage="The description should be at least 255 characters long."
      isInvalid={true}
      label="Description"
      placeholder="Enter your description"
      variant="bordered"
    />
  );
}
