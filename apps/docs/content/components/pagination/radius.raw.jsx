import {Pagination} from "@heroui/react";

export default function App() {
  const radius = ["full", "xl", "lg", "md", "sm", "base", "none"];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {radius.map((r) => (
        <Pagination key={r} initialPage={1} radius={r} total={10} />
      ))}
    </div>
  );
}
