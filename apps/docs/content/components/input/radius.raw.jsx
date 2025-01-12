import {Input} from "@heroui/react";

export default function App() {
  const radius = ["full", "lg", "md", "sm", "none"];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {radius.map((r) => (
        <Input
          key={r}
          className="max-w-[220px]"
          defaultValue="junior@heroui.com"
          label="Email"
          placeholder="Enter your email"
          radius={r}
          type="email"
        />
      ))}
    </div>
  );
}
