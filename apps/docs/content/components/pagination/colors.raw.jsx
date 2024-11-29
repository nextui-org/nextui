import {Pagination} from "@nextui-org/react";

export default function App() {
  const colors = ["primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {colors.map((color) => (
        <Pagination key={color} color={color} initialPage={1} total={10} />
      ))}
    </div>
  );
}
