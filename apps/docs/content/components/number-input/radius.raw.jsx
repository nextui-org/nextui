import {NumberField} from "@nextui-org/react";

export default function App() {
  const radius = ["full", "lg", "md", "sm", "none"];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {radius.map((r) => (
        <NumberField
          key={r}
          className="max-w-[220px]"
          defaultValue={1024}
          placeholder="Enter the width"
          radius={r}
        />
      ))}
    </div>
  );
}
