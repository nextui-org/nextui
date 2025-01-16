import {Progress} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Progress aria-label="Loading..." size="sm" value={30} />
      <Progress aria-label="Loading..." size="md" value={40} />
      <Progress aria-label="Loading..." size="lg" value={50} />
    </div>
  );
}
