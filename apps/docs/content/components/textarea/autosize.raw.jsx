import {Textarea} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Textarea label="Description" placeholder="Enter your description (Default autosize)" />
      <Textarea label="Description" minRows={2} placeholder="Enter your description (Min rows 2)" />
      <Textarea label="Description" maxRows={3} placeholder="Enter your description (Max rows 3)" />
    </div>
  );
}
