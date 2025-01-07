import {Chip} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Chip radius="full">Full</Chip>
      <Chip radius="lg">Large</Chip>
      <Chip radius="md">Medium</Chip>
      <Chip radius="sm">Small</Chip>
    </div>
  );
}
