import {Textarea} from "@heroui/react";

export default function App() {
  return (
    <Textarea
      disableAnimation
      disableAutosize
      classNames={{
        base: "max-w-xs",
        input: "resize-y min-h-[40px]",
      }}
      label="Description"
      placeholder="Enter your description"
      variant="bordered"
    />
  );
}
