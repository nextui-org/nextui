import {Pagination} from "@heroui/react";

export default function App() {
  const variants = ["flat", "bordered", "faded", "light"];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {variants.map((variant) => (
        <Pagination key={variant} initialPage={1} total={10} variant={variant} />
      ))}
    </div>
  );
}
