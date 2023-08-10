const App = `import {Pagination} from "@nextui-org/react";

export default function App() {

  const sizes = ["sm", "md", "lg"]

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {sizes.map((size) => (
        <Pagination key={size} total={10} initialPage={1} size={size} />
      ))}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
