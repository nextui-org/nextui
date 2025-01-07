import {Pagination} from "@heroui/react";

export default function App() {
  const sizes = ["sm", "md", "lg"];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {sizes.map((size) => (
        <Pagination key={size} initialPage={1} size={size} total={10} />
      ))}
    </div>
  );
}
